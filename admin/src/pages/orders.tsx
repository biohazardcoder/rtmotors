import { Navbar } from "@/components/shared/navbar"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Fetch } from "@/middlewares/Fetch"
import { fetcher } from "@/middlewares/Fetcher"
import type { OrderTypes} from "@/types/RootTypes"
import { EllipsisVertical, Loader2, Pen, Trash2 } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"
import useSWR from "swr"

export const Orders = () => {
     const { data, error, isLoading, mutate } = useSWR("order", fetcher)
     const [searchTerm, setSearchTerm] = useState<string>("")
        const orders = data as OrderTypes[] || []
        if (error) return <div className="min-h-[calc(100vh-32px)] p-4 bg-white rounded-md shadow-lg">
            <Navbar/>
            <h1 className="text-center text-destructive">Error loading order data</h1>
        </div>;

        if (isLoading) return <div className="min-h-[calc(100vh-32px)] p-4 bg-white rounded-md shadow-lg">
            <Navbar/>
            <div className="flex items-center justify-center bg  h-[50vh]">
                <Loader2 className="animate-spin text-blue-500" size={30}/>
            </div>
        </div>;
                
        const handleDelete = async (id: string) => {
                try {
                        await Fetch.delete(`/order/${id}`);
                        toast.success("Car deleted successfully!");
                        mutate();
                } catch (error) {
                        toast.error("Error deleting car.");
                        console.error(error);
                }
        }
        const filteredOrders = orders.filter(order => order.orderId.includes(searchTerm));
  return (
    <div className="min-h-[calc(100vh-32px)] p-4 bg-white rounded-md shadow-lg">
      <Navbar />
       <div>
        <div>
          <Input placeholder="Search by Order ID" className="w-auto" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        </div>
          <Table>
          <TableCaption>A list of all orders.</TableCaption>
          <TableHeader>
                  <TableRow>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Car</TableHead>
                  <TableHead>User</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Status</TableHead>
                  </TableRow>
          </TableHeader>
          <TableBody>
                  {
                  filteredOrders.map(({_id, car, user, orderId, trackingNumber, contact, status}) => (
                          <TableRow key={_id} className="cursor-pointer ">
                                  <TableCell className="font-semibold uppercase">
                                    #{orderId}
                                  </TableCell>
                                  <TableCell>
                                          <img src={car.images ? car?.images[0]:""} alt={car.name} className="w-32 h-20 py-2 object-contain border border-[#003939] rounded-md"/>
                                  </TableCell>
                                  <TableCell>
                                    <div className="flex items-center gap-2">
                                      <img src={user?.avatar} alt="" className="w-8 h-8 rounded-full" /> {user?.name}
                                    </div>
                                    </TableCell>
                                  <TableCell>
                                                  {user?.email}
                                  </TableCell>
                                  <TableCell>
                                                  {contact}
                                  </TableCell>
                                  <TableCell>
                                                  {Number(trackingNumber).toLocaleString("en-US", { style: "currency", currency: "USD" })}
                                  </TableCell>
                                  <TableCell>
                                                  {status}
                                  </TableCell>

                                  <TableCell className="max-w-[100px] flex items-center gap-2 relative">
                                            <DropdownMenu>
                                                  <DropdownMenuTrigger className="absolute top-4 right-3">
                                                          <EllipsisVertical size={24} className="text-zinc-400 cursor-pointer" />
                                                  </DropdownMenuTrigger>
                                                  <DropdownMenuContent className="border-none">
                                                          <DropdownMenuItem
                                                                  className="flex items-center gap-2 text-red-600 cursor-pointer"
                                                          >
                                                                    <Button className="bg-blue-500 hover:bg-blue-600 w-full"
                                                                    // onClick={()=>handleEditMenu({ _id, image, name, job,message } as CustomerTypes)}
                                                                    >
                                                                          <Pen className="text-white"/>
                                                                  </Button>
                                                          </DropdownMenuItem>
                                                          <DropdownMenuItem
                                                                  className="flex items-center gap-2 text-red-600 cursor-pointer"
                                                          >
                                                                  <Button 
                                                                  onClick={() => handleDelete(_id||"")}
                                                                  variant={"destructive"} className="w-full">
                                                                          <Trash2 className="text-white"/>
                                                                  </Button>
                                                          </DropdownMenuItem>
                                                  </DropdownMenuContent>
                                          </DropdownMenu>
                                  </TableCell>
                          </TableRow>
                  ))
              }
          </TableBody>
          </Table>
        </div>
    </div>
  )
}
