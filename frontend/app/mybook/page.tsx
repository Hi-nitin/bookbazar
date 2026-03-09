"use client"
import getCookie from "@/lib/getcookies";
import { log } from "console";
import { exportTraceState } from "next/dist/trace";
import { useEffect, useState } from "react";

type booktypes = {

}

export default function Mybook() {

    const token = getCookie('token_value')


    if (!token) return;

    const [mybook, setmybook] = useState([]);

    const fetchMybook = async () => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/book/getmybook`, {

                headers: {
                    token: token
                }
            })

            if (!res.ok) {

                const error = await res.json()
                console.log(error);


                return;
            }


            const data = await res.json();
            setmybook(data.data)
            console.log(data.data);


        } catch (error) {

            console.log("error " + error);

        }

    }

    useEffect(() => {
        fetchMybook()

    }, [])

    return (
        <>
            

            
        </>
    )
}