import axios from "axios";

export const baseService = {
    get: async(url) => {
        const response = await axios.get(url)
        .then(res => res.data)
        .catch(error => console.log(error))
        return response;
    }
}