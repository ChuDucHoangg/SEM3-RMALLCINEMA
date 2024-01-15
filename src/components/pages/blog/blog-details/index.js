import Loading from "../../../layouts/loading";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import Layout from "../../../layouts/layout";
import SearchBlog from "../../../views/blog/search";
function BlogDetails() {
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
                            <h2 className="title">blog single</h2>
                            <ul className="breadcrumb">
                                <li>
                                    <a href="index.html">Home</a>
                                </li>
                                <li>blog single</li>
                            </ul>
                        </div>
                    </div>
                </section>

                <section className="blog-section padding-top padding-bottom">
                    <div className="container">
                        <div className="row justify-content-center mb-30-none">
                            <div className="col-lg-8 mb-50 mb-lg-0">
                                <article>
                                    <div className="post-item post-details">
                                        <div className="post-thumb p-0">
                                            <img src="assets/img/blog/blog-1.jpg" alt="blog" />
                                        </div>
                                        <div className="post-content">
                                            <div className="content">
                                                <div className="entry-content p-0">
                                                    <div className="left">
                                                        <span className="date">
                                                            <i className="fal fa-clock"></i> Feb 12, 2023
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="post-header">
                                                    <h4 className="m-title">There are many variations of passages available</h4>
                                                    <p>
                                                        It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using
                                                        Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like
                                                        readable English. Many desktop publishing packages and web page editors lorem ipsum' will uncover many web sites still in their infancy. Various
                                                        versions have evolved over the years.
                                                    </p>
                                                    <blockquote>
                                                        There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour.
                                                    </blockquote>
                                                    <p>
                                                        Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo
                                                        inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut
                                                        fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
                                                    </p>
                                                    <h4 className="title">At vero eos et accusamus et iusto odio dignissimos</h4>
                                                    <p>
                                                        On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the
                                                        moment, so blinded by desire, that they cannot foresee the pain and trouble that are bound to ensue.
                                                    </p>
                                                    <p>
                                                        On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the
                                                        moment, so blinded by desire, that they cannot foresee the pain and trouble that are bound to ensue.
                                                    </p>
                                                </div>
                                                <div className="tags-area">
                                                    <div className="tags">
                                                        <span>Tags :</span>
                                                        <div className="tags-item">
                                                            <a href="#!"> Sports </a>
                                                            <a href="#!"> Events </a>
                                                            <a href="#!"> Movies </a>
                                                        </div>
                                                    </div>
                                                    <ul className="social-icons">
                                                        <li>
                                                            <a href="#!">
                                                                <i className="fab fa-facebook-f"></i>
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="#!" className="active">
                                                                <i className="fab fa-twitter"></i>
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="#!">
                                                                <i className="fab fa-instagram"></i>
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="#!">
                                                                <i className="fab fa-pinterest"></i>
                                                            </a>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                            <div className="post-meta text-center">
                                                <div className="item">
                                                    <a href="#!">
                                                        <i className="fal fa-comments-alt"></i>
                                                        <span>30</span>
                                                    </a>
                                                </div>
                                                <div className="item">
                                                    <a href="#!">
                                                        <i className="fal fa-share-alt"></i>
                                                        <span>22</span>
                                                    </a>
                                                </div>
                                                <div className="item">
                                                    <a href="#!">
                                                        <i className="fal fa-eye"></i>
                                                        <span>22k</span>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="blog-author">
                                        <div className="author-thumb my-auto">
                                            <a href="#!">
                                                <img src="assets/img/blog/author.jpg" alt="blog" />
                                            </a>
                                        </div>
                                        <div className="author-content">
                                            <b>Author</b>
                                            <h5 className="title">
                                                <a href="#!">Charley R Owens</a>
                                            </h5>
                                            <p>There are many variations of passages of Lorem Ipsum available but the majority have suffered alteration in some form by injected humour.</p>
                                        </div>
                                    </div>
                                    <div className="blog-comment">
                                        <h5 className="title">08.comments</h5>
                                        <ul className="comment-area">
                                            <li>
                                                <div className="blog-thumb">
                                                    <a href="#!">
                                                        <img src="assets/img/blog/author.jpg" alt="blog" />
                                                    </a>
                                                </div>
                                                <div className="blog-content">
                                                    <div className="blog-thumb-info">
                                                        <h6 className="title">
                                                            <a href="#!" className="mb-0">
                                                                Ralph M Harrison
                                                            </a>
                                                        </h6>
                                                        <span>
                                                            <i className="fal fa-clock"></i> 2 hour ago
                                                        </span>
                                                    </div>
                                                    <p>There are many variations of passages of Lorem Ipsum available but the majority have suffered alteration in some form by injected humour.</p>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="blog-thumb ml-5">
                                                    <a href="#!">
                                                        <img src="assets/img/blog/author.jpg" alt="blog" />
                                                    </a>
                                                </div>
                                                <div className="blog-content">
                                                    <div className="blog-thumb-info">
                                                        <h6 className="title">
                                                            <a href="#!" className="mb-0">
                                                                Ralph M Harrison
                                                            </a>
                                                        </h6>
                                                        <span>
                                                            <i className="fal fa-clock"></i> 2 hour ago
                                                        </span>
                                                    </div>
                                                    <p>There are many variations of passages of Lorem Ipsum available but the majority have suffered alteration in some form by injected humour.</p>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="blog-thumb">
                                                    <a href="#!">
                                                        <img src="assets/img/blog/author.jpg" alt="blog" />
                                                    </a>
                                                </div>
                                                <div className="blog-content">
                                                    <div className="blog-thumb-info">
                                                        <h6 className="title">
                                                            <a href="#!" className="mb-0">
                                                                Ralph M Harrison
                                                            </a>
                                                        </h6>
                                                        <span>
                                                            <i className="fal fa-clock"></i> 2 hour ago
                                                        </span>
                                                    </div>
                                                    <p>There are many variations of passages of Lorem Ipsum available but the majority have suffered alteration in some form by injected humour.</p>
                                                </div>
                                            </li>
                                        </ul>
                                        <div className="leave-comment">
                                            <h5 className="title">leave comment</h5>
                                            <form className="blog-form">
                                                <div className="form-group">
                                                    <input type="text" placeholder="Enter Your Name" required />
                                                </div>
                                                <div className="form-group">
                                                    <input type="text" placeholder="Enter Your Email" required />
                                                </div>
                                                <div className="form-group">
                                                    <textarea placeholder="Enter Your Comment" required></textarea>
                                                </div>
                                                <div className="form-group">
                                                    <input type="submit" value="Leave Comment" />
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </article>
                            </div>
                            <SearchBlog />
                        </div>
                    </div>
                </section>
            </Layout>
        </>
    );
}
export default BlogDetails;
