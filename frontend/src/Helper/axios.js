import axios from "axios";
import {reactLocalStorage} from "reactjs-localstorage";


const axiosHelper= axios.create({
   baseURL: 'http://localhost:8082'
});

export default axiosHelper;