import {baseUrl, headers } from "./Constants";

class Api {
    constructor ({baseUrl, headers}) {
        this._baseUrl = baseUrl;
        this._headers = headers;
    }

    _processResponse (res) {
        if (res.ok) {
            return res.json ();
        } else {
            return Promise.reject (`Error: ${res.status}`);
        }
    }

    getInitialcards () {
        return fetch (`${this._baseUrl}/cards`, {
            method: "GET",
            headers:this._headers,

        }).then(this._processResponse);
    }

    getUserInfo() {
        return fetch (`${this._baseUrl}/users/me`,{
            method: "GET",
            headers:this._headers,

        }).then(this._processResponse);
    }

    setUserInfo(name, about) {
        return fetch (`${this._baseUrl}/users/me`,{
            method: "PATCH",
            headers:this._headers,
            body: JSON.stringify({
                name: name,
                about: about,
            }),

        }).then(this._processResponse);
    }
    setUserAvatar (link) {
        return fetch (`${this._baseUrl}/users/me/avatar`, {
            method : "PATCH",
            headers: this._headers,
            body:JSON.stringify({ 
                avatar:link,
            }),
        
        }).then(this._processResponse);
    
    }

    addCard (data) {
        return fetch (`${this._baseUrl}/cards`, {
            method: "POST",
            headers: this._headers,
            body: JSON.stringify(data),

        }).then(this._processResponse);
    }

    removeCard (cardId) {  
        return fetch (`${this._baseUrl}/cards/${cardId}`, {
            method:"DELETE",
            headers:this._headers,
            

        }).then(this._processResponse);    
 
    }

    cardLike (cardId, isItLiked) {
        const method = isItLiked ? "delete" : "put";
        return fetch (`${this._baseUrl}/cards/likes/${cardId}`,{
            method:method,
            headers:this._headers,

        }).then(this._processResponse);
    }


}

export const api = new Api ({baseUrl, headers});