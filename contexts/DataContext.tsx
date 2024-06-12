import { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { generateUUID } from "@/services/common";
import * as FileSystem from 'expo-file-system'
import { ContextProps } from ".";
import { ClassCounts } from "@/components/ResultView";
import { ImageResponse } from "@/services/types";

export interface ShareInfo {
  id: number;
  clinicId: number;
  clinicName?: string;
  clinicAddress?: string;
  createdAt: string;
}

export interface Report {
    id: string;
    serverId?: number
    timestamp: string;
    img?: string;
    originalImg?: string;
    shared?: boolean;
    title: string
    summary: ClassCounts
    extreme?: string
    sharedInfo?: ShareInfo[]
}

export interface History {
  [key: string]: Report
}

export interface SaveData extends ImageResponse {
  imgUri: string;
  title: string;
  summary: ClassCounts;
  extreme?: string;
}

interface DataContextInterface {
  history?: History;
  load?: () => Promise<void>;
  save?: ({
    imgUri,
    title,
    summary,
    extreme,
    ...imageResponse
   }: SaveData) => Promise<string>;
  edit?: (id: string, newData: Report) => Promise<void>;
  clear?: () => Promise<void>;
  remove?: (id: string) => Promise<void>;
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

  const save = async ({
    imgUri,
    title,
    summary,
    extreme,
    ...imageResponse
   }: SaveData) => {
    const localId = generateUUID(7);

    // Download file to app document directory
    const { uri } = await FileSystem.downloadAsync(
      imgUri!,
      FileSystem.documentDirectory + `images/${localId}_image-result.jpg`
    );

    if (title === 'Untitled') {
      title = `Test ${Object.keys(history).length+1}`
    }

    const newData = {
      id: localId,
      timestamp: new Date().toISOString(),
      img: uri,
      originalImg: imageResponse.originalImagePath,
      shared: false,
      title: title,
      summary: summary,
      extreme: extreme,
      serverId: imageResponse.id,
    };
    
    try {
      const newHistory = {...history}
      newHistory[localId] = newData
      setHistory(newHistory)

      await AsyncStorage.setItem('history', JSON.stringify(newHistory))
    } catch (error) {
      console.error(error)
    }

    return localId
  }

  const remove = async (id: string) => {
    const currentHistory = {...history}
    if (history.hasOwnProperty(id)) {
      delete currentHistory[id]
    }
    setHistory(currentHistory)
    await AsyncStorage.setItem('history', JSON.stringify(currentHistory))
  }

  const edit = async (id: string, newData: Report) => {
    const currentHistory = {...history}
    if (history.hasOwnProperty(id)) {
      currentHistory[id] = newData
    }
    setHistory(currentHistory)
    await AsyncStorage.setItem('history', JSON.stringify(currentHistory))
  }

  const value = { history, load, save, clear, remove, edit }

  return (
    <DataContext.Provider value={value}>
      { children }
    </DataContext.Provider>
  )
}

export const useData = () => useContext(DataContext)