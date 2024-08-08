import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combines class names into a single string, handling conditional classes.
 * It merges Tailwind CSS classes to ensure proper styling.
 *
 * @param inputs - Array of class values to be merged.
 * @returns A single string of combined class names.
 */
export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

/**
 * Handles errors by logging and rethrowing them with a formatted message.
 *
 * @param error - The error to handle. Can be of any type.
 * @throws A new Error with a formatted message.
 */
export const handleError = (error: unknown) => {
    if (error instanceof Error) {
        console.error(error.message);
        throw new Error(`Error: ${error.message}`);
    } else if (typeof error === "string") {
        console.error(error);
        throw new Error(`Error: ${error}`);
    } else {
        console.error(error);
        throw new Error(`Unknown error: ${JSON.stringify(error)}`);
    }
};


