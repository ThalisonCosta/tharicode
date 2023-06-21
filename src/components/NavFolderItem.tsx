import React, { useState } from "react";
import { IFile, readDirectory } from "../helpers/filesys";

interface Props {
  file: IFile;
  active: boolean;
}

export default function NavFolderItem({file, active}: Props) {
  const [files, setFiles] = useState<IFile[]>([]);
  const [unfold, setUnfold] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [newFile, setNewFile] = useState(false);
  const [fileName, setFileName] = useState('');

  const onShow = async (ev: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    ev.stopPropagation();

    if (loaded) {
      setUnfold(!unfold)
      return;
    }

    const entries = await readDirectory(file.path + '/');

    setLoaded(true);
    setFiles(entries);
    setUnfold(!unfold);
  };

}