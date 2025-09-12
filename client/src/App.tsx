import { Route, Routes } from "react-router-dom"
import { Home } from "./pages/home"
import { Error } from "./pages/error"
import { SignInPage } from "./pages/sign-in";
import { SignUpPage } from "./pages/sign-up";
import { Profile } from "./pages/profile";
import { Cars } from "./pages/cars";
import { CarDetail } from "./pages/car-detail";
import { About } from "./pages/about";
import { Blog } from "./pages/blog";
import { ContainerLoadings } from "./pages/container-loadings";
import { Header } from "./components/shared/header";
import { Faq } from "./pages/faq";

const App = () => {
  return (
    <div>
      <Header/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-in/*" element={<SignInPage />} />
        <Route path="/sign-up/*" element={<SignUpPage />} />
        <Route path="/dashboard" element={<Profile />} />
        <Route path="/about" element={<About />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/cars" element={<Cars />} />
        <Route path="/container-loadings" element={<ContainerLoadings />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/cars/:id" element={<CarDetail />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  )
}

export default App