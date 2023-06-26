use serde::{Deserialize, Serialize};
use tauri::api::Error;
use std::fs;
use std::path::{Path, PathBuf};

#[derive(Serialize, Deserialize, Debug)]
pub struct File {
    name: String,
    kind: String,
    path: PathBuf,
}

pub fn read_directory(dir_path: &str) -> Result<String, Box<dyn std::error::Error>> {
    let new_path = Path::new(dir_path);
    let paths = fs::read_dir(new_path)?;

    let files = paths
        .map(|entry| {
            let path = entry?.path();
            let meta = path.metadata()?;

            let kind = if meta.is_dir() { "directory" } else { "file" };


            let filename = path.file_name().and_then(|f| f.to_str()).unwrap_or_default();

            let file_path = new_path.join(filename);

            Ok(File {
                name: filename.to_owned(),
                kind: kind.to_owned(),
                path: file_path,
            })
        })
        .collect::<Result<Vec<_>, Box<dyn std::error::Error>>>()?;

    let files_str = serde_json::to_string(&files)?;

    Ok(files_str)
}

pub fn read_file(path: &str) -> Result<String, Error> {
    match fs::read_to_string(path) {
        Ok(content) => Ok(content),
        Err(e) => return Err(tauri::api::Error::Io(e))
    }
}

pub fn write_file(path: &str, content: &str) -> Result<(), Error> {
    let file_path = Path::new(path);
    match fs::write(file_path, content) {
        Ok(_) => Ok(()),
        Err(e) => return Err(tauri::api::Error::Io(e))
    }
}
pub fn remove_file(path: &str) -> Result<(), Error> {
    let path = Path::new(path);
    match fs::remove_file(path) {
        Ok(_) => Ok(()),
        Err(e) => return Err(tauri::api::Error::Io(e))
    }
}