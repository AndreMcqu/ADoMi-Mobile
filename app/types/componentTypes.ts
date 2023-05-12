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
        idClient?: number
        idReccurence?: number
    }
}

export type ItemProps = {
    id : number | undefined
}

export type AppointmentProps = {

    id: number;
    idMission: number;
    date: string;
    startHour: string;
    endHour: string;
    streetName: string;
    streetNumber: string;
    postCode: string;
    city: string;
    
}

export type DisplayModalProps = {
    id: number | undefined;
    idMission: number | undefined;
    isVisible: boolean;
    onClose: any;
    date: string | undefined;
    startHour: string | undefined;
    endHour: string | undefined;
    streetName: string | undefined;
    streetNumber: string | undefined;
    postCode: string | undefined;
    city: string | undefined;

}