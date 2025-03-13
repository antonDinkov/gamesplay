import { Link } from "react-router";

function Navigation() {
    return (
        <header>
            {/* <!-- Navigation --> */}
            <h1><Link className="home" href="/">GamesPlay</Link></h1>
            <nav>
                <Link href="#">All games</Link>
                {/* <!-- Logged-in users --> */}
                <div id="user">
                    <Link href="#">Create Game</Link>
                    <Link href="#">Logout</Link>
                </div>
                {/* <!-- Guest users --> */}
                <div id="guest">
                    <Link href="#">Login</Link>
                    <Link href="#">Register</Link>
                </div>
            </nav>
        </header>
    )
}
export default Navigation;