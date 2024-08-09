import {TransformationTypeKey} from "@/types/image";


/**
 * Properties representing search parameters and transformation types.
 *
 * @property {object} params - An object containing the ID and transformation type.
 * @property {string} params.id - The ID of the resource being transformed.
 * @property {TransformationTypeKey} params.type - The type of transformation being applied.
 * @property {object} searchParams - An object representing the search parameters in the URL.
 */
declare type SearchParamProps = {
    params: { id: string; type: TransformationTypeKey };
    searchParams: { [key: string]: string | string[] | undefined };
};