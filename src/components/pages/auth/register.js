import { NavLink } from "react-router-dom";

function Register() {
    return (
        <>
            <section className="account-section bg_img" data-background="assets/images/account/account-bg.html">
                <div className="container">
                    <div className="padding-top padding-bottom">
                        <div className="account-area">
                            <div className="section-header-3">
                                <span className="cate">welcome !</span>
                                <h2 className="title">Create Account</h2>
                            </div>
                            <form className="account-form">
                                <div className="form-group">
                                    <label for="name">
                                        Name<span>*</span>
                                    </label>
                                    <input type="text" placeholder="Enter Your Name" id="name" required />
                                </div>
                                <div className="form-group">
                                    <label for="email">
                                        Email<span>*</span>
                                    </label>
                                    <input type="text" placeholder="Enter Your Email" id="email" required />
                                </div>
                                <div className="form-group">
                                    <label for="password">
                                        Password<span>*</span>
                                    </label>
                                    <input type="password" placeholder="Password" id="password" required />
                                </div>
                                <div className="form-group">
                                    <label for="confirm-password">
                                        Confirm Password<span>*</span>
                                    </label>
                                    <input type="password" placeholder="Re-type Password" id="confirm-password" required />
                                </div>
                                <div className="form-group checkgroup">
                                    <input type="checkbox" id="agree" required checked />
                                    <label for="agree">
                                        I agree with this <a href="#">Terms </a> and <a href="#"> Privacy Policy</a>.{" "}
                                    </label>
                                </div>
                                <div className="form-group text-center">
                                    <input type="submit" value="Register" />
                                </div>
                            </form>
                            <div className="option">
                                Already have an account? <NavLink to="/login">Login</NavLink>.
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
export default Register;
