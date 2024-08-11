import {SearchParamProps} from "@/types";
import {auth} from "@clerk/nextjs/server";
import {redirect} from "next/navigation";
import {getUserById} from "@/lib/actions/user.actions";
import {getImageById} from "@/lib/actions/image.action";
import {transformationTypes} from "@/constants";
import {TransformationTypeKey} from "@/types/image";
import {TransformationHeader} from "@/components/shared/TransformationHeader";
import {TransformationForm} from "@/components/shared/TransformationForm";

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
