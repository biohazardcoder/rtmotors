import { Navbar } from "@/components/shared/navbar"
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

export const Users = () => {
    const { data, error,isLoading } = useSWR("user", fetcher)

    const users = data as UserTypes[] || []

    if (error) return <div className="min-h-[calc(100vh-32px)] p-4 bg-white rounded-md shadow-lg">
      <Navbar button={false}/>
      <h1 className="text-center text-destructive">Error loading user data</h1>
    </div>;

    if (isLoading) return <div className="min-h-[calc(100vh-32px)] p-4 bg-white rounded-md shadow-lg">
      <Navbar />
      <div className="flex items-center justify-center bg  h-[50vh]">
        <Loader2 className="animate-spin text-blue-500" size={30}/>
      </div>
    </div>;

  return (
     <div className="min-h-[calc(100vh-32px)] p-4 bg-white rounded-md shadow-lg">
      <Navbar/>
      <div>
        <Table>
        <TableCaption>A list of your users.</TableCaption>
        <TableHeader>
            <TableRow>
            <TableHead className="w-[100px]">Avatar</TableHead>
            <TableHead>First name</TableHead>
            <TableHead>Last name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Joined</TableHead>
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
  )
}
