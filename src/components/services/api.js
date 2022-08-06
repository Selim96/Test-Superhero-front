import axios from "axios";

axios.defaults.baseURL = 'https://superheros-collection.herokuapp.com/superheros';

class Api {
    page = 1;
    
    async fetchAllHeros() {
        const result = await axios.get(`?page=${this.page}`);
        return result.data;
    }

    async fetchToDeleteHero() {

    }

    async fetchById() {

    }

    async fetchToCreate() {

    }

    async fetchToEditImages() {

    }

    incrementPage() {
        this.page += 1;
    }

    resetPage() {
        this.page = 1;
    }
}

const api = new Api();

export default api;