import { Helmet } from "react-helmet";
import LayoutProfile from "../../layouts/profile";

function Favorite() {
    return (
        <>
            <Helmet>
                <title>Favorite | R Mall</title>
            </Helmet>
            <LayoutProfile>
                <div class="col-12">
                    <h2 class="profile-info__heading">Favorite</h2>
                </div>
            </LayoutProfile>
        </>
    );
}

export default Favorite;
