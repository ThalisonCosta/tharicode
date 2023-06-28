import { createContext, useContext, useState, useCallback } from "react"

interface ISourceContext {
  selected: string;
  setSelect: (id: string) => void;
  opened: string[];
  openFile: (id: string) => void;
  closeFile: (id: string) => void;
}

const SourceContext = createContext<ISourceContext>({
  selected: '',
  setSelect: (id) => {},
  opened: [],
  openFile: (id) => {},
  closeFile: (id) => {}
});

export const SourceProvider = ({ children }: { children: JSX.Element | JSX.Element[] }) => {
  const [selected, setSelected] = useState('');
  const [opened, updateOpenedFiles] = useState<string[]>([]);

  const setSelect = (id: string) => {
    setSelected(id)
  }

  const openFile = useCallback((id: string) => {
    if (opened.includes(id)) return;
    updateOpenedFiles(prevOpen => ([...prevOpen, id]))
  }, [opened])

  const closeFile = useCallback((id: string) => {
    const updatedOpened = opened.filter((openedId) => openedId !== id);
    updateOpenedFiles(updatedOpened);
    
    if (selected === id && updatedOpened.length > 0) {
      setSelected(updatedOpened[updatedOpened.length - 1]);
    }
  }, [opened, selected]);

  return <SourceContext.Provider value={{
    selected,
    setSelect,
    opened,
    openFile,
    closeFile
  }}>
    {children}
  </SourceContext.Provider>
}

export const useSource = () => {
  const { selected, setSelect, opened, openFile, closeFile } = useContext(SourceContext)

  return { selected, setSelect, opened, openFile, closeFile }
}
