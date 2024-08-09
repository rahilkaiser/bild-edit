import {
    Home,
    Image as ImageIcon,
    Stars,
    Scan,
    Filter,
    Camera,
    User,
    ShoppingBag,
    Package,
    Crown,
} from "lucide-react";
export const navLinks = [
    {
        label: "Home",
        route: "/",
        icon: Home,
    },
    {
        label: "Image Restore",
        route: "/transformations/add/restore",
        icon: ImageIcon,
    },
    {
        label: "Generative Fill",
        route: "/transformations/add/fill",
        icon: Stars,
    },
    {
        label: "Object Remove",
        route: "/transformations/add/remove",
        icon: Scan,
    },
    {
        label: "Object Recolor",
        route: "/transformations/add/recolor",
        icon: Filter,
    },
    {
        label: "Background Remove",
        route: "/transformations/add/removeBackground",
        icon: Camera,
    },
    {
        label: "Profile",
        route: "/profile",
        icon: User,
    },
    {
        label: "Buy Credits",
        route: "/credits",
        icon: ShoppingBag,
    },
];

export const plans = [
    {
        _id: 1,
        name: "Free",
        icon: Package,
        price: 0,
        credits: 20,
        inclusions: [
            {
                label: "20 Free Credits",
                isIncluded: true,
            },
            {
                label: "Basic Access to Services",
                isIncluded: true,
            },
            {
                label: "Priority Customer Support",
                isIncluded: false,
            },
            {
                label: "Priority Updates",
                isIncluded: false,
            },
        ],
    },
    {
        _id: 2,
        name: "Pro Package",
        icon: Package,
        price: 40,
        credits: 120,
        inclusions: [
            {
                label: "120 Credits",
                isIncluded: true,
            },
            {
                label: "Full Access to Services",
                isIncluded: true,
            },
            {
                label: "Priority Customer Support",
                isIncluded: true,
            },
            {
                label: "Priority Updates",
                isIncluded: false,
            },
        ],
    },
    {
        _id: 3,
        name: "Premium Package",
        icon: Crown,
        price: 199,
        credits: 2000,
        inclusions: [
            {
                label: "2000 Credits",
                isIncluded: true,
            },
            {
                label: "Full Access to Services",
                isIncluded: true,
            },
            {
                label: "Priority Customer Support",
                isIncluded: true,
            },
            {
                label: "Priority Updates",
                isIncluded: true,
            },
        ],
    },
];

export const transformationTypes = {
    restore: {
        type: "restore",
        title: "Restore Image",
        subTitle: "Refine images by removing noise and imperfections",
        config: { restore: true },
        icon: ImageIcon,
    },
    removeBackground: {
        type: "removeBackground",
        title: "Background Remove",
        subTitle: "Removes the background of the image using AI",
        config: { removeBackground: true },
        icon: Camera,
    },
    fill: {
        type: "fill",
        title: "Generative Fill",
        subTitle: "Enhance an image's dimensions using AI outpainting",
        config: { fillBackground: true },
        icon: Stars,
    },
    remove: {
        type: "remove",
        title: "Object Remove",
        subTitle: "Identify and eliminate objects from images",
        config: {
            remove: { prompt: "", removeShadow: true, multiple: true },
        },
        icon: Scan,
    },
    recolor: {
        type: "recolor",
        title: "Object Recolor",
        subTitle: "Identify and recolor objects from the image",
        config: {
            recolor: { prompt: "", to: "", multiple: true },
        },
        icon: Filter,
    },
};

export const aspectRatioOptions = {
    "1:1": {
        aspectRatio: "1:1",
        label: "Square (1:1)",
        width: 1000,
        height: 1000,
    },
    "3:4": {
        aspectRatio: "3:4",
        label: "Standard Portrait (3:4)",
        width: 1000,
        height: 1334,
    },
    "9:16": {
        aspectRatio: "9:16",
        label: "Phone Portrait (9:16)",
        width: 1000,
        height: 1778,
    },
};

