import { Route, Routes } from "react-router-dom"
import { Home } from "./pages/home"
import { Error } from "./pages/error"
import { SignInPage } from "./pages/sign-in";
import { SignUpPage } from "./pages/sign-up";
import { Profile } from "./pages/profile";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-in/*" element={<SignInPage />} />
        <Route path="/sign-up/*" element={<SignUpPage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<Error />} />

      </Routes>
    </div>
  )
}

export default App