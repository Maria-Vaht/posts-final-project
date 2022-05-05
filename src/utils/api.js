import { config } from './config'

const onResponse = (res) => {
    return res.ok ? res.json() : Promise.reject(`Ошибка : ${res.status}`);
};

class Api {
    constructor({ url, token }) {
        this._url = url;
        this._token = token
    }

    getPosts(postId) {
        const requestUrl = postId ? `${this._url}/posts/${postId}` : `${this._url}/posts`;
        return fetch(requestUrl, {
            headers: {
                authorization: `Bearer ${this._token}`
            }
        }).then(onResponse)
    }
}

export default new Api(config)