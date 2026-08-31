"use server";

import { searchTodos } from "../lib/todo";

export async function searchTodosAction(
    search: string,
    status: "all" | "active" | "completed"
) {
    return await searchTodos(search, status);
}