import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from './Views/MainView/Main'
import Van from './Views/MainView/Van';
import Login from './Views/EntranceView/Login'
import SignUp from './Views/EntranceView/SignUp'
import Entrance from './Views/EntranceView/Entrance'
import FindCredential from './Views/EntranceView/FindCredential';
import Profile from './Views/MainView/Profile';
import { Link, useNavigate } from 'react-router-dom';
import axios, {AxiosError, isAxiosError} from 'axios';
import { JWTToken, ValidationToken } from './RESTQuery/EntranceQueryREST';
import Chat from './Views/MainView/Chat';
import Test from './Views/MainView/Test';
import MainOutlet from './Views/MainView/MainOutlet';
import ChatRoom from './Views/MainView/ChatRoom';
import { useDispatch } from 'react-redux';
import { UserInfo } from './StateManage/StateTypes/EntranceStateTypes/Login';
import { loginSuccess } from './StateManage/Actions/EntranceActions/LoginAction';
axios.defaults.withCredentials = true;
function App() {
  const dispatch = useDispatch()
  const navigation = useNavigate()
  
  useEffect (() => {
    const checkToken = ( async () => {
    const accessToken = localStorage.getItem("accessToken")
    const jwtToken = {
      accessToken : accessToken,
    }
    if (jwtToken.accessToken) {
      try {
        console.log(jwtToken.accessToken)
        const response = await axios.post<ValidationToken>("https://localhost:8080/entrance/validationtoken", {}, {
          headers: {
            'Authorization' : `Bearer ${jwtToken.accessToken}`
          }
        })
        console.log(response.data.validated)
        if (response.data.validated) {
          localStorage.setItem("accessToken", response.data.jwtToken.accessToken);
          console.log("validated success");
          
          const userInfo : UserInfo =  {
            user_id : response.data.user_id
          }
          dispatch(loginSuccess(userInfo))
        } else {
          navigation("/entrance/login")
        }
        
      } catch(e) {
        if (isAxiosError(e)) {
          if (e.response && e.response.status == 401) {
            navigation("/entrance/login")
          } else {
            console.log(e)
          }
        } else {
          console.log(e)
        }
      }
    } else {
      //token not exists
      console.log("token not exists")
      navigation("/entrance/login")
    }
  })
  checkToken()
  }, [])
  return (
    <Routes>
      <Route path='/msn' element={<MainOutlet/>}>
        <Route path='' element={<Main/>}/>
        <Route path='chat' element={<Chat/>}/>
        <Route path='chat/:chatRoomId' element={<ChatRoom/>}/>

      </Route>

      <Route path='/van' element={<Van/>}/>
      <Route path='/profile' element={<Profile/>}/>
      <Route path='/test' element={<Test/>}/>
      <Route path='/entrance' element={<Entrance/>}>
        <Route path='login' element={<Login/>}/>
        <Route path='signup' element={<SignUp/>}/>
        <Route path='findcredential' element={<FindCredential/>}/>
      </Route>
    </Routes>
  )
}


export default App;

