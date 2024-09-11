import { View } from "tamagui"
import { Paragraph, H1 } from "tamagui"

const DISCLAIMER = 
`
Our app is designed as a preliminary dental diagnostic tool to provide awareness about the condition of your teeth. It helps identify potential issues and encourages preventive measures, particularly for early-stage caries (initial and moderate).

Please note:
a. This app is not a substitute for professional dental advice, diagnosis, or treatment.
b. Always consult with a qualified dentist for an accurate diagnosis and appropriate treatment plan.
c. If you experience any pain, discomfort, or other concerning symptoms, seek professional dental care immediately.

By using this app, you agree to these terms and understand that while it offers valuable insights into your dental health, it does not replace the expertise of a professional dentist.
`
export const Disclaimer = () => {
    return (
        <View
            style={{
                padding: 15,
                borderRadius: 10,
                borderWidth: 2,
                marginTop: 10
            }}
            backgroundColor="$background"
            borderColor="$gray2"
        >
            <H1>Disclaimer</H1>
            <Paragraph>{DISCLAIMER}</Paragraph>
        </View>
    )
}