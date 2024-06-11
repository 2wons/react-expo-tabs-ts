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
export type CariesClass = typeof HEALTHY | typeof INITIAL | typeof MODERATE | typeof EXTENSIVE | "none"

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

export const icdas = {
    healthy: {
        title: "Healthy (ICDAS Code 0)",
        description: "No signs of decay. The tooth looks normal. It’s clean, smooth, and white without any spots or discoloration. ",
    },
    initial: {
        title: "Initial Caries (ICDAS Code 1)",
        description: "These are early signs of tooth decay. You might see some white spots on the tooth if you dry it first. These spots show the very early stage of decay just starting on the surface. You can also see white or light brown spots on the tooth even without drying it. These spots are signs of early decay, but the tooth surface is still mostly intact.",
    },
    moderate: {
        title: "Moderate Caries (ICDAS Code 2)",
        description: "The tooth has small holes or rough spots where the enamel (the hard outer layer) has started to break down, but you can't see the deeper layer (dentin) yet. You might see a dark shadow under the enamel, indicating the decay is deeper and has reached the dentin (the layer under the enamel). The surface might still look mostly okay or have small breaks.",
    },
    extensive: {
        title: "Extensive Caries (ICDAS Code 3)",
        description: "There’s a clear hole or cavity in the tooth, and you can see the dentin. The decay has gone through the enamel and reached the deeper layers. For an even more severe case, the tooth has a big, obvious cavity that might be close to or exposing the tooth's inner pulp (the soft part with nerves). There’s significant damage, with a lot of enamel and dentin lost."
    }
}