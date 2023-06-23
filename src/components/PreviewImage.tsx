import { convertFileSrc } from "@tauri-apps/api/tauri";
import { useRef } from "react";

interface Props {
  path: string;
  active: boolean
}

export default function PreviewImage({path, active}: Props) {
  const img = useRef<HTMLImageElement>(null)

  return <div className={`${active ? '' : 'hidden'} p-8`}>
    <img src={convertFileSrc(path)} ref={img} />
  </div>
}