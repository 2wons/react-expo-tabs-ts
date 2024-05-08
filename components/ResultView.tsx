import { StyleSheet, Image } from "react-native";
import { Button, H1, H3 } from "tamagui";
import { Download, History } from "@tamagui/lucide-icons";

type ResultProps = {
    imgUri: string | null
}

export const ResultView = ({imgUri}: ResultProps) => {
    const saveToHistory = async () => {
        
    }

    const saveImage = async () => {

    }

    const PLACEHOLDER = 'https://i.postimg.cc/FFcjKg98/placeholder.png'
    return (
    <>
    <H1 paddingTop='$5'>Analysis result</H1>
    <Image source={{uri: imgUri ? imgUri : PLACEHOLDER }} style={styles.image} resizeMode='contain' />
    <H3>Summary</H3>
    <Button icon={Download} marginVertical='$2'>Save Image</Button>
    <Button icon={History} marginVertical='$2'>Save to History</Button>
    </>)
}

const styles = StyleSheet.create({
    container: {
        margin: 5
    },
    image: {
        width: '100%',
        height: undefined,
        aspectRatio: 1.5,
        borderRadius: 10
    },
})