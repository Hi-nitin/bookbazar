
import { Button } from "@/components/ui/button";
import { log } from "console";
import Cardcompo from "../components/cardcompo";

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


const getbookdata = async (pagenum:number) => {


    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5YTNjNzA3ZWY0NWYzYTllZWNiNmRiNyIsImlhdCI6MTc3MjM0MjY4N30.QkjTiGqILvTXd4xJXbMjGuunVdcaK2ioUyl2xhSPoXo"
   
    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/book/getallbook?page=${pagenum}`,
            {
                cache: 'no-store',
                headers: {
                    token: `${token}`,
                },
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

            <form className="max-w-md mx-auto">
                <label className="block mb-2.5 text-sm font-medium text-heading sr-only ">Search</label>
                <div className="relative">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        <svg className="w-4 h-4 text-body" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z" /></svg>
                    </div>
                    <input type="search" id="search" className="block w-full p-3 ps-9 bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand shadow-xs placeholder:text-body" placeholder="Search" required />
                    <button type="button" className="absolute end-1.5 bottom-1.5  bg-brand hover:bg-brand-strong box-border border border-transparent focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded text-xs px-3 py-1.5 focus:outline-none">Search</button>
                </div>
            </form>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 justify-items-center px-4">

                {books.data?.map((val: Booktype) => (
                    <Cardcompo
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


            <Paginationcompo totalpages={books.totalpages} />


        </main>
    )
}