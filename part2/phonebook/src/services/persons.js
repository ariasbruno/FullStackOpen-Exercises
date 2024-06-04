import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons' // Asegúrate de que esta URL sea la correcta para tu servidor json-server

const getAll = () => {
    return axios.get(baseUrl)
}
const create = newObject => {
    return axios.post(baseUrl, newObject)
}

const update = (id, newObject) => {
    return axios.put(`${baseUrl}/${id}`, newObject)
}

const remove = (id) => {
    return axios.delete(`${baseUrl}/${id}`)
}

export default { 
    getAll, 
    create, 
    update,
    remove
}
