import { NavLink } from "react-router-dom";
import SearchBlog from "./search";

function BlogContent() {
    return (
        <>
            <section className="blog-section padding-top padding-bottom">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-8 mb-50 mb-lg-0">
                            <article>
                                <div className="post-item">
                                    <div className="post-thumb">
                                        <NavLink to="/blog-details">
                                            <img src="assets/img/blog/blog-1.jpg" alt="blog" />
                                        </NavLink>
                                    </div>
                                    <div className="post-content">
                                        <div className="post-header">
                                            <h4 className="title">
                                                <NavLink to="/blog-details">There are many variations of passages of lorem ipsum available</NavLink>
                                            </h4>
                                            <div className="meta-post">
                                                <a href="#!" className="mr-4">
                                                    <i className="fal fa-clock"></i>Feb 12, 2023
                                                </a>
                                                <a href="#!">
                                                    <i className="fal fa-comments-alt"></i>40 Comments
                                                </a>
                                            </div>
                                            <p>
                                                It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem
                                                Ipsum is that it has a more-or-less normal distribution of letters.
                                            </p>
                                        </div>
                                        <div className="entry-content">
                                            <div className="left">
                                                <div className="authors">
                                                    <div className="thumb">
                                                        <a href="#!">
                                                            <img src="assets/img/blog/author.jpg" alt="#" />
                                                        </a>
                                                    </div>
                                                    <h6 className="title">
                                                        <a href="#!">Harold C Ayala</a>
                                                    </h6>
                                                </div>
                                            </div>
                                            <a href="#!" className="buttons">
                                                Read More <i className="fal fa-long-arrow-alt-right"></i>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <div className="post-item">
                                    <div className="post-thumb">
                                        <div className="owl-carousel owl-theme blog-slider">
                                            <img src="assets/img/blog/blog-2.jpg" alt="blog" />
                                            <img src="assets/img/blog/blog-3.jpg" alt="blog" />
                                            <img src="assets/img/blog/blog-4.jpg" alt="blog" />
                                            <img src="assets/img/blog/blog-1.jpg" alt="blog" />
                                        </div>
                                        <div className="blog-prev">
                                            <i className="fal fa-long-arrow-alt-right"></i>
                                        </div>
                                        <div className="blog-next">
                                            <i className="fal fa-long-arrow-alt-right"></i>
                                        </div>
                                    </div>
                                    <div className="post-content">
                                        <div className="post-header">
                                            <h4 className="title">
                                                <a href="blog-details.html">There are many variations of passages of lorem ipsum available</a>
                                            </h4>
                                            <div className="meta-post">
                                                <a href="#!" className="mr-4">
                                                    <i className="fal fa-clock"></i>Feb 12, 2023
                                                </a>
                                                <a href="#!">
                                                    <i className="fal fa-comments-alt"></i>40 Comments
                                                </a>
                                            </div>
                                            <p>
                                                It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem
                                                Ipsum is that it has a more-or-less normal distribution of letters.
                                            </p>
                                        </div>
                                        <div className="entry-content">
                                            <div className="left">
                                                <div className="authors">
                                                    <div className="thumb">
                                                        <a href="#!">
                                                            <img src="assets/img/blog/author.jpg" alt="#" />
                                                        </a>
                                                    </div>
                                                    <h6 className="title">
                                                        <a href="#!">Harold C Ayala</a>
                                                    </h6>
                                                </div>
                                            </div>
                                            <a href="#!" className="buttons">
                                                Read More <i className="fal fa-long-arrow-alt-right"></i>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <div className="post-item">
                                    <div className="post-thumb">
                                        <img src="assets/img/blog/blog-3.jpg" alt="blog" />
                                        <a href="https://www.youtube.com/watch?v=uyNh0RPiLyI" className="video-button video-popup">
                                            <i className="fal fa-play-circle"></i>
                                        </a>
                                    </div>
                                    <div className="post-content">
                                        <div className="post-header">
                                            <h4 className="title">
                                                <a href="blog-details.html">There are many variations of passages of lorem ipsum available</a>
                                            </h4>
                                            <div className="meta-post">
                                                <a href="#!" className="mr-4">
                                                    <i className="fal fa-clock"></i>Feb 12, 2023
                                                </a>
                                                <a href="#!">
                                                    <i className="fal fa-comments-alt"></i>40 Comments
                                                </a>
                                            </div>
                                            <p>
                                                It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem
                                                Ipsum is that it has a more-or-less normal distribution of letters.
                                            </p>
                                        </div>
                                        <div className="entry-content">
                                            <div className="left">
                                                <div className="authors">
                                                    <div className="thumb">
                                                        <a href="#!">
                                                            <img src="assets/img/blog/author.jpg" alt="#" />
                                                        </a>
                                                    </div>
                                                    <h6 className="title">
                                                        <a href="#!">Harold C Ayala</a>
                                                    </h6>
                                                </div>
                                            </div>
                                            <a href="#!" className="buttons">
                                                Read More <i className="fal fa-long-arrow-alt-right"></i>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <div className="post-item">
                                    <div className="post-thumb">
                                        <a href="blog-details.html">
                                            <img src="assets/img/blog/blog-4.jpg" alt="blog" />
                                        </a>
                                    </div>
                                    <div className="post-content">
                                        <div className="post-header">
                                            <h4 className="title">
                                                <a href="blog-details.html">There are many variations of passages of lorem ipsum available</a>
                                            </h4>
                                            <div className="meta-post">
                                                <a href="#!" className="mr-4">
                                                    <i className="fal fa-clock"></i>Feb 12, 2023
                                                </a>
                                                <a href="#!">
                                                    <i className="fal fa-comments-alt"></i>40 Comments
                                                </a>
                                            </div>
                                            <p>
                                                It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem
                                                Ipsum is that it has a more-or-less normal distribution of letters.
                                            </p>
                                        </div>
                                        <div className="entry-content">
                                            <div className="left">
                                                <div className="authors">
                                                    <div className="thumb">
                                                        <a href="#!">
                                                            <img src="assets/img/blog/author.jpg" alt="#" />
                                                        </a>
                                                    </div>
                                                    <h6 className="title">
                                                        <a href="#!">Harold C Ayala</a>
                                                    </h6>
                                                </div>
                                            </div>
                                            <a href="#!" className="buttons">
                                                Read More <i className="fal fa-long-arrow-alt-right"></i>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </article>
                            <div className="pagination-area text-center">
                                <a href="#!">
                                    <i className="fal fa-long-arrow-alt-left"></i>
                                    <span>Prev</span>
                                </a>
                                <a href="#!">1</a>
                                <a href="#!" className="active">
                                    2
                                </a>
                                <a href="#!">3</a>
                                <a href="#!">
                                    <span>Next</span>
                                    <i className="fal fa-long-arrow-alt-right"></i>
                                </a>
                            </div>
                        </div>
                        <SearchBlog />
                    </div>
                </div>
            </section>
        </>
    );
}
export default BlogContent;
