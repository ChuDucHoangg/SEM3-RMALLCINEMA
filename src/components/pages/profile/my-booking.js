import { Helmet } from "react-helmet";
import LayoutProfile from "../../layouts/profile";

function MyBooking() {
    return (
        <>
            <Helmet>
                <title>My Booking | R Mall</title>
            </Helmet>
            <LayoutProfile>
                <div class="col-12">
                    <h2 class="profile-info__heading">My Booking</h2>
                </div>
            </LayoutProfile>
        </>
    );
}

export default MyBooking;
