import { log } from "console"

interface props {
    params: {
        bookid: string
    }
}

const fetchbook = async (bookid: string) => {

    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5YTNjNzA3ZWY0NWYzYTllZWNiNmRiNyIsImlhdCI6MTc3MjM0MjY4N30.QkjTiGqILvTXd4xJXbMjGuunVdcaK2ioUyl2xhSPoXo"

    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/book/getthisbook/${bookid}`,

            {
                cache: 'no-store',
                headers: {
                    token: `${token}`,
                },
            });


        if (!res.ok) {
            const errormsg = await res.json();
            console.log(errormsg.error);
            throw new Error("Error fetching Book");
        }

        const data = await res.json();
        console.log(data.data);
        return data;

    } catch (error) {
        console.log(error);

    }

}



export default async function Showbook({ params }: props) {

    const { bookid } = await params;

    const getbookdata = await fetchbook(bookid);

    return (
        <>


        </>
    )
}