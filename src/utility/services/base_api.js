import config from "../../config.js";

let TOKEN_KEY = "token";
class BaseAPI {
    constructor() {
        this.token = localStorage.getItem(TOKEN_KEY);
    }

    getToken() {
        return this.token;
    }

    setToken(token, omitLocalStorage) {
        this.token = token;
        if (!omitLocalStorage) {
            localStorage.setItem(TOKEN_KEY, token);
        }
    }

    clearToken() {
        delete this.token;
        localStorage.removeItem(TOKEN_KEY);
    }

    send(method, options) {
        let token = this.getToken();
        if (token) {
            options = options || {};
            options.headers = options.headers || {};
            options.headers.authorization = options.headers.authorization || token;
        }

        return fetch(config.apiPath + method, options).then(this.handleResponse.bind(this))
    }

    get(method) {
        return this.send(method, {method: "GET"});
    }

    delete(method) {
        return this.send(method, {method: "GET"});
    }

    post(method, body) {
        body = body || {};
        return this.send(method, {
            method: "POST", headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        });
    }

    uploadImage(method, imageFile) {
        let formData = new FormData();
        formData.append("type", "file");
        formData.append("file", imageFile);
        return this.send(method, {
            method: "POST",
            body: formData
        })
    }

    handleResponse(response) {
        if (response.status === 401) {
            this.clearToken();
        } else {
            return response.json().then(result => {
                if (response.status === 500) {
                    throw result;
                } else {
                    if (result.error) {
                        throw result;
                    } else {
                        return result;
                    }
                }
            });
        }
    }
}

export default new BaseAPI();
