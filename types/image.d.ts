import {IImage} from "@/lib/database/models/image.model";

/**
 * Types of transformations that can be applied to an image.
 *
 * @property {boolean} [restore] - Flag indicating if the image should be restored to its original state.
 * @property {boolean} [fillBackground] - Flag indicating if the background should be filled.
 * @property {object} [remove] - Configuration for removing elements from the image.
 * @property {string} remove.prompt - The prompt for removing elements.
 * @property {boolean} [remove.removeShadow] - Flag indicating if shadows should be removed.
 * @property {boolean} [remove.multiple] - Flag indicating if multiple elements should be removed.
 * @property {object} [recolor] - Configuration for recoloring the image.
 * @property {string} [recolor.prompt] - The prompt for recoloring.
 * @property {string} recolor.to - The color to recolor the image to.
 * @property {boolean} [recolor.multiple] - Flag indicating if multiple colors should be used.
 * @property {boolean} [removeBackground] - Flag indicating if the background should be removed.
 */
declare type TransformationConfig = {
    restore?: boolean;
    fillBackground?: boolean;
    remove?: {
        prompt: string;
        removeShadow?: boolean;
        multiple?: boolean;
    };
    recolor?: {
        prompt?: string;
        to: string;
        multiple?: boolean;
    };
    removeBackground?: boolean;
};

declare type TransformationType = {
    type: TransformationTypeKey;
    title: string;
    subTitle: string;
    config: TransformationConfig;
    icon: any;
};

/**
 * Enum representing the possible types of transformations that can be applied to an image.
 */
declare type TransformationTypeKey =
    | "restore"
    | "fill"
    | "remove"
    | "recolor"
    | "removeBackground";


/**
 * Properties for configuring a transformation form.
 *
 * @property {"Add" | "Update"} action - The action type, either adding or updating a transformation.
 * @property {string} userId - The ID of the user performing the transformation.
 * @property {TransformationTypeKey} type - The type of transformation being configured.
 * @property {number} creditBalance - The user's current credit balance.
 * @property {IImage | null} [data] - Optional data about the image being transformed.
 * @property {TransformationConfig | null} [config] - Optional configuration settings for the transformation.
 */
declare type TransformationFormProps = {
    action: "Add" | "Update";
    userId: string;
    type: TransformationTypeKey;
    creditBalance: number;
    data?: IImage | null;
    config?: TransformationConfig | null;
};

