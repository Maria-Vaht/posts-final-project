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
                'authorization': `Bearer ${this._token}`
            }
        }).then(onResponse)
    }

    getPosts(postId) {
        const requestUrl = postId ? `${this._url}/posts/${postId}` : `${this._url}/posts`;
        return fetch(requestUrl, {
            headers: {
                'authorization': `Bearer ${this._token}`
            }
        }).then(onResponse)
    }

    createPost(title, text, image, tags) {
        const tagList = tags.trim().split(/[,]\s*|\s+/g)
        return fetch(`${this._url}/posts`, {
            method: 'POST',
            headers: {
                'authorization': `Bearer ${this._token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'title': `${title}`,
                'text': `${text}`,
                'image': `${image}` || 'https://cdn.pixabay.com/photo/2015/10/06/19/28/trees-975091__480.jpg',
                'tags': tagList,
            })
        }).then(onResponse)
    }

    editPost(postId, title, text, image, tags) {
        const tagList = tags.trim().split(/[,]\s*|\s+/g)
        return fetch(`${this._url}/posts/${postId}`, {
            method: 'PATCH',
            headers: {
                'authorization': `Bearer ${this._token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                'title': `${title}`,
                'text': `${text}`,
                'image': `${image}` || 'https://cdn.pixabay.com/photo/2015/10/06/19/28/trees-975091__480.jpg',
                'tags': tagList,
            }),
        }).then(onResponse)
    }

    addLike(postId) {
        return fetch(`${this._url}/posts/likes/${postId}`, {
            method: 'PUT',
            headers: {
                'authorization': `Bearer ${this._token}`,
            },
        }).then(onResponse);
    }

    deleteLike(postId) {
        return fetch(`${this._url}/posts/likes/${postId}`, {
            method: 'DELETE',
            headers: {
                'authorization': `Bearer ${this._token}`,
            },
        }).then(onResponse);
    }

    deletePostById(id) {
        return fetch(`${this._url}/posts/${id}`, {
            method: 'DELETE',
            headers: {
                'authorization': `Bearer ${this._token}`
            }
        }).then(onResponse)
    }
    getComments(id){
        return fetch(`${this._url}/posts/comments/${id}`, {
            headers: {
                authorization: `Bearer ${this._token}`,
                }
        }).then(onResponse)
}

addComment(id, comment){
    return fetch(`${this._url}/posts/comments/${id}`, {
        method: 'POST',
        headers: {
            authorization: `Bearer ${this._token}`,
            'Content-Type': 'application/json',
            },
        body: JSON.stringify(comment),
    }).then(res => res.json())
    .catch(err => alert(err.message));
}

}



export default new Api(config)