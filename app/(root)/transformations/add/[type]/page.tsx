import {TransformationHeader} from "@/components/shared/TransformationHeader";
import {TransformationForm} from "@/components/shared/TransformationForm";
import {auth} from "@clerk/nextjs/server";
import {getUserById} from "@/lib/actions/user.actions";
import {redirect} from "next/navigation";
import {TransformationType} from "@/types/image";
import {SearchParamProps} from "@/types";
import {Camera, Filter, ImageIcon, Scan, Stars} from "lucide-react";

const transformationTypes = {
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

export default async function AddTransformationsTypePage({params: {type}} : SearchParamProps) {

    const transformationType:TransformationType = transformationTypes[type] as TransformationType;

    const {userId} = auth();
    if (!userId) redirect("/sign-in");

    const user = await getUserById(userId);

    return (
        <>
            <TransformationHeader
                title={transformationType.title}
                description={transformationType.subTitle}
            />

            <section className="mt-10 px-10">
                <TransformationForm
                    action="Add"
                    type={transformationType.type}
                    userId={user._id}
                    creditBalance={user.creditBalance}
                />
            </section>
        </>
    );
}
