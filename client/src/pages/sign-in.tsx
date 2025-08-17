import { Navbar } from "@/components/shared/navbar"
import Loader from "@/components/ui/loader";
import { SignIn, useUser } from "@clerk/clerk-react"
import { Navigate } from "react-router-dom"

export const SignInPage = () => {
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
                    <SignIn routing="path" path="/sign-in" />
                ) : (
                        <Loader/>
                )
            }
        </div>
    </div>
  )
}
