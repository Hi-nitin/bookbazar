"use client"
import {
    Card,
    CardAction,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation";



export default function Cardcompo(params: any) {

    const router = useRouter();
    const handleclick = () => {

        router.push(`book/${params.bookid}`);

    }


    return (
        <Card className="w-full max-w-[220px] sm:max-w-[240px] md:max-w-[260px] overflow-hidden pt-0 shadow-sm hover:shadow-md transition-all">

            <img
                src={params.mainImage}
                alt={params.title}
                className="w-full h-28 sm:h-32 md:h-36 object-cover"
            />

            <CardHeader className="p-2 sm:p-3 space-y-1">

                <div className="flex items-center justify-between gap-2">

                    <CardTitle className="text-xs sm:text-sm font-semibold line-clamp-1">
                        {params.title}
                    </CardTitle>

                    <Badge
                        variant="secondary"
                        className="text-[10px] sm:text-xs px-2 py-0.5 whitespace-nowrap"
                    >
                        Rs. {params.price}
                    </Badge>

                </div>

                <CardDescription className="text-[11px] sm:text-xs line-clamp-2 text-muted-foreground">
                    {params.about}
                </CardDescription>

            </CardHeader>

            <CardFooter className="p-2 sm:p-3 pt-0">

                <Button size="sm" onClick={handleclick} className="w-full text-xs sm:text-sm h-8">
                    View Book
                </Button>

            </CardFooter>

        </Card>
    )
}