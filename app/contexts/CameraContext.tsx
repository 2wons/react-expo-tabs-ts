import { createContext, useContext, ReactNode, useState } from "react";


interface CameraProviderProps {
    children: ReactNode;
}

interface CameraContextType {
    cameraReady: boolean,
    setCameraReady: (cameraReady: boolean) => void;
}

const CameraContext = createContext<CameraContextType | undefined >(undefined);

export const CameraProvider = (props: CameraProviderProps) => {
    const [cameraReady, setCameraReady] = useState(false);

    const value = {cameraReady, setCameraReady};

    return (
        <CameraContext.Provider value={value}>{props.children}</CameraContext.Provider>
    )
};

export const useCamera = (): CameraContextType => {
    const context = useContext(CameraContext);
    if (context === undefined) {
        throw new Error('useCamera must be used within a CameraProvider.')
    }
    return context;
}