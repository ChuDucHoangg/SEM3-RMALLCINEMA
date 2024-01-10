import { Navigate, Route, Routes } from "react-router-dom";
import { useJwt } from "react-jwt";
import { getAccessToken } from "./utils/auth.js";
import { MovieProvider } from "./context/MovieContext.js";
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
import Favorite from "./components/pages/profile/favorite.js";
import ChangePassword from "./components/pages/auth/change-password.js";
import NotFound from "./components/pages/other/not-found.js";
import MyBooking from "./components/pages/profile/my-booking.js";
import BookingDetail from "./components/views/booking/booking-detail.js";
import DiscountWallet from "./components/pages/profile/discount-wallet.js";
import Promotion from "./components/pages/promotion/index.js";
import ThankYou from "./components/pages/other/thank-you.js";
import PaymentError from "./components/pages/other/payment-error.js";
import FAQ from "./components/pages/other/faq.js";
import TermsConditions from "./components/pages/other/terms-conditions.js";
import ResetPassword from "./components/pages/auth/reset-password.js";

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
                    <Route path="/movie-seat/:showCode" element={<ProtectedRoute element={<MovieSeat />} />} />
                    <Route path="/movie-food" element={<ProtectedRoute element={<MovieFood />} />} />
                    <Route path="/checkout" element={<ProtectedRoute element={<MovieCheckout />} />} />

                    {/* Blog */}
                    <Route path="/blog-list" element={<Blog />} />
                    <Route path="/blog-details" element={<BlogDetails />} />

                    {/* About and Contact Us */}
                    <Route path="/about-us" element={<AboutUs />} />
                    <Route path="/contact-us" element={<Contact />} />

                    {/* Promotion */}
                    <Route path="/promotion" element={<ProtectedRoute element={<Promotion />} />} />

                    {/* Auth */}
                    <Route path="/login" element={<ProtectedLoginRoute element={<Login />} />} />
                    <Route path="/register" element={<ProtectedLoginRoute element={<Register />} />} />
                    <Route path="/forgot-password" element={<ForgotPassword />} />
                    <Route path="/change-password" element={<ProtectedRoute element={<ChangePassword />} />} />
                    <Route path="/reset-password/:resetToken" element={<ProtectedLoginRoute element={<ResetPassword />} />} />

                    {/* Profile */}
                    <Route path="/profile" element={<ProtectedRoute element={<Profile />} />} />
                    <Route path="/my-booking" element={<ProtectedRoute element={<MyBooking />} />} />
                    <Route path="/my-booking/detail/:orderCode" element={<ProtectedRoute element={<BookingDetail />} />} />
                    <Route path="/favorite" element={<ProtectedRoute element={<Favorite />} />} />
                    <Route path="/discount-wallet" element={<ProtectedRoute element={<DiscountWallet />} />} />

                    {/* Other */}
                    <Route path="*" element={<NotFound />} />
                    <Route path="checkout/thank-you/:orderCode" element={<ProtectedRoute element={<ThankYou />} />} />
                    <Route path="checkout/payment-error" element={<ProtectedRoute element={<PaymentError />} />} />
                    <Route path="faq" element={<FAQ />} />
                    <Route path="terms-conditions" element={<TermsConditions />} />
                </Routes>
            </div>
        </MovieProvider>
    );
}

export default App;
