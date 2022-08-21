import axios from "axios";
import * as action from "../redux/superheros/actions";

export const BaseURL = "https://superheros-collection.herokuapp.com";
// export const BaseURL = "http://localhost:4001";

axios.defaults.baseURL = `${BaseURL}/superheros`;

class Api {
    page = 1;
    superId = 0;
    
    fetchAllHeros = () => dispatch => {
        dispatch(action.fetchHerosRequest());

        axios.get(`?page=${this.page}`).then(({ data }) => dispatch(action.fetchHerosSuccess(data))).catch(error => dispatch(action.fetchHerosError(error)));
    };

    fetchToDeleteHero = id => dispatch => {
        dispatch(action.deleteHeroRequest());

        axios.delete(`/${id}`).then(() => dispatch(action.deleteHeroSuccess(id))).catch(error => dispatch(action.deleteHeroError(error)));
    };

    fetchById = id => dispatch => {
        dispatch(action.fetchByIdReqest());

        axios.get(`/${id}`).then(({data}) => dispatch(action.fetchByIdSuccess(data))).catch(error => dispatch(action.fetchByIdError(error)));
    };

    fetchToCreate = data => dispatch => {
        dispatch(action.addHerosRequest());
        axios({
            method: 'POST',
            headers: { 'content-type': 'multipart/form-data' },
            data: data,
            url: "/"
        }).then(({data}) => dispatch(action.addHerosSuccess(data))).catch(error => dispatch(action.addHerosError(error)));
    }

    fetchToEditImages = image => dispatch => {
        dispatch(action.editImageRequest());
        
        axios({
            method: 'patch',
            headers: { 'content-type': 'multipart/form-data' },
            url: `/${this.superId}`,
            data: image
        }).then(({data}) => dispatch(action.editImageSuccess(data))).catch(error => dispatch(action.editImageError(error)));
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