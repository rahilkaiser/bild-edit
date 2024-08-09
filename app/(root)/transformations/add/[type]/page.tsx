import {TransformationHeader} from "@/components/shared/TransformationHeader";
import {TransformationForm} from "@/components/shared/TransformationForm";
import {auth} from "@clerk/nextjs/server";
import {transformationTypes} from "@/constants";
import {getUserById} from "@/lib/actions/user.actions";
import {redirect} from "next/navigation";
import {TransformationTypeKey} from "@/types/image";

export default async function AddTransformationsTypePage({params: {type}}) {

    const transformation = transformationTypes[type];
    const {userId} = auth();
    if (!userId) redirect("/sign-in");

    const user = await getUserById(userId);

    return (
        <>
            <TransformationHeader
                title={transformation.title}
                description={transformation.subTitle}
            />

            <section className="mt-10">
                <TransformationForm
                    action="Add"
                    type={transformation.type as TransformationTypeKey}
                    userId={user._id}
                    creditBalance={user.creditBalance}
                />
            </section>
        </>
    );
}
