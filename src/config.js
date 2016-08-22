let config = {
    local: {
        baseURL: "http://cgds.me:3000",
        apiPath: "http://cgds.me:3000/"
    },
    "pre-prod": {
        baseURL: "/",
        apiPath: "/users/"
    }
};
export default config[RUN_ENVIRONMENT] || config.local;
