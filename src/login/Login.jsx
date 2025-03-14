import { useNavigate } from "react-router";
import { post } from "../http/services";

function Login({ setFlagman }) {
    const navigate = useNavigate();
    const onLogin = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const gameData = Object.fromEntries(formData);
        try {
            const fetched = await post('http://localhost:3030/users/login', 'POST', gameData);
            setFlagman(true);
            navigate('/');
        } catch (error) {
            alert(error.message);
        }

    }
    return (
        <section id="login-page" className="auth">
            <form id="login" onSubmit={onLogin}>

                <div className="container">
                    <div className="brand-logo"></div>
                    <h1>Login</h1>
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name="email" placeholder="Sokka@gmail.com" />

                    <label htmlFor="login-pass">Password:</label>
                    <input type="password" id="login-password" name="password" />
                    <input type="submit" className="btn submit" value="Login" />
                    <p className="field">
                        <span>If you don't have profile click <a href="#">here</a></span>
                    </p>
                </div>
            </form>
        </section>
    )
};

export default Login;