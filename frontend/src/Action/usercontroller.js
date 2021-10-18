import axios from "axios";

export  const register =(name,email,password) => async dispatch =>{

    const config = {headers: {'content-type':'application/json'} }
    const {data} = await axios.post('/api/users/register',{email,password,name},config)

    return data;

}