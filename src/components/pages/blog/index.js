import Loading from "../../layouts/loading";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import Layout from "../../layouts/layout";
import BlogContent from "../../views/blog/content";
function Blog() {
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
                <title>Blog | R Ticket</title>
            </Helmet>
            {loading ? <Loading /> : ""}
            <Layout>
                <section
                    className="main-page-header speaker-banner"
                    style={{
                        backgroundImage: "url('assets/img/banner/banner-2.jpg')",
                        backgroundSize: "cover",
                    }}
                >
                    <div className="container">
                        <div className="speaker-banner-content">
                            <h2 className="title">blog 02</h2>
                            <ul className="breadcrumb">
                                <li>
                                    <a href="index.html">Home</a>
                                </li>
                                <li>blog 02</li>
                            </ul>
                        </div>
                    </div>
                </section>

                <BlogContent />
            </Layout>
        </>
    );
}
export default Blog;
