import { useState } from "react";
import { open } from "@tauri-apps/api/dialog";
import NavFiles from "./NavFiles";
import { IFile, readDirectory } from "../helpers/filesys";

export default function Sidebar() {
  const [projectName, setProjectName] = useState("");
  const [files, setFiles] = useState<IFile[]>([]);

  const loadFile = async () => {
    const selected = await open({
      directory: true
    }) as string;

    if (!selected) return;

    const folder = selected.match(/[\\\/](?!.*[\\\/])(.*)/) as string[];
    setProjectName(folder[1])
    
    readDirectory(selected + '/').then(setFiles)
  }

  return <aside id="sidebar" className="w-60 shrink-0 h-full bg-darken">
    <div className="sidebar-header flex items-center justify-between p-4 py-2.5">
      <button className="project-explorer" onClick={loadFile}>Open Folder</button>
      <span className="project-name whitespace-nowrap text-gray-400 text-sm">{projectName}</span>  
    </div>
    <div className="code-structure">
      <NavFiles visible={true} files={files}/>
    </div>
  </aside>
}
