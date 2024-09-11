import { H3 } from "tamagui"
import { Button } from "./Button"
import { Link } from "expo-router"

import { View as DefaultView} from "./Themed"
import { StyleSheet } from "react-native"

export const LoginRedirect = () => {
    return (
        <DefaultView style={styles.container}>
            <H3 textAlign="center" color="$white1">You need to be logged in to access this feature.</H3>
            <Link href={{ pathname: "/auth" }} asChild>
                <Button marginTop="$5" variant="primary">Go to Login</Button>
            </Link>
        </DefaultView>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        justifyContent: "center",
        position: "absolute",
        backgroundColor: 'rgba(0,0,0,0.95)',
        padding: 24,
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
});