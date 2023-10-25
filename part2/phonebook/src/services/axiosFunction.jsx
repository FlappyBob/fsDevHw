import axios from 'axios'
const dataurl = 'http://localhost:3001/persons'

const getAll = () => {
    const response = axios.get(dataurl);
    return response 
}

const post = (newObject) => {
    const response = axios.post(dataurl, newObject);
    return response 
}

const del = (id) => {
    const response = axios.delete(`${dataurl}/${id}`)
    return response
}

export default {
    getAll,
    post, 
    del 
}