function ForgotPassword() {
    return (
        <>
            <section className="account-section">
                <div className="container">
                    <div className="padding-top padding-bottom">
                        <div className="account-area">
                            <div className="section-header-3">
                                <span className="cate">hello !</span>
                                <h2 className="title">don't worry</h2>
                            </div>
                            <form className="account-form">
                                <div className="form-group">
                                    <label htmlFor="email">
                                        Email<span>*</span>
                                    </label>
                                    <input type="text" placeholder="Email" id="email" required autoFocus />
                                </div>
                                <div className="form-group text-center">
                                    <input type="submit" value="reset link" />
                                </div>
                            </form>
                            <div className="option">We send a password reset link to your email.</div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
export default ForgotPassword;
