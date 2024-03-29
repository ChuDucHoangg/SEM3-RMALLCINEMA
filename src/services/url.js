const url = {
    BASE_URL: "https://localhost:7220/api/",

    AUTH: {
        REGISTER: "auth/register",
        LOGIN: "auth/login",
        FORGOT_PASSWORD: "auth/forgot-password",
        PROFILE: "auth/profile",
        UPDATE_PROFILE: "auth/update-profile",
        CHANGE_PASSWORD: "auth/change-password",
        RESET_PASSWORD: "auth/reset-password",
    },

    MOVIE: {
        LIST: "movie",
        DETAILS: "movie/",
        LATEST_SHOWING: "movie/last-showing",
        BEST_SHOWING: "movie/best-showing",
        COMING_SOON: "movie/comming-soon",
    },

    LANGUAGE: {
        LIST: "language/get-all",
    },

    GENRE: {
        LIST: "genre",
    },

    SHOW: {
        BY_MOVIE: "show/get-by-movie",
    },

    SEAT: {
        BY_ROOMID: "seat/get-by-roomId",
        BY_SHOW: "seat/get-by-showCode",
        SEAT_RESERVATION: "/order/SeatReservation",
    },

    FOOD: {
        LIST: "food/get-all",
    },

    BOOKING: {
        CREATE: "order",
        MY_BOOKING: "order/get-by-user",
        DETAIL: "order/detail",
    },

    FAVORITE: {
        BY_USER: "favorite/get-by-user",
        ADD: "favorite/add-to-favorite",
        REMOVE: "favorite/remove-from-favorite",
    },

    PROMOTION: {
        LIST_FOR_USER: "promotion/get-all-for-user",
        BY_USER: "promotion/get-promotion-by-user",
        SAVE_PROMOTION: "promotion/create-promotion-user",
        DISCOUNT: "promotion/discounts",
    },
};

export default url;
