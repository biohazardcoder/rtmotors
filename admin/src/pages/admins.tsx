import {  Loader2 } from "lucide-react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import type { AdminTypes, ErrorTypes } from "@/types/RootTypes";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/store/RootStore";
import { setAdmin, setError, setLoading } from "@/toolkit/adminSlicer";
import { Fetch } from "@/middlewares/Fetch";
import { useEffect } from "react";

interface AdminsProps{
    toggle:boolean
    setToggle: (val: boolean) => void;
}

export const Admins = ({toggle, setToggle}:AdminsProps) => {

    const {data, loading, error} = useSelector((state:RootState)=>state.admin)
        const dispatch = useDispatch()
    
   const GetAdmins = async () => {
        try {
            dispatch(setLoading())
            const response = (await Fetch.get("admin")).data
            dispatch(setAdmin(response))
        } catch (error) {
            const err = error as ErrorTypes
            dispatch(setError(err.response.data.message|| "Error in get all admins"))
            console.log(error);
        }
    }
    useEffect(() => {
        GetAdmins()
    }, [])
    const admins = data as AdminTypes[] || []

      if (error) return <div className="min-h-[calc(100vh-110px)] p-4 bg-white rounded-md shadow-lg">
            <h1 className="text-center text-destructive">Error loading admin data</h1>
        </div>;

        if (loading) return <div className="min-h-[calc(100vh-110px)] p-4 bg-white rounded-md shadow-lg">
            <div className="flex items-center justify-center h-[calc(100vh-150px)]">
                <Loader2 className="animate-spin text-blue-500" size={30}/>
            </div>
        </div>;

  return (
         <div className="min-h-[calc(100vh-110px)] p-4 bg-white rounded-md shadow-lg">
      <div>
        <Table>
        <TableCaption>A list of your admins.</TableCaption>
        <TableHeader>
            <TableRow>
            <TableHead>First name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead className="flex items-center justify-between">Joined 
                <Button onClick={()=>setToggle(false)}>
                    {!toggle ? "Admins" : "Users"}
                </Button>
            </TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            {
                admins.map((user) => (
                    <TableRow key={user._id}>
                        <TableCell>{user.firstName}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>
                        {format(new Date(user.createdAt || ""), "dd.MM.yyyy HH:mm")}
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
