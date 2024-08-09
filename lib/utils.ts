import {type ClassValue, clsx} from "clsx";
import {twMerge} from "tailwind-merge";
import {aspectRatioOptions} from "@/constants";

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

export type AspectRatioKey = keyof typeof aspectRatioOptions;

export const debounce = (func: (...args: any[]) => void, delay: number) => {
  let timeoutId: number;
  return (...args: any[]) => {
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(null, args), delay);
  };
};

export const deepMergeObjects = (obj1: any, obj2: any) => {
  if(obj2 === null || obj2 === undefined) {
    return obj1;
  }

  let output = { ...obj2 };

  for (let key in obj1) {
    if (obj1.hasOwnProperty(key)) {
      if (
        obj1[key] &&
        typeof obj1[key] === "object" &&
        obj2[key] &&
        typeof obj2[key] === "object"
      ) {
        output[key] = deepMergeObjects(obj1[key], obj2[key]);
      } else {
        output[key] = obj1[key];
      }
    }
  }

  return output;
};