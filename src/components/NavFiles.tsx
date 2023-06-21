import React from "react";
import { useSource } from "../context/SourceContext";
import { IFile } from "../helpers/filesys";

export interface Props {
  files: IFile[] | IFile
  visible: boolean
}

export default function NavFiles({ files, visible }: Props) {
  const { setSelect, selected, addOpenedFile } = useSource()

  const onShow = async (ev: React.MouseEvent<HTMLDivElement, MouseEvent>,
    file: IFile) => {
      ev.stopPropagation();

      if (file.kind === 'file') {
        setSelect(file.id)
        addOpenedFile(file.id)
      }
  }

  return <div className={`source-codes ${visible ? '' : 'hidden'}`}>
    {
      files.map(file => {
        const isSelected = file.id === selected;
        
        if (file.kind === 'directory') {
          return 
        }
      })
    }
  </div>
}