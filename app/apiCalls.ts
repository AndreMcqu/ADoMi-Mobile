import NGROK from '../ngrok/ngrokUrl'

export async function getUserInfo (token: string, id: string) {
    const url = `https://${NGROK}/users/${id}`
    const options = {
        method: 'GET',
        headers: {
            'ngrok-skip-browser-warning': 'true',
            'User-Agent': 'adomi/1',
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + token
        },
    }
    
    return await fetch(url, options)
    .then(async res => Promise.resolve(await res.json())
    )
    .catch(err => {
        Promise.reject(err)
    })
}

export async function getAppointments (token: string, id: string) {
    const url = `https://${NGROK}/carers/${id}/appointments`
    const options = {
        method: 'GET',
        headers: {
            'ngrok-skip-browser-warning': 'true',
            'User-Agent': 'adomi/1',
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + token
        },
    }
    
    return await fetch(url, options)
    .then(async res => {
        return Promise.resolve(await res.json())
    })
    .catch(err => {
        Promise.reject(err)
    })
}
