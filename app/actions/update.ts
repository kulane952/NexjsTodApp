"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { updateTodo } from "../lib/todo";
import { Priority } from "../types/todo";

export async function updateTodoAction(
    formData: FormData
) {
    const id = formData.get("id");
    const title = formData.get("title");
    const priority = formData.get("priority");

    if (
        typeof id !== "string" ||
        !id ||
        typeof title !== "string"
    ) {
        return;
    }

    const cleanTitle = title.trim();

    if (!cleanTitle) {
        return;
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

    const success = await updateTodo(id, {
        title: cleanTitle,
        priority: selectedPriority,
    });

    if (!success) {
        console.error("Failed to update todo");
        return;
    }

    revalidatePath("/");
    revalidatePath(`/edit/${id}`);

    redirect("/");
}