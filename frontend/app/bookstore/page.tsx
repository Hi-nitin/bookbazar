
import { Button } from "@/components/ui/button";
import { log } from "console";
import Cardcompo from "../components/cardcompo";
import Searchbox from './search'

import Paginationcompo from '../components/Paginationcompo';


import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
import Navbar from "../components/Navbar";

type propstype = {
    totalpages: number
    currentpage: number
}


interface PageProps {
    searchParams?: {
        page?: string;
        minprice?: string;
        maxprice?: string;
    };
}


const getbookdata = async (pagenum: number) => {


    // const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5YTNjNzA3ZWY0NWYzYTllZWNiNmRiNyIsImlhdCI6MTc3MjM0MjY4N30.QkjTiGqILvTXd4xJXbMjGuunVdcaK2ioUyl2xhSPoXo"

    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/book/getallbook?page=${pagenum}`,
            {
                cache: 'no-store',
                // headers: {
                //     token: `${token}`,
                // },
            })

        if (!response.ok) {
            const errmsg = await response.json()
            console.log(errmsg.error);
            throw new Error("Failed to fetch book data.");
        }

        const bookdata = await response.json();
        console.log(bookdata);
        return bookdata;
    } catch (error) {
        console.log(error);
    }
}


export default async function Bookstore(props: PageProps) {

    const searchParams = await props.searchParams;
    const pagenum = Number(searchParams?.page) || 1;


    type bookresponse = {
        data: []
        totalpages: number
        totalbooks: number
    }
    const books: bookresponse = await getbookdata(pagenum);

    type Booktype = {
        _id: string
        name: string
        about: string
        price: number
        address: string
        mainImage: string
        additionalImages: string[]
    }

    return (

        <main>
            <Navbar />

            <Searchbox />

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 justify-items-center px-4">

                {books.data.length ? (
                    books.data.map((val: Booktype) => (
                        <Cardcompo
                            key={val._id}
                            title={val.name}
                            about={val.about}
                            price={val.price}
                            address={val.address}
                            mainImage={val.mainImage}
                            bookid={val._id}
                        />
                    ))
                ) : (
                    <p>No books available</p>
                )}

            </div>


            <Paginationcompo totalpages={books?.totalpages} />


        </main>
    )
}