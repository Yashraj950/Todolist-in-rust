use actix_web::{web, App, HttpResponse, HttpServer, Responder};

use actix_web::Cors;
use chrono::{DateTime, Utc};
use serde::{Deserialize, Serialize};
use std::sync::Mutex;
use uuid::Uuid;

#[derive(Serialize, Deserialize, Clone)]

struct TodoItem {
    id: Uuid,
    title: String,
    completed: bool,
    created_at: DateTime<Utc>,
}

#[derive(Deserialize)]

struct CreateTodoItem {
    title: String,
    completed: bool,
}

#[derive(Deserialize)]
struct AppState {

    todo_list:Mutex<Vec<TodoItem>>
}


async fn get_todos(data:web::Data<AppState>) -> impl Responder {
    let todos=data.todo_list.lock().unwrap();
    HttpResponse::Ok().json(&*todos)
}


async fn add_todo(

    item: web::Json<CreateTodoItem>,
    data: web::Data<AppState>,
) -> impl Responder {
    let mut todos = data.todo_list.lock().unwrap();
    let todo_item = TodoItem {
        id: Uuid::new_v4(),
        title: item.title.clone(),
        completed: item.completed,
        created_at: Utc::now(),
    };
    todos.push(todo_item);
    HttpResponse::Ok().json(&todo_item)
}


async fn update_todo(
   path:web::Path<(Uuid,)>,
   item:web::Json<UpdateTodoItem>,
   data:web::Data<AppState>)->impl Responder{





   }
  