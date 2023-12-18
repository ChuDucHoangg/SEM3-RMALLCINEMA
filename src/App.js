import { Route, Routes } from "react-router-dom";
import Home from "./components/pages/home";
import Movie from "./components/pages/movies";
import Movie_Details from "./components/pages/movies/movie-details/index.js";
import Movie_Ticket from "./components/pages/movies/movie-ticket/index.js";
import Movie_Seat from "./components/pages/movies/movie-seat/index.js";
import Movie_Food from "./components/pages/movies/movie-food/index.js";
import Movie_Checkout from "./components/pages/movies/movie-checkout/index.js";
import Blog from "./components/pages/blog/index.js";
import Blog_Details from "./components/pages/blog/blog-details/index.js";
import Contact from "./components/pages/contact/index.js";
import About_Us from "./components/pages/about/index.js";
import Login from "./components/pages/auth/login.js";
import Register from "./components/pages/auth/register.js";
import Forgot_Password from "./components/pages/auth/forgot-password.js";
import Profile from "./components/pages/profile/index.js";
import MyBooking from "./components/pages/profile/my-booking.js";
import Favorite from "./components/pages/profile/favorite.js";
import ChangePassword from "./components/pages/auth/change-password.js";

function App() {
    return (
        <div className="App">
            <Routes>
                {/* Home  */}
                <Route path="/" element={<Home />} />

                {/* Movie */}
                <Route path="/movie-list" element={<Movie />} />
                <Route path="/movie-details" element={<Movie_Details />} />
                <Route path="/movie-ticket" element={<Movie_Ticket />} />
                <Route path="/movie-seat" element={<Movie_Seat />} />
                <Route path="/movie-food" element={<Movie_Food />} />
                <Route path="/movie-checkout" element={<Movie_Checkout />} />

                {/* Blog */}
                <Route path="/blog-list" element={<Blog />} />
                <Route path="/blog-details" element={<Blog_Details />} />

                {/* About and Contact Us */}
                <Route path="/about-us" element={<About_Us />} />
                <Route path="/contact-us" element={<Contact />} />

                {/* Auth */}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/forgot-password" element={<Forgot_Password />} />
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
