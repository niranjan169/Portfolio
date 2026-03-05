import axios from 'axios'

const API_BASE_URL = 'http://localhost:8080/api/v1'

export const submitContact = async (contactData) => {
    const response = await axios.post(`${API_BASE_URL}/contacts`, contactData, {
        headers: { 'Content-Type': 'application/json' }
    })
    return response.data
}
