import {auth} from "@clerk/nextjs/server";
import {SearchParamProps} from "@/types";
import {redirect} from "next/navigation";
import {getUserById} from "@/lib/actions/user.actions";
import {getUserImages} from "@/lib/actions/image.action";
import {TransformationHeader} from "@/components/shared/TransformationHeader";
import {Coins, CoinsIcon, EditIcon, LucideCoins, Sparkle, SparkleIcon, Sparkles} from "lucide-react";
import ImageListView from "@/components/shared/ImageListView";

export default async function ProfilePage({searchParams}: SearchParamProps) {

    const page = Number(searchParams?.page) || 1;
    const {userId} = auth();

    if (!userId) redirect("/sign-in");

    const user = await getUserById(userId);
    const images = await getUserImages({page, userId: user._id});

    return (
        <div className="container">
            <TransformationHeader
                title={"Pofile"}
                description={""}
            />

            <section className="mt-8 border-t border-accent">
                <div className="mt-8 flex justify-between gap-8 items-center">
                    <span className="font-semibold">Credit Balance:</span>
                    <span className="ring-purple-500 flex-grow border border-accent"></span>
                    <div className="flex items-center gap-2">
                        <Coins className="text-accent"/>
                        <h2>
                            {user.creditBalance}
                        </h2>
                    </div>
                </div>


                <div className="flex justify-between items-center gap-2">

                    <p className="font-semibold">Image Manipulation Done:</p>
                    <span className="flex-grow ring-purple-500 border border-accent"></span>
                    <div className="flex items-center gap-2">
                        <Sparkles className="text-accent"/>
                        <h2>
                            {images?.data.length}
                        </h2>
                    </div>

                </div>
            </section>

            <section>
                <ImageListView
                    images={images.data}
                    totalPages={images.totalPages}
                    page={page}
                />
            </section>

        </div>
    );
}
