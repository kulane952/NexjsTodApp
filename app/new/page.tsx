"use client";

import React, { useActionState } from "react";
import Link from "next/link";
import {
    createTodoAction,
    CreateTodoState,
} from "../actions/create";

const initialState: CreateTodoState = {
    error: null,
    success: false,
};

export default function NewTodo() {
    const [state, formAction, isPending] = useActionState(
        createTodoAction,
        initialState
    );

    return (
        <main className="max-w-2xl mx-auto mt-10 p-6">
            <div className="bg-white rounded-lg shadow-md p-6">

                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl font-bold text-gray-800">
                        Add New Todo
                    </h1>

                    <Link
                        href="/"
                        className="text-rose-600 hover:text-rose-800 transition-colors"
                    >
                        ← Back to Todos
                    </Link>
                </div>

                <form action={formAction}>

                    <div>
                        <label
                            htmlFor="title"
                            className="block text-sm font-medium text-gray-700 mb-2"
                        >
                            Todo Title
                        </label>

                        <input
                            type="text"
                            id="title"
                            name="title"
                            placeholder="Enter your todo..."
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-500"
                            required
                            maxLength={200}
                            autoFocus
                            disabled={isPending}
                        />

                        <p className="text-xs text-gray-500 mt-1">
                            Maximum 200 characters
                        </p>

                        {state.error && (
                            <p className="text-red-500 text-sm mt-2">
                                {state.error}
                            </p>
                        )}

                        {state.success && (
                            <p className="text-green-600 text-sm mt-2">
                                Todo created successfully!
                            </p>
                        )}
                    </div>

                    <div className="flex gap-3 mt-6">

                        <button
                            type="submit"
                            disabled={isPending}
                            className="flex-1 bg-rose-600 text-white py-2 px-4 rounded-md hover:bg-rose-700 disabled:opacity-50"
                        >
                            {isPending
                                ? "Creating..."
                                : "Create Todo"}
                        </button>

                        <Link
                            href="/"
                            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
                        >
                            Cancel
                        </Link>

                    </div>

                </form>
                <div className="mt-4">
    <label
        htmlFor="priority"
        className="block text-sm font-medium text-gray-700 mb-2"
    >
        Priority
    </label>

    <select
        id="priority"
        name="priority"
        defaultValue="medium"
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-500"
        disabled={isPending}
    >
        <option value="low">🟢 Low</option>
        <option value="medium">🟡 Medium</option>
        <option value="high">🔴 High</option>
    </select>
</div>
            </div>
        </main>
    );
}