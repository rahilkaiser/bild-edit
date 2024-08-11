import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { aspectRatioOptions } from "@/constants";
import { TransformationConfig } from "@/types/image";
import { ZodNullDef } from "zod";
import qs from "qs";


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

/**
 * Represents a key from the `aspectRatioOptions` object.
 * This type is derived from the keys of the `aspectRatioOptions` object.
 * 
 */
export type AspectRatioKey = keyof typeof aspectRatioOptions;

/**
 * Deeply merges two objects, `obj1` and `obj2`, returning a new object that combines their properties.
 * If both objects have a property with the same key and that property's value is an object,
 * the function will recursively merge those nested objects.
 * 
 * @param {TransformationConfig | ZodNullDef | any} obj1 - The first object to merge. This object has priority in the merge.
 * @param {TransformationConfig | null | any} obj2 - The second object to merge. If this object is null or undefined, the function returns `obj1`.
 * @returns {TransformationConfig} - The result of merging `obj1` and `obj2`.
 * 
 * @example
 * // Example usage:
 * const config1 = { restore: true, fillBackground: false };
 * const config2 = { removeBackground: true, recolor: { to: 'red' } };
 * const mergedConfig = deepMergeObjects(config1, config2);
 * console.log(mergedConfig);
 * // Output: { restore: true, fillBackground: false, removeBackground: true, recolor: { to: 'red' } }
 */
export const deepMergeObjects = (obj1: TransformationConfig | ZodNullDef | any, obj2: TransformationConfig | null | any): TransformationConfig => {
    if (obj2 === null || obj2 === undefined) {
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

export const getImageSize = (
    type: string,
    image: any,
    dimension: "width" | "height"
): number => {
    if (type === "fill") {
        return (
            aspectRatioOptions[image.aspectRatio as AspectRatioKey]?.[dimension] ||
            1000
        );
    }
    return image?.[dimension] || 1000;
};

/**
 * Returns a debounced version of the provided callback function.
 * The debounced function delays the execution of the callback until after
 * a specified delay has passed since the last time the debounced function was invoked.
 * 
 * @param {() => void} callback - The function to be debounced.
 * @param {number | undefined} delay - The number of milliseconds to wait before executing the callback.
 *                                     If `undefined`, the callback will be executed immediately without delay.
 * @returns {() => void} - A debounced version of the provided callback function.
 * 
 * @example
 * // Create a debounced function with a 1-second delay
 * const debouncedFunction = debounce(() => console.log('Hello World!'), 1000);
 * 
 * // Call the debounced function
 * debouncedFunction(); // 'Hello World!' is logged after 1 second
 * 
 * // Call the debounced function again before 1 second elapses
 * debouncedFunction(); // The previous call is cancelled, and 'Hello World!' is not logged
 */
export function debounce(callback: () => void, delay: number | undefined) {
    let timeoutId: string | number | NodeJS.Timeout | undefined;

    return function () {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(callback, delay);
    }
}

  export function formUrlQuery(searchParams: string, key: string, val: string | number) {
    const params = { ...qs.parse(searchParams.toString()), [key]: val };

    return `${window.location.pathname}?${qs.stringify(params, {
      skipNulls: true,
    })}`;
  }