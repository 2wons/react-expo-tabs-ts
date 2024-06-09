import { BASE_URL } from "@/constants/Common";
import axios from "axios";

export interface SharedReportDTO {
    clinicId: number
    imageIds: number[]
    description: string
    title: string
}

export const getClinics = async () => {
    return axios.get(
        `${BASE_URL}/Clinic/GetClinics`
    )
}

export const getClinic = async (id: number) => {
    return axios.get(
        `${BASE_URL}/Clinic/GetClinic`,
        {
            params: {
                clinicId: id
            }
        }
    )
}

export const createReport = async (report: SharedReportDTO) => {
    return axios.post(
        `${BASE_URL}/Image/CreateReport`,
        report
    )
}

export type AppointmentDTO = {
    date: string
    scheduledAt: string
    clinicId: number
    dentistId: number
}

export const createAppointment = async (appointment: AppointmentDTO) => {
    return axios.post(
        `${BASE_URL}/Appointment/CreateAppointment`,
        appointment
    )
}