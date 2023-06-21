import { IFile } from "../helpers/filesys";

interface IEntries {
  [key: string]: IFile
}

const entries: IEntries = {};

export const saveFileObject = (id: string, file: IFile) => {
  entries[id] = file
}

export const getFile = (id: string): IFile => {
  return entries[id]
}