import {redirect} from "next/navigation";
import {getUserById} from "@/lib/actions/user.actions";
import {plans} from "@/constants";
import {TransformationHeader} from "@/components/shared/TransformationHeader";
import Image from "next/image";
import {Button} from "@/components/ui/button";
import {auth} from "@clerk/nextjs/server";

import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Check, CheckCheckIcon, CrossIcon, XIcon} from "lucide-react";
import {SignedIn} from "@clerk/nextjs";
import {Checkout} from "@/components/shared/Checkout";

export default async function CreditsPage() {
    const {userId} = auth();

    if (!userId) redirect("/sign-in");

    const user = await getUserById(userId);

    return (
        <div className="container">
            <TransformationHeader
                title="Buy Credits"
                description="Choose a credit package that suits your needs!"
            />

            <section className="border-t border-accent mt-8">
                <div className="grid xl:grid-cols-3 gap-8 mt-8 place-content-center">
                    {plans.map((plan) => (
                        <Card key={plan._id} className="w-fit min-w-full flex flex-col justify-between">
                            <CardHeader>
                                <CardTitle className="flex justify-between">
                                    <span className="pr-10 text-accent text-wrap">{plan.name}</span>
                                    <h2 className="flex-1 text-end text-yellow-400">{plan.price}€</h2>
                                </CardTitle>
                                <CardDescription>{plan.credits} Credits</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <ul>
                                    {plan.inclusions.map((inclusion) => (
                                        <li key={plan.name + inclusion.label}
                                            className="flex space-x-4 p-2 items-center"
                                        >
                                            {inclusion.isIncluded ?
                                                <Check className="text-green-500"/>
                                                :
                                                <XIcon className="text-red-500 "/>}
                                            <p>{inclusion.label}</p>
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                            <CardFooter className="flex flex-col justify-end items-center">
                                {plan.name == "Free" ?
                                    <Button
                                        className="border border-black hover:bg-card hover:text-accent"
                                        variant="ghost">
                                        Free Consumable
                                    </Button> :
                                    <SignedIn>
                                        <Checkout
                                            plan={plan.name}
                                            amount={plan.price}
                                            credits={plan.credits}
                                            buyerId={user._id}
                                        />
                                    </SignedIn>
                                }
                            </CardFooter>
                        </Card>


                    ))}
                </div>
            </section>
        </div>
    );
}


//     <li key={plan.name} className="credits-item">
// <div className="flex-center flex-col gap-3">
//     <plan.icon className="w-4 h-4"/>
//     <p className="p-20-semibold mt-2 text-purple-500">
//         {plan.name}
//     </p>
//     <p className="h1-semibold text-dark-600">${plan.price}</p>
//     <p className="p-16-regular">{plan.credits} Credits</p>
// </div>
//
// {/* Inclusions */}
// <ul className="flex flex-col gap-5 py-9">
//     {plan.inclusions.map((inclusion) => (
//         <li
//             key={plan.name + inclusion.label}
//             className="flex items-center gap-4"
//         >
//             <Image
//                 src={`/assets/icons/${
//                     inclusion.isIncluded ? "check.svg" : "cross.svg"
//                 }`}
//                 alt="check"
//                 width={24}
//                 height={24}
//             />
//             <p className="p-16-regular">{inclusion.label}</p>
//         </li>

{/*    {plan.name === "Free" ? (*/
}
{/*        <Button variant="outline" className="credits-btn">*/
}
{/*            Free Consumable*/
}
{/*        </Button>*/
}
{/*    ) : (*/
}
{/*        <SignedIn>*/
}
{/*            <Checkout*/
}
{/*                plan={plan.name}*/
}
{/*                amount={plan.price}*/
}
{/*                credits={plan.credits}*/
}
{/*                buyerId={user._id}*/
}
{/*            />*/
}
{/*        </SignedIn>*/
}
{/*    )}*/
}
{/*</li>*/
}