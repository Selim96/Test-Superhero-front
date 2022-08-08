import axios from "axios";

axios.defaults.baseURL = 'https://superheros-collection.herokuapp.com/superheros';
// axios.defaults.baseURL = "http://localhost:4001/superheros";

class Api {
    page = 1;
    superId = 0;
    
    async fetchAllHeros() {
        const result = await axios.get(`?page=${this.page}`);
        return result;
    }

    async fetchToDeleteHero() {
        await axios.delete(`/${this.superId}`);
    }

    async fetchById() {
        const result = await axios.get(`/${this.superId}`);
        return result;
    }

    async fetchToCreate(data) {
        const result = await axios({
            method: 'POST',
            headers: { 'content-type': 'multipart/form-data' },
            data: data,
            url: "/"
        });
    return result;
    }

    async fetchToEditImages(data) {
        const result = await axios({
            method: 'patch',
            headers: { 'content-type': 'multipart/form-data' },
            url: `/${this.superId}`,
            data: data
        });
        return result;
    }

    incrementPage() {
        this.page += 1;
    }

    decrementPage() {
        this.page -= 1;
    }

    resetPage() {
        this.page = 1;
    }
}

const api = new Api();

export default api;