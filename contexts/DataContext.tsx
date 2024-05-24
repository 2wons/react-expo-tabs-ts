import { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { generateUUID } from "@/services/common";
import * as FileSystem from 'expo-file-system'
import { ContextProps } from ".";

export interface Report {
    id: string;
    timestamp: string;
    img?: string
}

export interface History {
  [key: string]: Report
}

interface DataContextInterface {
    history?: History,
    load?: () => Promise<void>,
    save?: (imgUri: string) => Promise<void>,
    clear?: () => Promise<void>
}

const DataContext = createContext<DataContextInterface>({})

export const DataProvider = ({ children }: ContextProps) => {
  const [history, setHistory] = useState<History>({})

  const load = async () => {
    try {
      const localHistory = await AsyncStorage.getItem('history')
      await FileSystem.makeDirectoryAsync(
        FileSystem.documentDirectory + 'images/',
        {intermediates: true}
      )
      setHistory(localHistory ? JSON.parse(localHistory) : {})
    } catch (error) {
      console.log(error)
    }
  }

  const clear = async () => {
    await AsyncStorage.setItem('history', JSON.stringify({}))
    await FileSystem.deleteAsync(
      FileSystem.documentDirectory + 'images/',
      {idempotent: true}
    )
    /* remake folder */
    await FileSystem.makeDirectoryAsync(
      FileSystem.documentDirectory + 'images/',
      {intermediates: true}
    )
    setHistory({})
  }

  useEffect(() => {
    load()
  }, [])

  const save = async (imgUri: string) => {
    const localId = generateUUID(7);

    // Download file to app document directory
    const { uri } = await FileSystem.downloadAsync(
      imgUri!,
      FileSystem.documentDirectory + `images/${localId}_image-result.jpg`
    );

    const newData = {
      timestamp: new Date().toISOString(),
      img: uri
    };
    
    try {
      const localHistory = await AsyncStorage.getItem('history')
      const newHistory = localHistory ? JSON.parse(localHistory): {} 
      newHistory[localId] = newData
      setHistory(newHistory)

      await AsyncStorage.setItem('history', JSON.stringify(newHistory))
    } catch (error) {
      console.error(error)
    }
  }

  const value = { history, load, save, clear }

  return (
    <DataContext.Provider value={value}>
      { children }
    </DataContext.Provider>
  )
}

export const useData = () => useContext(DataContext)