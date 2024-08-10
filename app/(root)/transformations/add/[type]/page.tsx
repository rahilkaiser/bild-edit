import {TransformationHeader} from "@/components/shared/TransformationHeader";
import {TransformationForm} from "@/components/shared/TransformationForm";
import {auth} from "@clerk/nextjs/server";
import {transformationTypes} from "@/constants";
import {getUserById} from "@/lib/actions/user.actions";
import {redirect} from "next/navigation";
import {TransformationType} from "@/types/image";
import {SearchParamProps} from "@/types";

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
