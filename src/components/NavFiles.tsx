import { MouseEvent, useState } from "react"
import { useSource } from "../context/SourceContext"
import NavFolderItem from "./NavFolderItem"
import { IFile, deleteFile } from "../helpers/filesys"
import FileIcon from "./FileIcon"

interface Props {
  files: IFile[]
  visible: boolean
}

export default function NavFiles({files, visible}: Props) {
  const {setSelect, selected, openFile, closeFile} = useSource()
  const [_, setFiles] = useState<IFile[]>([])
  
  const onShow = async (ev: React.MouseEvent<HTMLDivElement, MouseEvent>, file: IFile) => {

    ev.stopPropagation();

    if (file.kind === 'file') {
      setSelect(file.id)
      openFile(file.id)
    }
  }

  const delFile = async (id: string) => {
  const canDelete: boolean = await confirm('This action cannot be reverted. Are you sure?');
    if (!canDelete) return;
    
    const file = files.find(file => file.id === id)!;
    const index = files.findIndex(file => file.id === id);
    
    await deleteFile(file.path);
    files.splice(index, 1);
    closeFile(file.id);

    setFiles(prevEntries => [...prevEntries])
  }

  return <div className={`source-codes ${visible ? '' : 'hidden'}`}>
  {files.map(file => {
    const isSelected = file.id === selected;

    if (file.kind === 'directory') {
      return <NavFolderItem active={isSelected} key={file.id} file={file} />
    }

    return <div onClick={(ev) => onShow(ev as unknown as React.MouseEvent<HTMLDivElement, MouseEvent>, file)}
      key={file.id}
      className={`soure-item ${isSelected ? 'source-item-active' : ''} flex items-center gap-2 px-2 py-0.5 text-gray-500 hover:text-gray-400 cursor-pointer`}
    >
      <FileIcon name={file.name} />
      <div className="source-header flex items-center justify-between w-full group">
        <span>{file.name}</span>
        <i onClick={() => delFile(file.id)} className="material-icons invisible group-hover:visible">x</i>
      </div>
    </div>
  })}
</div>
}
