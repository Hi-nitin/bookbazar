import { log } from "console"
import Carousel from "@/app/components/carousel"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

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

        return data;

    } catch (error) {
        console.log(error);
        return 'fetching error'


    }

}



export default async function Showbook({ params }: props) {

    const { bookid } = await params;

    const images: string[] = []



    const getbookdata = await fetchbook(bookid);
    const bookdata = getbookdata.data;
    console.log(bookdata);

    images.push(bookdata.mainImage, bookdata.additionalImages[0], bookdata.additionalImages[1], bookdata.additionalImages[1])


    return (
        <>
            <div className="max-w-7xl mx-auto px-4 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">


                    <div className="w-full">
                        <Carousel images={images} />
                    </div>


                    <div className="flex flex-col gap-6">


                        <h1 className="text-3xl font-bold text-heading">
                            {bookdata.name}
                        </h1>


                        <p className="text-2xl font-semibold text">
                            Rs {bookdata.price} -/ only
                        </p>


                        <div className="bg-neutral-light dark:bg-neutral-dark p-4 rounded-lg border border-border">
                            <h2 className="text-lg font-semibold mb-2 text-heading">About this book</h2>
                            <p className="text-body leading-relaxed">
                                {bookdata.about}
                            </p>
                        </div>


                        <div className="bg-card dark:bg-card-dark border border-border rounded-xl shadow-sm p-6">
                            <h3 className="text-xl font-semibold mb-4 text-heading">
                                Seller Information
                            </h3>

                            <Table>
                                <TableBody>

                                    <TableRow>
                                        <TableCell className="font-medium text-body">Seller Name</TableCell>
                                        <TableCell className="font-semibold">{bookdata.userId.name}</TableCell>
                                    </TableRow>

                                    <TableRow>
                                        <TableCell className="font-medium text-body">Address</TableCell>
                                        <TableCell>{bookdata.address}</TableCell>
                                    </TableRow>

                                    <TableRow>
                                        <TableCell className="font-medium text-body">Email</TableCell>
                                        <TableCell>{bookdata.userId.email}</TableCell>
                                    </TableRow>

                                    <TableRow>
                                        <TableCell className="font-medium text-body">Phone</TableCell>
                                        <TableCell className="font-semibold">{bookdata.userId.phone}</TableCell>
                                    </TableRow>

                                </TableBody>
                            </Table>


                            <a
                                href={`https://wa.me/${bookdata.userId.phone}`}
                                target="_blank"
                                className="mt-4 inline-block bg-accent text-accent-foreground px-4 py-2 rounded-lg hover:bg-accent/80 transition"
                            >
                                Contact on WhatsApp
                            </a>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}