import { useEffect, useMemo, useRef } from "react";
import { EditorView, basicSetup } from "codemirror";
import { v4 as uuid } from 'uuid';
import { javascript } from "@codemirror/lang-javascript";
import { markdown } from "@codemirror/lang-markdown";
import { html } from "@codemirror/lang-html";
import { css } from "@codemirror/lang-css";
import { json } from "@codemirror/lang-json";
import { rust } from "@codemirror/lang-rust";
import { materialDark } from "cm6-theme-material-dark";
import { java } from "@codemirror/lang-java"
import { python } from "@codemirror/lang-python"


import { getFileObject } from "../storage/file";
import { readFile, writeFile } from "../helpers/filesys";
import { useSource } from "../context/SourceContext";

interface Props {
  id: string;
  active: boolean;
}

export default function Code({ id, active }: Props) {
  const { closeFile } = useSource();

  const isRendered = useRef(0);
  const editorId = useMemo(() => uuid(), []);
  const editorRef = useRef<EditorView | null>(null)
  const visible = active ? '' : 'hidden';

  const updateContent = async (id: string) => {
    const file = getFileObject(id);
    const content = await readFile(file.path)

    loadFileContent(content);
  }

  const loadFileContent = (content: string) => {
    const elem = document.getElementById(editorId)

    if (elem && isRendered.current === 0) {
      isRendered.current = 1;
      editorRef.current = new EditorView({
        doc: content,
        extensions: [
          basicSetup,
          html(), css(), javascript({typescript: true, jsx: true}),
          json(), markdown(), java(),
          python(), rust(),
          materialDark,
        ],
        parent: elem
      })
    }
  }

  const onSave = async () => {
    if (!editorRef.current) return;

    const content = editorRef.current.state.doc.toString();
    const file = getFileObject(id);

    writeFile(file.path, content);
  }

  useEffect(() => {
    updateContent(id)
  }, [id])

  return(
    <main className={`w-full overflow-y-auto ${visible}`} style={{ height: 'calc(100vh - 40px)' }}>
      <div id={editorId} tabIndex={-1} onKeyUp={(ev) => {
      switch (ev.key) {
        case 's':
          if (ev.ctrlKey) {
            ev.preventDefault();
            ev.stopPropagation();
            onSave();
          }
          break;
        case 'w':
          if (ev.ctrlKey) {
            ev.stopPropagation();
            closeFile(id);
          }
          break;
      }
      }}></div>

    </main>
  )
}