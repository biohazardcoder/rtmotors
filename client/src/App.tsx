import { Route, Routes } from "react-router-dom"
import { Home } from "./pages/home"
import { Menus } from "./components/shared/menus"

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
      <Menus/>
    </div>
  )
}

export default App