function SearchBlog() {
    return (
        <>
            <div className="col-lg-4 col-sm-10 col-md-8">
                <aside>
                    <div className="widget widget-search">
                        <h5 className="title">search</h5>
                        <form className="search-form">
                            <input type="text" placeholder="Search Here..." required />
                            <button type="submit">
                                <i className="flaticon-loupe"></i>Search
                            </button>
                        </form>
                    </div>
                    <div className="widget widget-post">
                        <h5 className="title">latest post</h5>
                        <div className="slider-nav">
                            <span className="far fa-angle-left widget-prev"></span>
                            <span className="far fa-angle-right widget-next"></span>
                        </div>
                        <div className="widget-slider owl-carousel owl-theme">
                            <div className="item">
                                <div className="thumb">
                                    <a href="#!">
                                        <img src="assets/img/blog/slider.jpg" alt="blog" />
                                    </a>
                                </div>
                                <div className="content">
                                    <h6 className="p-title">
                                        <a href="#!">There are many variations of passages</a>
                                    </h6>
                                    <div className="meta-post">
                                        <a href="#!" className="mr-4">
                                            <i className="fal fa-clock fa-lg"></i>Feb 12, 2023
                                        </a>
                                        <a href="#!">
                                            <i className="fal fa-comments-alt"></i>40 Comments
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div className="item">
                                <div className="thumb">
                                    <a href="#!">
                                        <img src="assets/img/blog/slider.jpg" alt="blog" />
                                    </a>
                                </div>
                                <div className="content">
                                    <h6 className="p-title">
                                        <a href="#!">There are many variations of passages</a>
                                    </h6>
                                    <div className="meta-post">
                                        <a href="#!" className="mr-4">
                                            <i className="fal fa-clock"></i>Feb 12, 2023
                                        </a>
                                        <a href="#!">
                                            <i className="fal fa-comments-alt"></i>40 Comments
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="widget widget-categories">
                        <h5 className="title">categories</h5>
                        <ul>
                            <li>
                                <a href="#!">
                                    <span>
                                        <i className="fal fa-caret-right"></i> Latest Movie
                                    </span>
                                    <span>20</span>
                                </a>
                            </li>
                            <li>
                                <a href="#!">
                                    <span>
                                        <i className="fal fa-caret-right"></i> Latest Trailers
                                    </span>
                                    <span>50</span>
                                </a>
                            </li>
                            <li>
                                <a href="#!">
                                    <span>
                                        <i className="fal fa-caret-right"></i> Upcoming Events
                                    </span>
                                    <span>40</span>
                                </a>
                            </li>
                            <li>
                                <a href="#!">
                                    <span>
                                        <i className="fal fa-caret-right"></i> Coming Soon
                                    </span>
                                    <span>25</span>
                                </a>
                            </li>
                            <li>
                                <a href="#!">
                                    <span>
                                        <i className="fal fa-caret-right"></i> National League
                                    </span>
                                    <span>15</span>
                                </a>
                            </li>
                            <li>
                                <a href="#!">
                                    <span>
                                        <i className="fal fa-caret-right"></i> Latest Events
                                    </span>
                                    <span>30</span>
                                </a>
                            </li>
                            <li>
                                <a href="#!">
                                    <span>
                                        <i className="fal fa-caret-right"></i> Internation Sports{" "}
                                    </span>
                                    <span>25</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className="widget widget-follow">
                        <h5 className="title">Follow Us</h5>
                        <ul className="social-icons">
                            <li>
                                <a href="#!" className>
                                    <i className="fab fa-facebook-f"></i>
                                </a>
                            </li>
                            <li>
                                <a href="#!" className="active">
                                    <i className="fab fa-twitter"></i>
                                </a>
                            </li>
                            <li>
                                <a href="#!" className>
                                    <i className="fab fa-pinterest-p"></i>
                                </a>
                            </li>
                            <li>
                                <a href="#!">
                                    <i className="fab fa-google"></i>
                                </a>
                            </li>
                            <li>
                                <a href="#!">
                                    <i className="fab fa-instagram"></i>
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className="widget widget-tags">
                        <h5 className="title">featured tags</h5>
                        <ul>
                            <li>
                                <a href="#!">digital</a>
                            </li>
                            <li>
                                <a href="#!">sports</a>
                            </li>
                            <li>
                                <a href="#!">events</a>
                            </li>
                            <li>
                                <a href="#!">movie</a>
                            </li>
                            <li>
                                <a href="#!">modern</a>
                            </li>
                        </ul>
                    </div>
                </aside>
            </div>
        </>
    );
}
export default SearchBlog;
