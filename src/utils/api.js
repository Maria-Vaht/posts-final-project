import { config } from './config'

const onResponse = (res) => {
    return res.ok ? res.json() : Promise.reject(`Ошибка : ${res.status}`);
};

class Api {
    constructor({ url, token }) {
        this._url = url;
        this._token = token
    }

    getCurrentUser() {
        return fetch(`${this._url}/users/me`, {
            headers: {
                authorization: `Bearer ${this._token}`
            }
        }).then(onResponse)
    }

    getPosts(postId) {
        const requestUrl = postId ? `${this._url}/posts/${postId}` : `${this._url}/posts`;
        return fetch(requestUrl, {
            headers: {
                authorization: `Bearer ${this._token}`
            }
        }).then(onResponse)
    }

    createPost(title, text, image) {
        return fetch(`${this._url}/posts`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${this._token}`
            },
            body: JSON.stringify({
                'title': `${title}`,
                'text': `${text}`,
                'image': `${image}` || 'https://react-learning.ru/image-compressed/default-image.jpg',
            })
        }).then(onResponse)
    }

    addLike(postId) {
        return fetch(`${this._url}/posts/likes/${postId}`, {
            method: 'PUT',
            headers: {
                authorization: `Bearer ${this._token}`,
            },
        }).then(onResponse);
    }

    deleteLike(postId) {
        return fetch(`${this._url}/posts/likes/${postId}`, {
            method: 'DELETE',
            headers: {
                authorization: `Bearer ${this._token}`,
            },
        }).then(onResponse);
    }

    deletePostById(id) {
        return fetch(`${this._url}/posts/${id}`, {
            method: 'DELETE',
            headers: {
                authorization: `Bearer ${this._token}`
            }
        }).then(onResponse)
    }
}

export default new Api(config)