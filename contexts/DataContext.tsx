import { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { generateUUID } from "@/services/common";
import * as FileSystem from 'expo-file-system'
import { ContextProps } from ".";

interface Report {
    id: string;
    timestamp: string;
    img?: string
}

interface DataContextInterface {
    history?: Report[],
    load?: () => Promise<void>,
    save?: (imgUri: string) => Promise<void>,
}

const DataContext = createContext<DataContextInterface>({})

export const DataProvider = ({ children }: ContextProps) => {
  const [history, setHistory] = useState<Report[]>([])

  const load = async () => {
    try {
      const localHistory = await AsyncStorage.getItem('history')
      setHistory(localHistory ? JSON.parse(localHistory) : [])
    } catch (error) {
      console.log(error)
    }
  }

  const clear = async () => {
    await AsyncStorage.setItem('history', JSON.stringify([]))
  }

  useEffect(() => {
    load()
  }, [])

  const save = async (imgUri: string) => {
    const localId = generateUUID(7);

    // Download file to app document directory
    const { uri } = await FileSystem.downloadAsync(
      imgUri!,
      FileSystem.documentDirectory + `${localId}_image-result.jpg`
    );

    const newData = {
      id: localId,
      timestamp: new Date().toISOString(),
      img: uri
    };
    
    try {
      const localHistory = await AsyncStorage.getItem('history')
      const newHistory = localHistory ? JSON.parse(localHistory): [] 
      newHistory.push(newData)
      setHistory(newHistory)

      await AsyncStorage.setItem('history', JSON.stringify(newHistory))
    } catch (error) {
      console.error(error)
    }
  }

  const value = { history, load, save }

  return (
    <DataContext.Provider value={value}>
      { children }
    </DataContext.Provider>
  )
}

export const useData = () => useContext(DataContext)