import type { AppointmentType } from './types/componentTypes'
import {Domain, Scheme} from '../env/api_conn';

function authHeader(token: string) {
    return {"Authorization": "bearer " + token}
}


export async function getUserInfo (id: string, token: string ) {
    const url = `${Scheme}${Domain}/users/${id}`
    const options = {
        method: 'GET',
        headers: {
            'ngrok-skip-browser-warning': 'true',
            'User-Agent': 'adomi/1',
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + token
        },
    }
    
    const res = await fetch(url, options)
        .catch(err => {
            console.log("err in fetch at getUserInfo", err)
        })

    if (!res) {
        return false
    }


    const json = await res.json()

    if (!res.ok || res.status === 204) {
        console.log("Bad HTTP status code at getUserInfo", json)
        return false
    }
    if (!json) {
        console.log("Problem with json at getUserInfo")
        return false
    }

    return json
}


export async function getAppointments (id: string, token: string) {
    const url = `${Scheme}${Domain}/carers/${id}/appointments`
    const response = await fetch(url, {
            method: 'GET',
            headers: { ...authHeader(token) }
        })
        .catch((err) => 
            console.error("HTTP err at getAppointments\n", err)
        )
    
    if (!response) {
        return false
    }

    const json = await response.json()
    if (!response.ok) {
        console.error("bad HTTP status code at getAppointments\n", json)
        return false
    }

    return json
}

export async function fetchLatestAppointments(userId: string, token: string): Promise<AppointmentType [] | false> {
    const url = `${Scheme}${Domain}/carers/${userId}/latestappointments`
    const response = await fetch(url, {
            method: 'GET',
            headers: authHeader(token)
        })
        .catch((err) => 
            console.error("HTTP err at fetchLatestAppointments\n", err)
        )
    
    if (!response) {
        return false
    }

    const json = await response.json()
    if (!response.ok) {
        if (response.status == 404) return []
        console.error("bad HTTP status code at fetchLatestAppointments\n", json)
        return false
    }

    return json
}


export async function signIn (username: string, password: string)  {
    // username: marie.Ddoupeter
    // password: Mdp1234*
    const res = await fetch(Scheme + Domain + "/sign-in", {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            username: username,
            password: password
        }),
    })
    .catch(err => {
        console.error("fetch err in sign-in", err)
    })

    if (!res) return Promise.reject("Une erreur inconnue est survenue")

    const json = await res.json()

    if (!res.ok) {
        if (res.status === 401) return Promise.reject(json.message)
        return Promise.reject("Une erreur inconnue est survenue")
    }

    return json
}

export async function postGeneralRequest (carerId: string, token: string, message: string) {
   const res = await fetch(Scheme + Domain + "/users/"+carerId+"/general-request", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            ...authHeader(token)
        },
        body: JSON.stringify({
            message: message,
        })
    }).catch(err => {
        console.error("fetch errored in postGeneralRequest", err)
    })


    if (!res) return Promise.reject("Une erreur inconnue est survenue")
    if (!res.ok) return Promise.reject("Une erreur inconnue est survenue")
    console.log("res.status ", res.status)

    return Promise.resolve("Le message a bien été envoyé.")
}

