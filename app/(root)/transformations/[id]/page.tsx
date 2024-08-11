import {SearchParamProps} from "@/types";
import {auth} from "@clerk/nextjs/server";
import {getImageById} from "@/lib/actions/image.action";
import {TransformationHeader} from "@/components/shared/TransformationHeader";
import {DotIcon} from "lucide-react";
import {getImageSize} from "@/lib/utils";
import Image from "next/image";
import {TransformedImage} from "@/components/shared/TransformedImage";
import Link from "next/link";
import {Button} from "@/components/ui/button";
import {DeleteConfirmationModal} from "@/components/shared/DeleteConfirmationModal";


export default async function TransformationsPage({params: {id}}: SearchParamProps) {

    const {userId} = auth();

    const image = await getImageById(id);


    return (
        <div className="container">
            <TransformationHeader title={image.title} description={image.subtitle}/>
            <section className="mt-4">
                <div className="flex gap-4 justify-center lg:justify-start">
                    <p className="hidden lg:block"><DotIcon className="w-8 h-8"/></p>
                    <p className="font-serif text-xl ">Transformation:</p>
                    <p className=" capitalize font-bold text-accent text-xl">{image.transformationType}</p>
                </div>

                {image.prompt && (
                    <div className="flex gap-4 justify-center lg:justify-start">
                        <p className="hidden lg:block"><DotIcon className="w-8 h-8"/></p>
                        <p className="font-serif text-xl">Prompt:</p>
                        <p className=" capitalize  font-bold text-accent text-xl">{image.prompt}</p>
                    </div>
                )}

                {image.color && (
                    <div className="flex gap-4 justify-center lg:justify-start">
                        <p className="hidden lg:block"><DotIcon className="w-8 h-8"/></p>
                        <p className="font-serif text-xl">Color:</p>
                        <p className=" capitalize  font-bold text-accent text-xl">{image.color}</p>
                    </div>
                )}

                {image.aspectRatio && (
                    <div className="flex gap-4 justify-center lg:justify-start">
                        <p className="hidden lg:block"><DotIcon className="w-8 h-8"/></p>
                        <p className="font-serif text-xl">Aspect Ratio:</p>
                        <p className=" capitalize font-bold text-accent text-xl">{image.aspectRatio}</p>
                    </div>
                )}
            </section>


            <section className="mt-10 border-t border-accent grid grid-cols-1 lg:grid-cols-2 lg:gap-6">
                <div className="w-full">
                    <h3 className="py-4 text-center">Original</h3>
                    <Image
                        width={getImageSize(image.transformationType, image, "width")}
                        height={getImageSize(image.transformationType, image, "height")}
                        src={image.secureURL}
                        alt="image"
                        className="object-contain"
                    />
                </div>
                <div className="w-full">
                    <h3 className="py-4 text-center">Transformed</h3>
                    <TransformedImage
                        image={image}
                        type={image.transformationType}
                        title={image.title}
                        isTransforming={false}
                        transformationConfig={image.config}
                        hasDownload={true}
                    />
                </div>

                {userId === image.author.clerkId && (
                    <div className="mt-4 space-y-4">
                        <Button asChild type="button" className="uppercase w-full rounded-lg">
                            <Link href={`/transformations/${image._id}/update`}>
                                Update Image
                            </Link>
                        </Button>

                        <DeleteConfirmationModal imageId={image._id}/>
                    </div>
                )}

            </section>
        </div>
    );
}
