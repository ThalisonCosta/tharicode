use serde::{Deserialize, Serialize};
use std::{path::Path, fs};

//use srt
#[derive(Serialize, Deserialize, Debug, Clone)]
struct File {
  name: String,
  kind: String,
  path: String
}

//TODO: remove unwraps
pub fn read_directory(path_dir: &str) -> String {
  let path = Path::new(path_dir);
  let paths = fs::read_dir(path).unwrap();

  let mut files: Vec<File> = Vec::new();

  for path in paths {
      let path_unwrap = path.unwrap();
      let meta = path_unwrap.metadata();
      let meta_unwrap = meta.unwrap();

      let mut kind = "file".to_owned();

      if meta_unwrap.is_dir() {
          kind = "directory".to_owned();
      }

      let filename = match path_unwrap.file_name().into_string() {
          Ok(str) => str,
          Err(error) => String::from("ERROR"),
      };

      let file_path = path_dir.to_owned() + &filename;

      let new_file_info = File {
          name: filename,
          kind,
          path: file_path,
      };

      files.push(new_file_info);
  }

  let files_str = match serde_json::to_string(&files) {
      Ok(str) => str,
      Err(error) => panic!("Problem opening the file: {:?}", error),
  };

  files_str
}
