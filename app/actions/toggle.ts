'use server'

import { revalidatePath } from "next/cache";
import { fetchTodoById, updateTodo } from "../lib/todo"


export async function toggleTodo(id:string){
    const todo=await fetchTodoById(id);
    if(!todo){
        console.error('Todo not found');
        return;
    }
    const success=await updateTodo(id,{completed:!todo.completed});
    if(!success){
        console.error('Failed to upadte todo');
        return
    }
    revalidatePath('/')
}