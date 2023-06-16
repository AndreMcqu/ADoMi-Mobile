import NGROK from '../ngrok/ngrokUrl'

export async function getUserInfo (token: string, id: string) {
    console.log("Commence getInfo")
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
    .then(async res => Promise.resolve(await res.json()))
    .catch(err => {
        Promise.reject(err)
    })
}
