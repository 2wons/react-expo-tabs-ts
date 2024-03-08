import { View, StyleSheet, ActivityIndicator } from "react-native"

export const Loader = () => {
    return (
        <View style={styles.loading}>
            <ActivityIndicator  size="large" color="#0000ff" />
        </View>
    )
}

const styles = StyleSheet.create({
    loading: {
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        backgroundColor: 'rgba(0,0,0,0.3)',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
    }
});