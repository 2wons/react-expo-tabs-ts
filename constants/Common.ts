import { ClassCounts } from "@/components/ResultView";

export const BASE_URL = process.env.EXPO_PUBLIC_API_URL;

/* Caries Classes */
export const HEALTHY = "-0-Healthy"
export const INITIAL = "-1-Initial-Caries"
export const MODERATE = "-2-Moderate-Caries"
export const EXTENSIVE = "-3-Extensive-Caries"

type RecoType = {
    [key: string]: string
}

export const getRecommendation = (counts: ClassCounts, extreme: string) => {
    const RECOS: RecoType = {
        [HEALTHY]: `You have perfectly healthy teeth! It is recommended that you maintain good oral hygiene:
        a. Brush teeth twice a day with fluoride toothpaste.
        b. Floss daily to remove plaque between teeth.
        c. Regular dental check-ups and cleanings every 6 months.
        d. Maintain a balanced diet low in sugary snacks and drinks.`,
        [INITIAL]: `You have ${counts.initial} initial stage caries teeth. It is recommended that you do the following.
1. Maintain Oral Hygiene:
        a. Continue brushing twice a day with fluoride toothpaste.
        b. Floss daily to remove plaque and prevent further decay.
2. Fluoride Use:
        a. Use fluoride mouthwash to help remineralize enamel.
        b. Consider professional fluoride treatments at the dentist's office.
3. Dietary Advice:
        a. Reduce the intake of sugary and acidic foods and beverages.
        b. Increase intake of water and foods rich in calcium and phosphates.`,
        [MODERATE]: 
        `You have ${counts.moderate} moderate stage caries teeth. It is recommended that you do the following.
1. Consult Your Dentist:
    a. Schedule an appointment for a thorough dental examination.
    b. The dentist may perform a professional cleaning and possibly sealants to protect teeth.
2. Restorative Treatment:
    a. Fillings may be necessary to restore the affected areas and prevent further decay.
    b. The dentist might also use fluoride varnish or other remineralizing agents.
3. Oral Hygiene and Diet:
    a. Maintain rigorous oral hygiene practices.
    b. Follow dietary recommendations to minimize sugar and acid exposure.`,
        [EXTENSIVE]: `You have ${counts.extensive} extensive stage caries teeth. It is recommended that you do the following.
1. Seek Immediate Dental Treatment:
            a. Schedule an appointment for urgent dental care to prevent infection and further damage.
            b. The dentist will likely need to perform more extensive restorative work, such as fillings, crowns, or possibly root canal therapy if the pulp is involved.
2. Preventive Measures Post-Treatment:
            a. Follow all post-treatment care instructions provided by the dentist.
            b. Consider additional preventive measures, such as fluoride treatments or dental sealants, to protect other teeth.
3. Maintain Oral Hygiene:
            a. Continue rigorous oral hygiene practices and regular dental visits to monitor and maintain dental health.
4. Dietary Advice:
            a. Follow a diet that supports dental health, emphasizing low sugar and high nutrient foods.`,
        ["none"]: `No teeth detected. Make sure to capture your teeth properly. For a more precise analysis, it is recommended that the image is focused on your mouth with good lighting and make sure your teeth are not too wet.`
    }
    
    return RECOS[extreme]
}

export const clinicDefaults = [
    {
        distance: 30,
        latitude: 14.6042,
        longitude: 120.9860,
        dentists: [
            {
                email: "dr.santos@maniladental.com",
                name: "Dr. Juan Santos",
                phoneNumber: "+63 912 345 6789"
            },
            {
                email: "dr.delacruz@maniladental.com",
                name: "Dr. Maria Dela Cruz",
                phoneNumber: "+63 912 345 6790"
            }
        ],
        id: 1,
        name: "Wayb Clinics",
        address: "127 Sampaloc St, Manila, Philippines",
        phoneNumber: "+63 912 345 6789",
        description: "A leading dental clinic providing top-notch services in Manila.",
        email: "info@maniladental.com",
        imagePath: "/images/clinic1.jpg",
        website: "https://www.maniladental.com"
    },
    {
        distance: 45,
        latitude: 14.6035,
        longitude: 120.9873,
        dentists: [
            {
                email: "dr.garcia@perfectsmile.com",
                name: "Dr. Roberto Garcia",
                phoneNumber: "+63 913 456 7890"
            },
            {
                email: "dr.hernandez@perfectsmile.com",
                name: "Dr. Angela Hernandez",
                phoneNumber: "+63 913 456 7891"
            }
        ],
        id: 2,
        name: "Dentist of Life",
        address: "412 Nicanor Reyes St, Manila, Philippines",
        phoneNumber: "+63 913 456 7890",
        description: "Your go-to place for achieving the perfect smile.",
        email: "contact@perfectsmile.com",
        imagePath: "/images/clinic2.jpg",
        website: "https://www.perfectsmile.com"
    }
];