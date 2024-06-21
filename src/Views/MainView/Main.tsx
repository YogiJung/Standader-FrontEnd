import React, { useEffect, useRef } from "react";
import styles from '../../CssModule/MainViewCss/Main.module.scss'

import axios from "axios";
import { useState } from "react";
import { IntersectionOptions, observe } from "react-intersection-observer";
import { Link } from "react-router-dom";
import { current } from "@reduxjs/toolkit";
import classNames from "classnames/bind";

interface dog_img_interface {
    id: string,
    url: string
}

function Main() {
    const [isLoading, setLoading] = useState(false)
    const [page, setPage] = useState(1)
    const target = useRef(null);
    const count = 10
    const api_key = "live_fYzCaFn3AOV2VBFgP958uNwAmiouBECLtle91czPeMhm7DDynBrKVjccjgZvOH7d"
    const [dogImages, setDogImages] = useState<dog_img_interface[]>([]);
    const [isFixed, setFix] = useState<boolean>(false)
    const API_URL = "https://api.thedogapi.com/v1/images/search?size=small&format=json&has_breeds=true&order=ASC&page=0&limit=10";
    useEffect(() => {
        //useEffect 실행시 target을 재감지함

        let options : IntersectionOptions = {
            root: document.querySelector("#scrollViewPort"),
            rootMargin: "0px",
            threshold: 0.6
        }
        let callback : IntersectionObserverCallback = (entries) => {
            entries.forEach((entry) => {
                console.log(entry.isIntersecting)
                if (entry.isIntersecting && !isLoading) {
                    fetch_images()
                }
            })
        }
        let observer : IntersectionObserver = new IntersectionObserver(callback, options);
        
        if (target.current) {
            console.log("observed")
            observer.observe(target.current)
        }

        return () => {
            if (target.current) {
                observer.unobserve(target.current)
            }
        }
    },[isLoading])

    const fetch_images = async () => {
        try {
            console.log("fetch 무한요청")
            if (isLoading) return;
            setLoading(true)
        const response = await axios.get(API_URL, {
            headers : {
                "x-api-key" : api_key
            },
            withCredentials: false
        });
        const dog_data : dog_img_interface[] = response.data.map((dog_img : {id: string, url: string }) => ({
            id: dog_img.id,
            url: dog_img.url
        }))
        setDogImages(prevDogImages => [...prevDogImages, ...dog_data])

        } catch {
            console.log("dog API Error")
        } finally {
            setLoading(false)
        }
    }
    const cs = classNames.bind(styles)
    let lastScrollTop = 0;
    window.addEventListener("scroll", function() {
        let currentScroll = window.scrollY || this.document.documentElement.scrollTop;
        if (currentScroll > lastScrollTop) {
            lastScrollTop = currentScroll;
            setFix(true)
        } else if (currentScroll < lastScrollTop && currentScroll <= 10) {
            this.window.scrollTo(0,0)
            setFix(false)
        }
    }, false)
    
    return (
       <div className={styles.container}>
            <div className={styles.main_left}>
                
            </div>
            <div className={styles.main_center}>
            <div className={styles.post_layer}>
            {dogImages && dogImages.map((dogImage : dog_img_interface) => (
                <div key={dogImage.id} className={styles.post_container}>
                    <div className={styles.profile_container}>
                        <div className={styles.profile_image}>
                            <img src={dogImage.url}></img>
                        </div>
                        <div className={styles.profile_name}>
                            <p> {dogImage.id} </p>
                        </div>
                    </div>
                    <div className={styles.image_container}>
                        <img src={dogImage.url}/>
                    </div>
                    <div className={styles.comment_container}>{dogImage.id}</div>
                </div>
            ))}
            <div ref={target} className={styles.reference}></div>
            </div>
            </div>
            <div className={styles.main_right}/>
       </div>
    )

}

export default Main


// /<div className={test.container}>
// <div className={test.navigation_container}>
//     <div className={test.navigator}>
//         <p>Profile</p>
//     </div>
//     <div className={test.navigation_divider}></div>
//     <div className={test.navigator}>
//         <p>Chat</p>
//     </div>
//     <div className={test.navigation_divider}></div>
//     <div className={test.navigator}>
//         <Link to="/van" className={test.link_style}>Van</Link>
//     </div>
//     <div className={test.navigation_divider}></div>
    
//     <div className={test.navigator_bottom}>
//         <div className={test.navigation_divider}></div>
//         <p>Log In / Log Out</p>
//     </div>
// </div>
// <div className={test.post_layer}>
//     <div className={test.post_medium}>
//         {dogImages && dogImages.map((dogImage : dog_img_interface) => (
//             <div key={dogImage.id} className={test.post_container}>
//                 <div className={test.profile_container}>
//                     <div className={test.profile_image}>
//                         <img src={dogImage.url}></img>
//                     </div>
//                     <div className={test.profile_name}>
//                         <p> {dogImage.id} </p>
//                     </div>
//                 </div>
//                 <img src={dogImage.url}/>
//                 <div className={test.comment_container}>{dogImage.id}</div>
//             </div>
//         ))}
//         <div ref={target} className={test.reference}></div>
//     </div>
// </div>
// </div>