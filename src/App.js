import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./components/pages/home";
import Movie from "./components/pages/movies";
import MovieDetails from "./components/pages/movies/movie-details/index.js";
import MovieTicket from "./components/pages/movies/movie-ticket/index.js";
import MovieSeat from "./components/pages/movies/movie-seat/index.js";
import MovieFood from "./components/pages/movies/movie-food/index.js";
import MovieCheckout from "./components/pages/movies/movie-checkout/index.js";
import Blog from "./components/pages/blog/index.js";
import BlogDetails from "./components/pages/blog/blog-details/index.js";
import Contact from "./components/pages/contact/index.js";
import AboutUs from "./components/pages/about/index.js";
import Login from "./components/pages/auth/login.js";
import Register from "./components/pages/auth/register.js";
import ForgotPassword from "./components/pages/auth/forgot-password.js";
import Profile from "./components/pages/profile/index.js";
import MyBooking from "./components/pages/profile/my-booking.js";
import Favorite from "./components/pages/profile/favorite.js";
import ChangePassword from "./components/pages/auth/change-password.js";
import { useJwt } from "react-jwt";

function App() {
    const ProtectedRoute = ({ element }) => {
        const token = localStorage.getItem("accessToken");
        const { isExpired, isInvalid } = useJwt(token);

        if (!token || isExpired || isInvalid) {
            localStorage.removeItem("access_token");
            return <Navigate to="/login" />;
        }

        return element;
    };

    const ProtectedLoginRoute = ({ element }) => {
        const token = localStorage.getItem("access_token");
        const { isExpired, isInvalid } = useJwt(token);

        if (token && !isExpired && !isInvalid) {
            return <Navigate to="/" />;
        }

        return element;
    };
    return (
        <div className="App">
            <Routes>
                {/* Home  */}
                <Route path="/" element={<Home />} />

                {/* Movie */}
                <Route path="/movie-list" element={<Movie />} />
                <Route path="/movie-details" element={<MovieDetails />} />
                <Route path="/movie-ticket" element={<MovieTicket />} />
                <Route path="/movie-seat" element={<MovieSeat />} />
                <Route path="/movie-food" element={<MovieFood />} />
                <Route path="/movie-checkout" element={<MovieCheckout />} />

                {/* Blog */}
                <Route path="/blog-list" element={<Blog />} />
                <Route path="/blog-details" element={<BlogDetails />} />

                {/* About and Contact Us */}
                <Route path="/about-us" element={<AboutUs />} />
                <Route path="/contact-us" element={<Contact />} />

                {/* Auth */}
                <Route path="/login" element={<ProtectedLoginRoute element={<Login />} />} />
                <Route path="/register" element={<ProtectedLoginRoute element={<Register />} />} />
                <Route path="/forgot-password" element={<ProtectedLoginRoute element={<ForgotPassword />} />} />
                <Route path="/change-password" element={<ChangePassword />} />

                {/* Profile */}
                <Route path="/profile" element={<Profile />} />
                <Route path="/my-booking" element={<MyBooking />} />
                <Route path="/favorite" element={<Favorite />} />
            </Routes>
        </div>
    );
}

export default App;
