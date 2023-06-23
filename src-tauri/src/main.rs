// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod file_manager;

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[tauri::command]
fn open_folder(path: &str) -> String {
    file_manager::read_directory(path)
}

#[tauri::command]
fn write_file(file_path: &str, content: &str) -> String {
    file_manager::write_file(file_path, content);
    String::from("OK")
}


fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![greet, open_folder, write_file])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

