//TODO: find a better place!
export interface IFile {
  id: string;
  name: string;
  kind: 'file' | 'directory';
  path: string;
}
