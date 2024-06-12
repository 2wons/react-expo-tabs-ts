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

export const shortMonths = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
]

export const shortDays = [
    "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"
]

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