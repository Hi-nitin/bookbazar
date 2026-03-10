"use client"
import getCookie from "@/lib/getcookies";
import { log } from "console";
import { exportTraceState } from "next/dist/trace";
import { useEffect, useState } from "react";
import { Cardcompo2 } from "../components/cardcompo";
import { Spinner } from "@/components/ui/spinner";

type Booktype = {
    _id: string
    name: string
    about: string
    price: number
    address: string
    mainImage: string
    additionalImages: string[]
}

export default function Mybook() {

    const token = getCookie('token_value')


    if (!token) return;

    const [mybook, setmybook] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchMybook = async () => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/book/getmybook`, {

                headers: {
                    token: token
                }
            })

            if (!res.ok) {
                setLoading(false)
                const error = await res.json()
                console.log(error);


                return;
            }

            setLoading(false)
            const data = await res.json();
            setmybook(data.data)
            console.log(data.data);


        } catch (error) {
            setLoading(false)
            console.log("error " + error);

        }

    }

    useEffect(() => {
        fetchMybook();
    }, [])

    return (
        <>


            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 justify-items-center px-4">

                {loading ? (
                    <div className="fixed inset-0 flex items-center justify-center">
                        <Spinner />
                    </div>
                ) : null}


                {mybook.map((val: Booktype) => (
                    <Cardcompo2
                        key={val._id}
                        title={val.name}
                        about={val.about}
                        price={val.price}
                        address={val.address}
                        mainImage={val.mainImage}
                        bookid={val._id}
                    />

                ))}

            </div>


        </>
    )
}