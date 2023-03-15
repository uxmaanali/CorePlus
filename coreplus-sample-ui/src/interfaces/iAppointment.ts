export interface IAppointment {
    id: number;
    date: string;
    client_name: string;
    appointment_type: string;
    duration: number;
    revenue: number;
    cost: number;
    practitioner_id: number;
}