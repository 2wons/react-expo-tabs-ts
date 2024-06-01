import { View, StyleSheet, ActivityIndicator } from "react-native"
import { Spinner, Text } from "tamagui";

type LoaderProps = {
    message?: string
}

export const Loader = ({ message }: LoaderProps) => {
    return (
        <View style={styles.loading}>
            <Spinner size="large"/>
            <Text>{ message }</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    loading: {
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        backgroundColor: 'rgba(0,0,0,0.7)',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
    }
});