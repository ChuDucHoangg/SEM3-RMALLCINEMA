import Loading from "../../layouts/loading";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import Layout from "../../layouts/layout";
import SearchTicket from "../../views/movies/search-ticket";
import MoviesList from "../../views/movies/movies-list";
function Movie() {
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
                <title>Movie | R Mall Cinema</title>
            </Helmet>
            {loading ? <Loading /> : ""}
            <Layout>
                <section className="banner-section">
                    <div
                        className="banner-bg bg-fixed"
                        style={{
                            backgroundImage: "url('assets/img/banner/banner-movie.jpg')",
                            backgroundSize: "cover",
                        }}
                    ></div>
                    <div className="container">
                        <div className="banner-content">
                            <h1 className="title bold">
                                buy <span className="color-theme">movie</span> tickets
                            </h1>
                            <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</p>
                        </div>
                    </div>
                </section>
                <SearchTicket />
                <MoviesList />
            </Layout>
        </>
    );
}
export default Movie;
