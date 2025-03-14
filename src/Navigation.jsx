import { Link, useNavigate } from "react-router";
import { delUserData, getUserToken } from "./http/localStorage";
import { useEffect } from "react";

function Navigation({setFlagman, flagman}) {
    
    const navigate = useNavigate();
    useEffect (() => {
        const token = getUserToken();
        if (token) {
            setFlagman(true);
        } else {
            setFlagman(false);
        }
    }, []);

    const onLogout = () => {
        const data = delUserData();
        setFlagman(false)
        navigate('/');
    }

    return (
        <header>
            {/* <!-- Navigation --> */}
            <h1><Link className="home" to="/">GamesPlay</Link></h1>
            <nav>
                <Link to="/catalog">All games</Link>
                {/* <!-- Logged-in users --> */}
                {flagman ? (
                    <div id="user">
                    <Link to="/create">Create Game</Link>
                    <Link to='/' onClick={onLogout}>Logout</Link>
                </div>
                ) : (
                    <div id="guest">
                    <Link to="/login">Login</Link>
                    <Link to="/register">Register</Link>
                </div>
                )}
                
                {/* <!-- Guest users --> */}
                
            </nav>
        </header>
    )
}
export default Navigation;