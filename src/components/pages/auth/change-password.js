import LayoutProfile from "../../layouts/profile";

function ChangePassword() {
    return (
        <LayoutProfile>
            <div className="col-12">
                <h2 className="profile-info__heading">Change Password</h2>
                <form className="account-form">
                    <div className="form-group">
                        <label htmlFor="email">
                            Current Password <span className="text-danger">*</span>
                        </label>
                        <input type="password" placeholder="***********" id="current-password" className="input-border" required autoFocus />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">
                            New Password <span className="text-danger">*</span>
                        </label>
                        <input type="password" placeholder="***********" id="new-password" className="input-border" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="confirm-password">
                            Confirm Password <span className="text-danger">*</span>
                        </label>
                        <input type="password" placeholder="***********" id="confirm-password" className="input-border" required />
                    </div>
                    <button type="submit" className="mt-3 btn-primary-color" style={{ width: "100%" }}>
                        Change Password
                    </button>
                </form>
            </div>
        </LayoutProfile>
    );
}

export default ChangePassword;
