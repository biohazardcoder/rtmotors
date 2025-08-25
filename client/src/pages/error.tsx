import { Navbar } from "@/components/shared/navbar"
import { Button } from "@/components/ui/button"
import { TriangleAlert } from "lucide-react"
import { Link } from "react-router-dom"

export const Error = () => {
    return (
        <div className="bg-[#e7e7e7]">
            <Navbar />
            <div className="w-full h-[100vh] flex flex-col gap-2 items-center justify-center text-3xl">
                <div className="flex flex-col items-center gap-2">
                    <TriangleAlert size={64} />
                     Page not found
                </div>
                <Link to={"/"}>
                    <Button className="bg-blue-500 hover:bg-blue-600 text-white">
                        Go Back
                    </Button>
                </Link>
            </div>
        </div>
    )
}
