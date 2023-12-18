import { Helmet } from "react-helmet";
import LayoutProfile from "../../layouts/profile";
import { useEffect, useState } from "react";
import Loading from "../../layouts/loading";

function Profile() {
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 1500);
    }, []);
    return (
        <>
            <Helmet>
                <title>Profile | R Mall</title>
            </Helmet>
            {loading ? <Loading /> : ""}
            <LayoutProfile>
                <div class="col-12">
                    <div className="d-flex align-items-center justify-content-between">
                        <h2 class="profile-info__heading">Personal info</h2>

                        <button className="btn-edit">
                            <img src="./assets/icons/edit.svg" alt="" className="icon" />
                        </button>
                    </div>
                    <div className="profile-user">
                        <div className="avatar-inner">
                            <img src="./assets/img/client/4.jpg" alt="" className="profile-user__avatar" />
                            {/* <img src="./assets/img/client/default-placeholder.png" alt="" className="avatar-default" /> */}
                        </div>

                        <div className="profile-user__info">
                            <h2 className="profile-user__name">Penelope Ivy</h2>
                            <p className="profile-user__desc">Accumulated points: 1.000 point</p>
                        </div>
                    </div>

                    <div className="account-info mt-3">
                        <div className="row">
                            <p className="col-sm-3 mt-1">Full Name</p>
                            <p className="col-sm-3 mt-1 text-white">Penelope Ivy</p>
                        </div>
                        <div className="row">
                            <p className="col-sm-3 mt-1">Birthday</p>
                            <p className="col-sm-3 mt-1 text-white">23/10/2004</p>
                        </div>
                        <div className="row">
                            <p className="col-sm-3 mt-1">Email</p>
                            <p className="col-sm-3 mt-1 text-white">example@email.com</p>
                        </div>
                        <div className="row">
                            <p className="col-sm-3 mt-1">Phone</p>
                            <p className="col-sm-3 mt-1 text-white">0123456789</p>
                        </div>
                    </div>
                </div>
            </LayoutProfile>
        </>
    );
}

export default Profile;
