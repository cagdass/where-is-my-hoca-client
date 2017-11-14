let config = {
    local: {
        baseURL: "https://cgds.me:3000",
        apiPath: "https://cgds.me:3000/"
    },
    "pre-prod": {
        baseURL: "/",
        apiPath: "/users/"
    }
};
export default config[RUN_ENVIRONMENT] || config.local;
