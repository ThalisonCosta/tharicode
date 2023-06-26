import { invoke } from "@tauri-apps/api/tauri"
import { v4 as uuid } from "uuid";
import { saveFileObject } from "./storage";

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

export const readFile = async (filePath: string): Promise<string> => {
  const content: string = await invoke("file_content", {filePath});
  return content;
}

export const deleteFile = async (filePath: string): Promise<string> => {
  const message = await invoke("delete_file", {filePath});
  if (message !== "File deleted successfully") {
    throw Error("failed to delete file")
  }
  return message
}

export const writeFile = async (filePath: string, content: string): Promise<string> => {
  const message = await invoke("write_file", { filePath, content });
  if (message !== "File written successfully") {
    throw Error("failed to write file")
  }
  return message
}