import { useNavigate } from "react-router";
import { post } from "../http/services";

function Register({setFlagman}) {
    const navigate = useNavigate();

    const onRegister = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData);
        try {
            const response = await post ('http://localhost:3030/users/register', 'POST', data);
            setFlagman(true);
            navigate('/')
        } catch (error) {
            alert (error.message)
        }

    }

    return (
        <section id="register-page" className="content auth">
            <form id="register" onSubmit={onRegister}>
                <div className="container">
                    <div className="brand-logo"></div>
                    <h1>Register</h1>

                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name="email" placeholder="maria@email.com" />

                    <label htmlFor="pass">Password:</label>
                    <input type="password" name="password" id="register-password" />

                    <label htmlFor="con-pass">Confirm Password:</label>
                    <input type="password" name="confirm-password" id="confirm-password" />

                    <input className="btn submit" type="submit" value="Register" />

                    <p className="field">
                        <span>If you already have profile click <a href="#">here</a></span>
                    </p>
                </div>
            </form>
        </section>
    )
}

export default Register;