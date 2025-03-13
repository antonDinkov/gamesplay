import { Route, Routes } from "react-router"
import Home from "./home/Home"
import Navigation from "./Navigation"


function App() {

    return (
        <div id="box">
            <Navigation />
            <main id="main-content">
                <Routes>
                    <Route path="/" element={<Home />}></Route>
                </Routes>
            </main>

        </div>
    )
}

export default App
