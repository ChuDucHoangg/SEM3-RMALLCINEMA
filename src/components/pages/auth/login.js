import { NavLink } from "react-router-dom";

function Login() {
    return (
        <>
            <section className="account-section">
                <div className="container">
                    <div className="padding-top padding-bottom">
                        <div className="account-area">
                            <div className="section-header-3">
                                <span className="cate">hello !</span>
                                <h2 className="title">welcome back</h2>
                            </div>
                            <form className="account-form">
                                <div className="form-group">
                                    <label for="email">
                                        Email<span>*</span>
                                    </label>
                                    <input type="text" placeholder="Email" id="email" required />
                                </div>
                                <div className="form-group">
                                    <label for="password">
                                        Password<span>*</span>
                                    </label>
                                    <input type="password" placeholder="Password" id="password" required />
                                </div>
                                <div className="form-group checkgroup">
                                    <input type="checkbox" id="bal2" required checked />
                                    <label for="bal2">remember me</label>
                                    <NavLink to="/forgot-password" className="forget-pass">
                                        Forgot Password?
                                    </NavLink>
                                </div>
                                <div className="form-group text-center">
                                    <input type="submit" value="log in" />
                                </div>
                            </form>
                            <div className="option">
                                Don't have an account? <NavLink to="/register">register now</NavLink>.
                            </div>
                            <div className="or">
                                <span>Or</span>
                            </div>
                            <ul className="social-icons">
                                <li>
                                    <a href="#">
                                        <i className="fab fa-facebook-f"></i>
                                    </a>
                                </li>
                                <li>
                                    <a href="#">
                                        <i className="fab fa-google"></i>
                                    </a>
                                </li>
                                <li>
                                    <a href="#">
                                        <i className="fab fa-twitter"></i>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
export default Login;
