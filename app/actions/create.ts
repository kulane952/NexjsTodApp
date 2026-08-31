"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createTodo } from "../lib/todo";
import { Priority } from "../types/todo";

export type CreateTodoState = {
    error: string | null;
    success: boolean;
};

export async function createTodoAction(
    prevState: CreateTodoState,
    formData: FormData
): Promise<CreateTodoState> {

    const title = formData.get("title");
    const priority = formData.get("priority");

    if (typeof title !== "string") {
        return {
            error: "Title is required",
            success: false,
        };
    }

    const cleanTitle = title.trim();

    if (!cleanTitle) {
        return {
            error: "Title is required",
            success: false,
        };
    }

    if (cleanTitle.length > 200) {
        return {
            error: "Title must be less than 200 characters",
            success: false,
        };
    }

    const validPriorities: Priority[] = [
        "low",
        "medium",
        "high",
    ];

    const selectedPriority: Priority =
        typeof priority === "string" &&
        validPriorities.includes(priority as Priority)
            ? (priority as Priority)
            : "medium";

    const todoId = await createTodo({
        title: cleanTitle,
        completed: false,
        priority: selectedPriority,
    });

    if (!todoId) {
        return {
            error: "Failed to create todo",
            success: false,
        };
    }

    revalidatePath("/");
    redirect("/");
}