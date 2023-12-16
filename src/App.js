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
            </Routes>
        </div>
    );
}

export default App;
