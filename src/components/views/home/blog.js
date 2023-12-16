function Blog() {
    return (
        <>
            <section className="movie-section padding-bottom bg-two">
                <div className="container">
                    <div className="row flex-wrap-reverse justify-content-center">
                        <div className="col-lg-12">
                            <div className="article-section">
                                <div className="section-header-1">
                                    <h2 className="title">Blog</h2>
                                    <a className="view-more" href="blog.html">
                                        View More <i className="fal fa-long-arrow-alt-right"></i>{" "}
                                    </a>
                                </div>
                                <div className="row mb-30-none justify-content-center">
                                    <div className="col-sm-6 col-lg-4">
                                        <div className="blog-grid">
                                            <div className="movie-thumb c-thumb">
                                                <a href="#">
                                                    <img src="assets/img/blog/blog-1.jpg" alt="blog" />
                                                </a>
                                                <div className="event-date">
                                                    <h6 className="date-title">11</h6>
                                                    <span>Feb</span>
                                                </div>
                                            </div>
                                            <div className="blog-content">
                                                <h5 className="title">There are many variations of passages</h5>
                                                <p>It is a long established fact that a reader will be distracted by the readable content of a page</p>
                                                <a href>
                                                    Read More <i className="fal fa-long-arrow-alt-right"></i>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-sm-6 col-lg-4">
                                        <div className="blog-grid">
                                            <div className="movie-thumb c-thumb">
                                                <a href="#">
                                                    <img src="assets/img/blog/blog-2.jpg" alt="blog" />
                                                </a>
                                                <div className="event-date">
                                                    <h6 className="date-title">11</h6>
                                                    <span>Feb</span>
                                                </div>
                                            </div>
                                            <div className="blog-content">
                                                <h5 className="title">Contrary to popular belief distracted</h5>
                                                <p>It is a long established fact that a reader will be distracted by the readable content of a page</p>
                                                <a href>
                                                    Read More <i className="fal fa-long-arrow-alt-right"></i>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-sm-6 col-lg-4">
                                        <div className="blog-grid">
                                            <div className="movie-thumb c-thumb">
                                                <a href="#">
                                                    <img src="assets/img/blog/blog-3.jpg" alt="blog" />
                                                </a>
                                                <div className="event-date">
                                                    <h6 className="date-title">11</h6>
                                                    <span>Feb</span>
                                                </div>
                                            </div>
                                            <div className="blog-content">
                                                <h5 className="title">Sed ut perspiciatis unde omnis iste</h5>
                                                <p>It is a long established fact that a reader will be distracted by the readable content of a page</p>
                                                <a href>
                                                    Read More <i className="fal fa-long-arrow-alt-right"></i>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
export default Blog;
