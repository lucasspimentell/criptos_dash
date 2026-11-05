
import axios from "axios";

export const api = axios.create({

    baseURL : 'https://rest.coincap.io/v3/'

})