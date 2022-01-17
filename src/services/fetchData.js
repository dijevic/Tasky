const baseUrl = process.env.REACT_APP_API_URL

export const fetchWithNotToken = (data, method = 'GET', endPoind) => {


    const url = `${baseUrl}${endPoind}`

    if (method === 'GET') {
        return fetch(url)
    }

    return fetch(url, {
        method,
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' }
    })
}




export const fetchWithToken = (data, method = 'GET', endPoind) => {
    const url = `${baseUrl}${endPoind}`
    const token = localStorage.getItem('token') || ''
    if (method === 'GET') {
        return fetch(url, {
            headers: {
                'x-token': token
            }
        })
    }

    return fetch(url, {
        method,
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json', 'x-token': token }
    })
}



export const fetchWithRegistrationToken = (endPoind, token) => {
    const url = `${baseUrl}${endPoind}`
    return fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'registration-token': token }
    })
}

export const fetchWithResetToken = (endPoind, token) => {
    const url = `${baseUrl}${endPoind}`
    return fetch(url, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'reset-token': token }
    })
}
export const deleteTasksFetch = (endPoind) => {
    const url = `${baseUrl}${endPoind}`
    const token = localStorage.getItem('token') || ''
    return fetch(url, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json', 'x-token': token }
    })
}
export const updateTasksFetch = (endPoind, data) => {
    const url = `${baseUrl}${endPoind}`
    const token = localStorage.getItem('token') || ''

    return fetch(url, {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json', 'x-token': token }
    })
}

