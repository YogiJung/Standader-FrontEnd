import { APPLICATION_JSON, BufferEncoder, BufferEncoders, Encodable, IdentitySerializer, JsonSerializer, JsonSerializers, MESSAGE_RSOCKET_COMPOSITE_METADATA, MESSAGE_RSOCKET_ROUTING, RSocketClient, TEXT_PLAIN, Utf8Encoders, WellKnownMimeType, encodeAndAddWellKnownMetadata, encodeCompositeMetadata, encodeRoute } from "rsocket-core";
import { ReactiveSocket } from 'rsocket-types'
import { Flowable } from "rsocket-flowable";
import RSocketWebSocketClient from "rsocket-websocket-client";
import { ClientOptions } from "rsocket-websocket-client/RSocketWebSocketClient";
import {Payload} from 'rsocket-types'
import { exit } from "process";
import WebSocket from "ws";
import RSocketConnector from "rsocket-core";
import WebsocketClientTransport from "rsocket-websocket-client";
export const wssUrl : string = 'ws://localhost:9898/rsocket'

export const rSocketRequestResponse = (wssUrl : string) => {
    const client = new RSocketClient({
        transport: new RSocketWebSocketClient(
          { url: wssUrl },
          BufferEncoders 
        ),
        setup: {
          dataMimeType: 'text/plain',
          metadataMimeType: MESSAGE_RSOCKET_ROUTING.string,
          keepAlive: 60000,
          lifetime: 180000,
        },
      });
      
      
      client.connect().subscribe({
        onComplete: (socket) => {
          const routingMetadata = encodeRoute('test');
          socket.requestResponse({
            data: null,
            metadata: routingMetadata,
          }).subscribe({
            onComplete: (payload) => {
              console.log('Response :', payload.data);
            },
            onError: (error) => {
              console.error('Error:', error);
            },
            onSubscribe: (cancel) => {
      
            },
          });
        },
        onError: (error) => {
          console.error('연결 실패:', error);
        },
        onSubscribe: (cancel) => {
      
        },
      });

}
  

