import { useMovieContext } from "../../../../context/MovieContext";
import Layout from "../../../layouts/layout";
import { Helmet } from "react-helmet";
import Loading from "../../../layouts/loading";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function ThankYou() {
    const { message } = useMovieContext();

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 2000);
    });
    return (
        <>
            <Helmet>
                <title>Result | R Mall Cinema</title>
            </Helmet>
            {loading ? <Loading /> : ""}
            <Layout>
                <section
                    class="main-page-header speaker-banner"
                    style={{
                        backgroundImage: "url('assets/img/banner/banner-2.jpg')",
                        backgroundSize: "cover",
                    }}
                >
                    <div class="container">
                        <div class="speaker-banner-content">
                            <h2 class="title">Result Order</h2>
                            <ul class="breadcrumb">
                                <li>
                                    <Link to="/">Home</Link>
                                </li>
                                <li>Result Order</li>
                            </ul>
                        </div>
                    </div>
                </section>
                <div className="container">
                    <div className="padding-top padding-bottom">
                        <h2>{message}</h2>

                        <Link to="/movies" className="custom-button">
                            <i className="far fa-reply"></i> Continue booking
                        </Link>
                    </div>
                </div>
            </Layout>
        </>
    );
}

export default ThankYou;
