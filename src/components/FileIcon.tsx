import file from "../assets/file.png";
import content from "../assets/content.png";
import css from "../assets/css.png";
import git from "../assets/git.png";
import html from "../assets/html.png";
import image from "../assets/image.png";
import js from "../assets/js.png";
import json from "../assets/nodejs.png";
import tsx from "../assets/react.png";
import rs from "../assets/rust.png";
import ts from "../assets/typescript.png";
import toml from "../assets/toml.png"
import lock from "../assets/lock.png"
import java from "../assets/java.png"
import py from "../assets/py.png"

interface Icons {
  [key: string]: string
}

const icons: Icons = {
  svg: image,
  png: image,
  icns: image,
  ico: image,
  gif: image,
  jpeg: image,
  jpg: image,
  tiff: image,
  bmp: image,
  tsx,
  jsx: tsx,
  css,
  ts,
  js,
  json,
  md: content,
  lock,
  gitignore: git,
  html,
  rs,
  toml,
  java,
  py,
};

interface IFileIconProps {
  name: string;
  size?: 'sm' | 'base'
}

export default function FileIcon({ name, size = 'base' }: IFileIconProps) {
  const lastDotIndex = name.lastIndexOf('.')
  const ext = lastDotIndex !== -1 ? name.slice(lastDotIndex + 1).toLowerCase() : 'NONE'
  const cls = size === 'base' ? 'w-4' : 'w-3';

  if (icons[ext]) {
    return <img className={cls} src={icons[ext]} alt={name} />
  }

  return <img className={cls} src={file} alt={name} />
}

