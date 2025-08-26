import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Fetch } from "@/middlewares/Fetch"
import { fetcher } from "@/middlewares/Fetcher"
import { EditOrder } from "@/modules/EditOrder"
import type { OrderTypes} from "@/types/RootTypes"
import {  EllipsisVertical, Loader2, Pen, Trash2 } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"
import useSWR from "swr"

export const Orders = () => {
  const { data, error, isLoading, mutate } = useSWR("order", fetcher)
  const [searchTerm, setSearchTerm] = useState<string>("")
  const orders = (data as OrderTypes[]) || []
const [editMenuOpen, setEditMenuOpen] = useState<boolean>(false)
        const [selectedMenu, setSelectedMenu] = useState<OrderTypes | null>(null)
     if (error) return <div className="min-h-[calc(100vh-110px)] p-4 bg-white rounded-md shadow-lg">
            <h1 className="text-center text-destructive">Error loading order data</h1>
        </div>;

        if (isLoading) return <div className="min-h-[calc(100vh-110px)] p-4 bg-white rounded-md shadow-lg">
            <div className="flex items-center justify-center h-[calc(100vh-150px)]">
                <Loader2 className="animate-spin text-blue-500" size={30}/>
            </div>
        </div>;
    const handleEditMenu = (order:OrderTypes) => {
                setSelectedMenu(order)
                setEditMenuOpen(true)
        }
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

  const filteredOrders = orders.filter(order => order?.orderId.includes(searchTerm));

  return (
         <div className="min-h-[calc(100vh-110px)] p-4 bg-white rounded-md shadow-lg">
      <div>
        <Input placeholder="Search by Order ID" className="w-auto mb-4" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />

        <div className="grid gap-4 md:hidden">
          {filteredOrders.map(({ _id, car, user, orderId, trackingNumber, contact, status }) => (
            <div key={_id} className="border rounded-lg p-4 shadow-md relative">
              <h2 className="font-bold">Order #<span className="uppercase">{orderId}</span></h2>
              <img src={car?.images?.[0] || ""} alt={car?.name} className="w-full h-32 object-contain my-2  rounded-md"/>
              <div className="flex items-center gap-2">
                <img src={user?.avatar} alt="" className="w-8 h-8 rounded-full"/> {user?.name}
              </div>
              <p className="text-sm text-gray-600">{user?.email}</p>
              <p>{contact}</p>
              <p className="font-semibold">{Number(trackingNumber).toLocaleString("en-US", { style: "currency", currency: "USD" })}</p>
              <p className={`capitalize font-semibold ${status === "pending" ? "text-yellow-500" :  status === "delivering" ? "text-blue-500" : status === "completed" ? "text-green-500" : "text-red-500"}`}>{status}</p>

              <DropdownMenu>
                <DropdownMenuTrigger className="absolute top-2 right-2">
                  <EllipsisVertical size={20} className="text-zinc-400 cursor-pointer"/>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="border-none">
                  <DropdownMenuItem>
                    <Button className="bg-blue-500 hover:bg-blue-600 w-full"
                      onClick={() => handleEditMenu({ _id, car, user, orderId, trackingNumber, contact, status })}
                    >
                      <Pen className="text-white"/>
                    </Button>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Button onClick={() => handleDelete(_id || "")} variant={"destructive"} className="w-full">
                      <Trash2 className="text-white"/>
                    </Button>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ))}
        </div>

        <div className="hidden md:block">
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
              {filteredOrders.map(({ _id, car, user, orderId, trackingNumber, contact, status }) => (
                <TableRow key={_id}>
                  <TableCell className="font-semibold uppercase">#{orderId}</TableCell>
                  <TableCell>
                    <img src={car?.images?.[0] || ""} alt={car?.name} className="w-32 h-20 py-2 object-contain border rounded-md"/>
                  </TableCell>
                  <TableCell>
                      {user?.name}
                  </TableCell>
                  <TableCell>{user?.email}</TableCell>
                  <TableCell>{contact}</TableCell>
                  <TableCell>
                    {Number(trackingNumber).toLocaleString("en-US", { style: "currency", currency: "USD" })}
                  </TableCell>
                  <TableCell>
                        <p className={`capitalize font-semibold ${status === "pending" ? "text-yellow-500" :  status === "delivering" ? "text-blue-500" : status === "completed" ? "text-green-500" : "text-red-500"}`}>{status}</p>
                  </TableCell>
                  <TableCell className="max-w-[100px] flex items-center gap-2 relative">
                    <DropdownMenu>
                      <DropdownMenuTrigger className="absolute top-4 right-3">
                        <EllipsisVertical size={24} className="text-zinc-400 cursor-pointer"/>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="border-none">
                        <DropdownMenuItem>
                          <Button className="bg-blue-500 hover:bg-blue-600 w-full" onClick={() => {
                            handleEditMenu({ _id, car, user, orderId, trackingNumber, contact, status });
                          }}>
                            <Pen className="text-white"/>
                          </Button>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Button onClick={() => handleDelete(_id || "")} variant={"destructive"} className="w-full">
                            <Trash2 className="text-white"/>
                          </Button>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
          {editMenuOpen && selectedMenu && (
                        <EditOrder
                                order={selectedMenu!}
                                open={editMenuOpen}
                                onOpenChange={setEditMenuOpen} 
                        />
                        )}
      </div>
    </div>
  )
}
