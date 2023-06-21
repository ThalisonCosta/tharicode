import React from "react";
import { useSource } from "../context/SourceContext";
import { IFile } from "../helpers/filesys";

export interface Props {
  files: IFile[]
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
    {files.map(file => {
      const isSelected = file.id === selected;

      return <div onClick={(ev) => onShow(ev, file)}
        key={file.id}
        className={`soure-item ${isSelected ? 'source-item-active' : ''} flex items-center gap-2 px-2 py-0.5 text-gray-500 hover:text-gray-400 cursor-pointer`}
      >
        <span>{file.name}</span>
      </div>
    })}
  </div>
}