import { BASE_URL } from "@/constants/Common";
import axios from "axios";

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