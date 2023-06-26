// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

mod file_manager;

#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[tauri::command]
fn open_folder(folder_path: &str) -> String {
    file_manager::read_directory(folder_path).unwrap()
}

#[tauri::command]
fn file_content(file_path: &str) -> String {
    file_manager::read_file(file_path).unwrap_or_default()
}

#[tauri::command]
fn write_file(file_path: &str, content: &str) -> Result<String, String> {
    file_manager::write_file(file_path, content)
        .map(|_| String::from("File written successfully"))
        .map_err(|e| e.to_string())
}

#[tauri::command]
fn delete_file(file_path: &str) -> Result<String, String> {
    file_manager::remove_file(file_path)
    .map(|_| String::from("File deleted successfully"))
    .map_err(|e| e.to_string())
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![greet, open_folder, write_file, file_content, delete_file])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
