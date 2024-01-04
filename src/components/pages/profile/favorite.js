import { Helmet } from "react-helmet";
import LayoutProfile from "../../layouts/profile";
import { useCallback, useEffect, useMemo, useState } from "react";
import api from "../../../services/api";
import url from "../../../services/url";
import { getAccessToken } from "../../../utils/auth";
import { Link } from "react-router-dom";
import Loading from "../../layouts/loading";
import Swal from "sweetalert2";

function Favorite() {
    const [favorite, setFavorite] = useState([]);
    const [loading, setLoading] = useState(false);

    // Config token
    const userToken = getAccessToken();

    const config = useMemo(() => {
        return {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userToken}`,
            },
        };
    }, [userToken]);

    // Get favorite by user
    const loadFavorite = useCallback(async () => {
        try {
            const favoriteResponse = await api.get(url.FAVORITE.BY_USER, config);
            setFavorite(favoriteResponse.data);
        } catch (error) {}
    }, [config]);

    useEffect(() => {
        loadFavorite();
    }, [loadFavorite]);

    // Remove favorite
    const handleRemoveFavoriteItem = async (movieId) => {
        try {
            const isConfirmed = await Swal.fire({
                title: "Are you sure?",
                text: "You want to remove it from your favorites list?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "I'm sure",
            });

            if (isConfirmed.isConfirmed) {
                const removeResponse = await api.delete(url.FAVORITE.REMOVE + `?id=${movieId}`, config);
                setLoading(true);
                if (removeResponse.status === 200) {
                    loadFavorite();
                }
            }

            setTimeout(() => {
                setLoading(false);
            }, 2000);
        } catch (error) {}
    };

    return (
        <>
            <Helmet>
                <title>Favorite | R Mall</title>
            </Helmet>
            <LayoutProfile>
                {loading ? <Loading /> : ""}
                <div className="col-12">
                    <h2 className="profile-info__heading">Favorite</h2>
                    {favorite.length > 0 ? (
                        favorite.map((item, index) => (
                            <div className="movie-list mb-0" key={index}>
                                <div className="movie-thumb c-thumb">
                                    <Link to={`/movie-details/${item.movieId}`} className="w-100 h-100">
                                        <img src="assets/img/movie/movie-list-1.jpg" alt="movie" />
                                    </Link>
                                </div>
                                <div className="movie-content bg-one">
                                    <h5 className="title">
                                        <Link to="">{item.movieName}</Link>
                                    </h5>
                                    <ul className="movie-rating-percent">
                                        <li>
                                            <i className="fal fa-shopping-cart"></i>
                                            <span className="content">88.8k</span>
                                        </li>
                                        <li>
                                            <i className="fal fa-star"></i>
                                            <span className="content">5.0</span>
                                        </li>
                                    </ul>
                                    <div className="book-area">
                                        <div className="book-ticket">
                                            <div className="react-item">
                                                <Link to={`/movie-details/${item.movieId}`}>
                                                    <div className="thumb">
                                                        <i className="fal fa-ticket"></i>
                                                    </div>
                                                    <span>Book Ticket</span>
                                                </Link>
                                            </div>
                                            <div className="react-item mr-auto">
                                                <button type="button" onClick={() => handleRemoveFavoriteItem(item.id)}>
                                                    <div className="thumb">
                                                        <i className="fal fa-trash-alt"></i>
                                                    </div>
                                                    <span>Remove</span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="favorite-not">
                            <img src="./assets/img/not-found.png" alt="Not Found" style={{ width: "60%" }} />
                            <p>You don't have any movies in your favorites list yet.</p>
                            <a class="custom-button back-button" href="/movies">
                                <i class="far fa-reply"></i> Book ticket now
                            </a>
                        </div>
                    )}
                </div>
            </LayoutProfile>
        </>
    );
}

export default Favorite;
