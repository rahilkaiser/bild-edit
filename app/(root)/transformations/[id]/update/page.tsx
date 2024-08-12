import {SearchParamProps} from "@/types";
import {auth} from "@clerk/nextjs/server";
import {redirect} from "next/navigation";
import {getUserById} from "@/lib/actions/user.actions";
import {getImageById} from "@/lib/actions/image.action";
import {TransformationTypeKey} from "@/types/image";
import {TransformationHeader} from "@/components/shared/TransformationHeader";
import {TransformationForm} from "@/components/shared/TransformationForm";
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

export default async function UpdateTransformationsPage({params: {id}}: SearchParamProps) {
    const {userId} = auth();
    if (!userId) redirect("/sign-in");

    const user = await getUserById(userId);
    const image = await getImageById(id);

    const transformation =
        transformationTypes[image.transformationType as TransformationTypeKey];

    return (
        <div className="container">
            <TransformationHeader title={image.title} description={""}/>
            <section className="mt-10">
                <TransformationForm
                    action="Update"
                    userId={user._id}
                    type={image.transformationType as TransformationTypeKey}
                    creditBalance={user.creditBalance}
                    config={image.config}
                    data={image}
                />
            </section>
        </div>
    );
}
