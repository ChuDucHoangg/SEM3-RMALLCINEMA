import { Helmet } from "react-helmet";
import LayoutProfile from "../../layouts/profile";
import { useCallback, useEffect, useState } from "react";
import api from "../../../services/api";
import url from "../../../services/url";
import { getAccessToken } from "../../../utils/auth";

function MyOrder() {
    const [myOrder, setMyOrder] = useState([]);

    const loadOrder = useCallback(async () => {
        try {
            const userToken = getAccessToken();

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${userToken}`,
                },
            };

            const orderResponse = await api.get(url.ORDER.MY_ORDER, config);
            setMyOrder(orderResponse.data);
            console.log(orderResponse.data);
        } catch (error) {}
    }, []);

    useEffect(() => {
        loadOrder();
    }, [loadOrder]);
    return (
        <>
            <Helmet>
                <title>My Order | R Mall</title>
            </Helmet>
            <LayoutProfile>
                <div class="col-12">
                    <h2 class="profile-info__heading">My Order</h2>
                </div>
            </LayoutProfile>
        </>
    );
}

export default MyOrder;
