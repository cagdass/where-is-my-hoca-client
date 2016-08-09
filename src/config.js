let config = {
    local: {
        baseURL: "http://127.0.0.1:3000",
        apiPath: "http://127.0.0.1:3000/"
    },
    "pre-prod": {
        baseURL: "/",
        apiPath: "/users/"
    }
};
export default config[RUN_ENVIRONMENT] || config.local;
