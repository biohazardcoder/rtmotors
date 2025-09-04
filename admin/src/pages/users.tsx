import { fetcher } from "@/middlewares/Fetcher";
import {  Loader2 } from "lucide-react";
import useSWR from "swr";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import type { UserTypes } from "@/types/RootTypes";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { format } from "date-fns";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Admins } from "./admins";

export const Users = () => {
    const { data, error,isLoading } = useSWR("user", fetcher)
    const [toggle, setToggle] = useState(false)
    const handleToggle =() =>{
        setToggle(!toggle)
    }

    

    const users = data as UserTypes[] || []

      if (error) return <div className="min-h-[calc(100vh-110px)] p-4 bg-white rounded-md shadow-lg">
            <h1 className="text-center text-destructive">Error loading user data</h1>
        </div>;

        if (isLoading) return <div className="min-h-[calc(100vh-110px)] p-4 bg-white rounded-md shadow-lg">
            <div className="flex items-center justify-center h-[calc(100vh-150px)]">
                <Loader2 className="animate-spin text-blue-500" size={30}/>
            </div>
        </div>;


return   ( toggle ? <Admins setToggle={setToggle} toggle={toggle}/> :   (
         <div className="min-h-[calc(100vh-110px)] p-4 bg-white rounded-md shadow-lg">
      <div>
        <Table>
        <TableCaption>A list of your users.</TableCaption>
        <TableHeader>
            <TableRow>
            <TableHead className="w-[100px]">Avatar</TableHead>
            <TableHead>First name</TableHead>
            <TableHead>Last name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead className="flex items-center justify-between">Joined 
                <Button onClick={handleToggle}>
                    {!toggle ? "Admins" : "Users"}
                </Button>
            </TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            {
                users.map((user) => (
                    <TableRow key={user.id}>
                        <TableCell>
                            <Avatar>
                                <AvatarImage src={user?.avatar} alt="User Avatar" />
                                <AvatarFallback>{user?.firstName?.charAt(0)}{user?.lastName?.charAt(0)}</AvatarFallback>
                            </Avatar>
                        </TableCell>
                        <TableCell>{user.firstName}</TableCell>
                        <TableCell>{user.lastName}</TableCell>
                        <TableCell>{user.emailAddress}</TableCell>
                        <TableCell>
                        {format(new Date(user.createdAt), "dd.MM.yyyy HH:mm")}
                        </TableCell>
                    </TableRow>
                ))
            }
        </TableBody>
        </Table>
      </div>
    </div>
  ))}
