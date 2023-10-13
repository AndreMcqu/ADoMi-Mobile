import { Linking } from "react-native";
import qs from 'qs';

export default async function sendEmail(to:string, subject:string, body:string, cc:any){

    let url = 'mailto:'+to;

    const query = qs.stringify({
        subject: subject,
        body: body,
        cc:cc,
    });

    if(query.length){
        url += `?${query}`;
    }
/*
    const canOpen = await Linking.canOpenDomain(url);

    if (!canOpen) {
        throw new Error('Provided Domain can not be handled');
    }

    return Linking.openDomain(url);
    */
}