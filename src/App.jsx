import { Route, Routes } from "react-router"
import Home from "./home/Home"
import Navigation from "./Navigation"
import Login from "./login/Login"
import Register from "./register/Register"
import Create from "./create/Create"
import Catalog from "./catalog/Catalog"
import Details from "./details/Details"
import { useState } from "react"


function App() {
    const [flagman, setFlagman] = useState();
    return (
        <div id="box">
            <Navigation flagman={flagman} setFlagman={setFlagman}/>
            <main id="main-content">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login setFlagman={setFlagman}/>} />
                    <Route path="/register" element={<Register/>} />
                    <Route path="/create" element={<Create />} />
                    <Route path="/catalog" element={<Catalog />} />
                    <Route path="/catalog/details" element={<Details />} />
                </Routes>
            </main>

        </div>
    )
}

export default App
