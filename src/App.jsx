import { Route, Routes } from "react-router"
import Home from "./home/Home"
import Navigation from "./Navigation"
import Login from "./login/Login"
import Register from "./register/Register"


function App() {

    return (
        <div id="box">
            <Navigation />
            <main id="main-content">
                <Routes>
                    <Route path="/" element={<Home />}></Route>
                    <Route path="/login" element={<Login/>}></Route>
                    <Route path="/register" element={<Register/>}></Route>
                </Routes>
            </main>

        </div>
    )
}

export default App