export const rSocketChannel = (wssUrl : string, roomId :string) => {
    const client = new RSocketClient({
      transport: new RSocketWebSocketClient({ url: wssUrl }, BufferEncoders),
      setup: {
        dataMimeType: 'text/plain',
        metadataMimeType: MESSAGE_RSOCKET_ROUTING.string,
        keepAlive: 60000,
        lifetime: 180000,
      },
    });
  
    client.connect().subscribe({
      onComplete: (socket) => {
        const routingMetadata = encodeRoute(`chat.${roomId}`);
        const dataStream = new Flowable<Payload<unknown, unknown>>((subscriber) => {
          let count = 0;
          const intervalId = setInterval(() => {
            const message = `Message ${++count} to chat.${roomId}`;
            subscriber.onNext({
              data: message,
              metadata: routingMetadata,
            });
            if (count >= 5) {
              clearInterval(intervalId);
              subscriber.onComplete();
            }
          }, 1000);
        });
  
        socket.requestChannel(dataStream).subscribe({
          onComplete: () => console.log('All messages sent'),
          onError: (error) => console.error(`Connection error: ${error}`),
          onNext: (payload) => console.log(`Received: ${payload.data}`),
          onSubscribe: (subscription) => {
            subscription.request(3); 
          },
        });
      },
      onError: (error) => console.error(`Connection failed: ${error}`),
    });
  };

  export const rSocketChannel2 = (wssUrl : string, roomId :string, message: string) => {
    const client = new RSocketClient({
      transport: new RSocketWebSocketClient({ url: wssUrl }, BufferEncoders),
      setup: {
        dataMimeType: 'application/json',
        metadataMimeType: MESSAGE_RSOCKET_ROUTING.string,
        keepAlive: 60000,
        lifetime: 180000,
      },
    });
  
    client.connect().subscribe({
      onComplete: (socket) => {
        const routingMetadata = encodeRoute(`chat.${roomId}`);
        const messageObject = { message: message };
        const messageString = JSON.stringify(messageObject);
        const messageBuffer = Buffer.from(messageString)

        const flowableStream = Flowable.just({
            data: messageBuffer,
            metadata: routingMetadata,
          });
        

        socket.requestChannel(flowableStream).subscribe({
          onComplete: () => console.log('All messages sent'),
          onError: (error) => console.error(`Connection error: ${error}`),
          onNext: (payload) => console.log(`Received: ${payload.data}`),
          onSubscribe: (subscription) => {
            subscription.request(3);
            
          },
        });
      },
      onError: (error) => console.error(`Connection failed: ${error}`),
    });
  };

  
  export class rsocketStreamManager {
    wssUrl: string;
    roomId: string;
    number_of_request : number;
    setMessageContent : React.Dispatch<React.SetStateAction<string[]>>;
    client : RSocketClient<Encodable, Encodable>;
    // socket : ReactiveSocket<Encodable, Encodable>
    
    constructor(wssUrl : string, roomId : string, number_of_request : number, setMessageContent : React.Dispatch<React.SetStateAction<string[]>>, client : RSocketClient<Encodable, Encodable>) {
      this.wssUrl = wssUrl;
      this.roomId = roomId;
      this.number_of_request = number_of_request;
      this.setMessageContent = setMessageContent;
      this.client = client
    }

    rSocketStream = (cancel_flag : boolean, socketRef : React.MutableRefObject<ReactiveSocket<Encodable, Encodable> | null>) => {
      this.client.connect().subscribe({
        onComplete: (socket) => {
          // const routingMetadata = encodeRoute(`chat.${roomId}`)
          socketRef.current = socket
        },
        onError: (error) => {
          console.error("Error:" , error)
        },
        onSubscribe: (cancel)  => {
          if (cancel_flag) {
            console.log("Socket is cancelled");
            cancel()
          }
        } 
      })
    }
    rSocketSendMessage = (socket : ReactiveSocket<Encodable, Encodable>,message : string, cancel_flag : boolean ) => {
      const routingMetadata = encodeCompositeMetadata([
        [MESSAGE_RSOCKET_ROUTING, encodeRoute(`chat.${this.roomId}`)],
      ])
      const messageJson = {message : message};
      const messageString = JSON.stringify(messageJson);
      const messageBuffer = Buffer.from(messageString);
      
      
      const finalMessage = {
        data: messageBuffer,
        metadata : routingMetadata,
      }
      socket.requestStream(finalMessage).subscribe({
        onComplete: () => { console.log("Complete request Stream")},
        onError: (error) => {console.error("Error in request Stream", error)},
        onNext: (payload) => { 
          console.log(payload)
          const payload_data = payload.data?.toString('utf-8')
          console.log(payload_data)
          if (payload_data) {
            this.setMessageContent((prevState) => [...prevState, payload_data]);
          }
        },
        onSubscribe: (subscription) => {
          subscription.request(this.number_of_request)
          if (cancel_flag) {
            subscription.cancel()
          }
        }
      })
    }
  }

  export const rSocketStream = (wssUrl : string, roomId : string, message : string, cancel_flag : boolean, number_of_request : number, setMessageContent : React.Dispatch<React.SetStateAction<string[]>>) => {
    const client = new RSocketClient({
      transport: new RSocketWebSocketClient({url: wssUrl, debug: true}, BufferEncoders),
      setup: {
        keepAlive: 18000,
        lifetime: 60000,
        dataMimeType: APPLICATION_JSON.string,
        metadataMimeType: MESSAGE_RSOCKET_COMPOSITE_METADATA.string,
        payload: {
          metadata: encodeCompositeMetadata([
            [MESSAGE_RSOCKET_ROUTING, encodeRoute(`setup.${roomId}`)],
          ])
        }
      },
      serializers: {
        data: IdentitySerializer,
        metadata: IdentitySerializer
      }
    })
    client.connect().subscribe({
      onComplete: (socket) => {
        // const routingMetadata = encodeRoute(`chat.${roomId}`)
        const routingMetadata = encodeCompositeMetadata([
          [MESSAGE_RSOCKET_ROUTING, encodeRoute(`chat.${roomId}`)],
        ])
        const messageJson = {message : message};
        const messageString = JSON.stringify(messageJson);
        const messageBuffer = Buffer.from(messageString);
        
        
        const finalMessage = {
          data: messageBuffer,
          metadata : routingMetadata,
        }
        socket.requestStream(finalMessage).subscribe({
          onComplete: () => { console.log("Complete request Stream")},
          onError: (error) => {console.error("Error in request Stream", error)},
          onNext: (payload) => { 
            console.log(payload)
            const payload_data = payload.data?.toString('utf-8')
            console.log(payload_data)
            if (payload_data) {
              setMessageContent((prevState) => [...prevState, payload_data]);
            }
          },
          onSubscribe: (subscription) => {
            subscription.request(number_of_request)
            if (cancel_flag) {
              subscription.cancel()
            }
          }
        })

      },
      onError: (error) => {
        console.error("Error:" , error)
      },
      onSubscribe: (cancel)  => {
        if (cancel_flag) {
          console.log("Socket is cancelled");
          cancel()
        }
      } 
    })
  }
