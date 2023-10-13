export type Client = {
    id?: string
    first_name:string;
    last_name:string;
    email:string;
    user_name:string;
    phone:string;
    street_name:string;
    street_number:string;
    post_code: string;
    city:string;
}

export type Carer = {
    id?: string
    first_name:string;
    last_name:string;
    email:string;
    //password:string;
    user_name:string;
    phone:string;
    street_name:string;
    street_number:string;
    post_code: string;
    city:string;
}

export type AppointmentType = {
    id?: number
    idMission: number
    date: string
    startHour: string
    endHour: string
    streetName: string
    streetNumber: string
    postCode: string
    city: string,
    mission: {
        client?: Client
        idClient?: number
        idRecurrence?: number
    }
}

export type ItemProps = {
    id : number | undefined;
}

export type AppointmentProps = {
    id?: number;
    idMission?: number;
    isVisible?: boolean;
    onClose?: any;
    date?: string;
    startHour?: string;
    endHour?: string;
    streetName?: string;
    streetNumber?: string;
    postCode?: string;
    city?: string;
    client?: Client;
    cancelFunction?: any;
}


