import { Navbar } from "@/components/shared/navbar"
import Loader from "@/components/ui/loader";
import { SignUp, useUser } from "@clerk/clerk-react"
import { Navigate } from "react-router-dom"

export const SignUpPage = () => {
    const { isSignedIn,isLoaded } = useUser();


    if (isSignedIn && isLoaded) {
        return <Navigate to="/profile" />;
    }

  return (
    <div className="min-h-screen flex items-center justify-center">
        <Navbar/>
        <div>
            {
                isLoaded ? (
                    <SignUp routing="path" path="/sign-up" />
                ) : (
                        <Loader/>
                )
            }
        </div>
    </div>
  )
}
