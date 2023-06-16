export type Client = {
    first_name?: string
    last_name?: string
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