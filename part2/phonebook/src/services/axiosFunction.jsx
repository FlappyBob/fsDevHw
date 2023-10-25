import axios from 'axios'
const dataurl = 'http://localhost:3001/persons'

const getAll = () => {
    axios.get(dataurl)
    .then((response) => {
        
    })
}

const addNewObject = (newObject) => {
    axios.post(dataurl, newObject)
    .then((response) => {
        
    })
}
