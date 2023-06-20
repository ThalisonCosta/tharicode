import { useState } from "react";
import { IFile } from "../types";
import { open } from "@tauri-apps/api/dialog";

export default function Sidebar() {
  const [projectName, setProjectName] = useState("");
  const [files, setFiles] = useState<IFile[]>([]);

  const loadFile = async () => {
    const selected = await open({
      directory: true
    })

    if (!selected) return;

    setProjectName(selected as string)
  }

  return <aside id="sidebar" className="w-60 shrink-0 h-full bg-darken">
    <div className="sidebar-header flex items-center justify-between p-4 py-2.5">
      <button className="project-explorer" onClick={loadFile}>File explorer</button>
      <span className="project-name whitespace-nowrap text-gray-400 text-xs">{projectName}</span>  
    </div>
    <div className="code-structure">
    </div>
  </aside>
}
