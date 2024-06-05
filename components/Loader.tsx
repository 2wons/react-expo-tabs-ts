import { View, StyleSheet, Dimensions, useColorScheme } from "react-native"
import { Spinner, Text } from "tamagui";
import ContentLoader, { Rect, Circle, Path } from "react-content-loader/native"

type LoaderProps = {
    message?: string
}

interface ContentLoaderProps {
    speed?: number;
    width?: number;
    height?: number;
    primaryColor?: string;
    secondaryColor?: string;
    preserveAspectRatio?: string;
    backgroundColor?: string;
    backgroundOpacity?: number;
    animate?: boolean;
    uniqueKey?: string;
    title?: string;
    style?: any;
    className?: string;
    viewBox?: string;
    rtl?: boolean;
    children?: any;
  }

const { width, height } = Dimensions.get("window");


export const Loader = ({ message }: LoaderProps) => {
    return (
        <View style={styles.loading}>
            <Spinner size="large"/>
            <Text color="$white1">{ message }</Text>
        </View>
    )
}

export const MyLoader = (props: ContentLoaderProps) => {
    const theme = useColorScheme() ?? 'light';

    const backgroundColor = theme === 'dark' ? '#181818' : '#f5f6f7';
    const foregroundColor = theme === 'dark' ? '#313131' : '#eee';
    return (
        <ContentLoader 
        speed={2}
        width={476}
        height={400}
        backgroundColor={backgroundColor}
        foregroundColor={foregroundColor}
        {...props}
        >
        <Rect x="6" y="2" rx="0" ry="0" width="340" height="42" /> 
        <Rect x="6" y="51" rx="0" ry="0" width="245" height="34" /> 
        <Rect x="6" y="93" rx="0" ry="0" width="335" height="11" /> 
        <Rect x="6" y="125" rx="0" ry="0" width="291" height="9" /> 
        <Rect x="6" y="143" rx="0" ry="0" width="316" height="9" /> 
        
        <Rect x="6" y="196" rx="0" ry="0" width="300" height="11" /> 
        <Rect x="6" y="217" rx="0" ry="0" width="330" height="10" /> 
        <Circle cx="32" cy="279" r="29" /> 
        <Rect x="80" y="263" rx="0" ry="0" width="201" height="11" /> 
        <Rect x="81" y="284" rx="0" ry="0" width="119" height="9" /> 
        <Rect x="6" y="329" rx="0" ry="0" width="327" height="24" />
        </ContentLoader>
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