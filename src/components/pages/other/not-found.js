import { Link } from "react-router-dom";

function NotFound() {
    return (
        <section className="section-404">
            <div className="container">
                <div className="thumb-404">
                    <img src="assets/img/404.svg" alt="404" />
                </div>
                <h3 className="title">Oppose.. Page Not Found!</h3>
                <p>This page not found you are looking for may be not exist or removed.</p>
                <Link to="/" className="custom-button">
                    Back To Home <i className="fal fa-reply"></i>
                </Link>
            </div>
        </section>
    );
}

export default NotFound;
