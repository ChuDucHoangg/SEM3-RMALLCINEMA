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
import { getAccessToken } from "./utils/auth.js";
import NotFound from "./components/pages/other/not-found.js";
import { MovieProvider } from "./context/MovieContext.js";

function App() {
    const ProtectedRoute = ({ element }) => {
        const token = getAccessToken();
        const { isExpired, isInvalid } = useJwt(token);

        if (!token || isExpired || isInvalid) {
            localStorage.removeItem("access_token");
            return <Navigate to="/login" />;
        }

        return element;
    };

    const ProtectedLoginRoute = ({ element }) => {
        const token = getAccessToken();
        const { isExpired, isInvalid } = useJwt(token);

        if (token && !isExpired && !isInvalid) {
            return <Navigate to="/" />;
        }

        return element;
    };
    return (
        <MovieProvider>
            <div className="App">
                <Routes>
                    {/* Home  */}
                    <Route path="/" element={<Home />} />

                    {/* Movie */}
                    <Route path="/movies" element={<Movie />} />
                    <Route path="/movie-details/:id" element={<MovieDetails />} />
                    <Route path="/movie-ticket/:id" element={<ProtectedRoute element={<MovieTicket />} />} />
                    <Route path="/movie-seat/:id" element={<ProtectedRoute element={<MovieSeat />} />} />
                    <Route path="/movie-food" element={<ProtectedRoute element={<MovieFood />} />} />
                    <Route path="/movie-checkout" element={<ProtectedRoute element={<MovieCheckout />} />} />

                    {/* Blog */}
                    <Route path="/blog-list" element={<Blog />} />
                    <Route path="/blog-details" element={<BlogDetails />} />

                    {/* About and Contact Us */}
                    <Route path="/about-us" element={<AboutUs />} />
                    <Route path="/contact-us" element={<Contact />} />

                    {/* Auth */}
                    <Route path="/login" element={<ProtectedLoginRoute element={<Login />} />} />
                    <Route path="/register" element={<ProtectedLoginRoute element={<Register />} />} />
                    <Route path="/forgot-password" element={<ForgotPassword />} />
                    <Route path="/change-password" element={<ProtectedRoute element={<ChangePassword />} />} />

                    {/* Profile */}
                    <Route path="/profile" element={<ProtectedRoute element={<Profile />} />} />
                    <Route path="/my-booking" element={<ProtectedRoute element={<MyBooking />} />} />
                    <Route path="/favorite" element={<ProtectedRoute element={<Favorite />} />} />

                    {/* Other */}
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </div>
        </MovieProvider>
    );
}

export default App;
