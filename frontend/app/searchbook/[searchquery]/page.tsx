import Navbar from "../../components/Navbar";
import Searchbox from "./search";
import Cardcompo from "../../components/cardcompo";
import Paginationcompo from "../../components/Paginationcompo";

interface PageProps {
    params: Promise<{
        searchquery: string;
    }>;
    searchParams: Promise<{
        page?: string;
        minprice?: string;
        maxprice?: string;
    }>;
}

type Booktype = {
    _id: string;
    name: string;
    about: string;
    price: number;
    address: string;
    mainImage: string;
    additionalImages: string[];
};

// FETCH DATA FROM SERVER
const getSearchResults = async (query: string) => {
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/book/search?q=${encodeURIComponent(query)}`,
            { cache: "no-store" }
        );


        const bookres = await res.json();
       
        
        return bookres.data;
    } catch (err) {
        console.log(err);
        return { data: [] };
    }
};

export default async function SearchBookPage({
    params,
    searchParams
}: PageProps) {

    // ✅ FIX: unwrap both promises
    const { searchquery } = await params;
    const sp = await searchParams;

    const pagenum = Number(sp?.page) || 1;

    const query = decodeURIComponent(searchquery);

    console.log("Search:", query);
    console.log("Page:", pagenum);

    const books = await getSearchResults(query);
    console.log(books);
    

    return (
        <main>
            <Navbar />

            <Searchbox />

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 justify-items-center px-4">

                {books?.map((val: Booktype) => (
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

            <Paginationcompo totalpages={books?.totalpages || 1} />
        </main>
    );
}