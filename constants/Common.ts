export const BASE_URL = process.env.EXPO_PUBLIC_API_URL;

/* Caries Classes */
export const HEALTHY = "-0-Healthy"
export const INITIAL = "-1-Initial-Caries"
export const MODERATE = "-2-Moderate-Caries"
export const EXTENSIVE = "-3-Extensive-Caries"

type RecoType = {
    [key: string]: string
}

export const RECO: RecoType = {
    [HEALTHY]: "Maintain Oral Hygiene",
    [INITIAL]: "Maintain Oral Hygiene and use Fluoride Toothpaste and mouthwash to strengthen enamel.",
    [MODERATE]: "Consult a Dentist for thorough examination and treatment.",
    [EXTENSIVE]: "Seek dental treatment to avoid infections and further complications.",
    ["none"]: "No Caries Detected"
}