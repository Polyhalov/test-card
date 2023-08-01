import axios from "axios";

const instance = axios.create({
    baseURL: 'https://6443dde8466f7c2b4b5c1200.mockapi.io',
})

export const searchPosts = (page = 1) => {
    return instance.get('/user', {
        params: {
            page,
            limit:3,
        }
    })
}

// searchPosts(2);