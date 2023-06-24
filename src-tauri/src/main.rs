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
    file_manager::read_directory(folder_path)
}

#[tauri::command]
fn file_content(file_path: &str) -> String {
    file_manager::read_file(file_path)
}

#[tauri::command]
fn write_file(file_path: &str, content: &str) -> String {
    file_manager::write_file(file_path, content)
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![greet, open_folder, write_file, file_content])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
