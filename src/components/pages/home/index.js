import Loading from "../../layouts/loading";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import Search_Ticket from "../../views/home/search-ticket";
import Layout from "../../layouts/layout";
import Movies from "../../views/home/movies";
import Events from "../../views/home/events";
import Blog from "../../views/home/blog";
function Home() {
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
                <title>Home | R Mall Cinema</title>
            </Helmet>
            {loading ? <Loading /> : ""}
            <Layout>
                <section className="banner-section">
                    <div
                        className="banner-bg bg-fixed"
                        style={{
                            backgroundImage: "url('assets/img/banner/banner-1.jpg')",
                            backgroundSize: "cover",
                        }}
                    ></div>
                    <div className="container">
                        <div className="banner-content">
                            <h1 className="title cd-headline clip">
                                <span className="d-block">Tickets Booking</span> for
                                <span className="color-theme cd-words-wrapper p-0 m-0">
                                    <b className="is-visible">Movie</b>
                                    <b>Event</b>
                                    <b>Sport</b>
                                </span>
                            </h1>
                            <p>Buy Your Tickets Online And Enjoy Your Live Entertainment!</p>
                        </div>
                    </div>
                </section>
                <Search_Ticket />
                <Movies />
                <Events />
                <Blog />
            </Layout>
        </>
    );
}
export default Home;
