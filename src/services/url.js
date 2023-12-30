const url = {
    BASE_URL: "https://localhost:7220/api/",

    AUTH: {
        REGISTER: "auth/register",
        LOGIN: "auth/login",
        FORGOT_PASSWORD: "auth/forgot-password",
        PROFILE: "auth/profile",
        UPDATE_PROFILE: "auth/update-profile",
        CHANGE_PASSWORD: "auth/change-password",
    },

    MOVIE: {
        LIST: "movie",
        DETAILS: "movie/",
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
    },

    FOOD: {
        LIST: "food/get-all",
    },
};

export default url;
