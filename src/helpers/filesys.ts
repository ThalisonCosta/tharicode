import { invoke } from "@tauri-apps/api/tauri";
import { v4 as uuid } from "uuid"
import { saveFileObject } from "../storage/file";

export interface IFile {
  id: string;
  name: string;
  kind: 'file' | 'directory';
  path: string;
}

export const readDirectory = async (folderPath: string): Promise<IFile[]> => {
  const message: string = await invoke("open_folder", { folderPath});
  const files = JSON.parse(message.replaceAll('\\', '/').replaceAll('//', '/'));
  
  const entries: IFile[] = [];
  const folders: IFile[] = [];

  if (!files || !files.length) {
    return entries;
  }

  files.reduce((_acc:any, file: IFile) => {
    const id = uuid();
    const entry: IFile = {
      id,
      kind: file.kind,
      name: file.name,
      path: file.path
    }

    if (file.kind === 'file') {
      entries.push(entry)
    } else {
      folders.push(entry)
    }

    saveFileObject(id, entry)
  }, {})

  return [...folders, ...entries]
}

export const writeFile = (path: string, content: string): Promise<String> => {
  return new Promise((resolve, reject) => {
    invoke("write_file", {path, content}).then((message: unknown) => {
      if (message !== "OK") {
        reject("failed to write file")
      }
      resolve(message as string)
    })
  });
};