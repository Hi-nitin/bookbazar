"use client"
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"

import { useRouter, useSearchParams } from "next/navigation";

type propstype = {
    totalpages: number

}

export default function PaginationDemo({ totalpages }: propstype) {

    const router = useRouter();
    const searchParams = useSearchParams();

    const currentPage = Number(searchParams.get("page")) || 1;

    const siteUrl = "http://localhost:3000/bookstore?page="

    const pages = [];

    for (let i = 1; i <= totalpages; i++) {
        pages.push(i);
    }

    return (

        <>
            <Pagination>
                <PaginationContent>

                    <PaginationItem>
                        <PaginationPrevious href={`${siteUrl}${currentPage - 1}`} />
                    </PaginationItem>

                    {pages.map((val) => (
                        <PaginationItem key={val}>
                            <PaginationLink
                                href={`${siteUrl}${val}`}
                                isActive={val === currentPage}
                            >
                                {val}
                            </PaginationLink>
                        </PaginationItem>
                    ))}

                    <PaginationItem>
                        <PaginationEllipsis />
                    </PaginationItem>

                    <PaginationItem>
                        <PaginationPrevious href={`${siteUrl}${currentPage + 1}`} />
                    </PaginationItem>

                </PaginationContent>
            </Pagination>
        </>


    )
}
