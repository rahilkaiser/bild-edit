"use client"
import {TransformedImageProps} from "@/types/image";
import {Button} from "@/components/ui/button";
import {DownloadCloud} from "lucide-react";
import {getImageSize} from "@/lib/utils";
import {CldImage} from "next-cloudinary";
import CircleLoader from "react-spinners/CircleLoader";

export const TransformedImage = (
    {
        image,
        transformationConfig,
        isTransforming,
        setIsTransforming,
        type,
        title,
        hasDownload = false,
    }: TransformedImageProps) => {
    function downloadImage(e: React.MouseEvent<HTMLButtonElement>) {
    }

    return (
        <>

            {image?.publicId && transformationConfig ? (
                <div className="relative">
                    <CldImage
                        width={getImageSize(type, image, "width") / 10}
                        height={getImageSize(type, image, "height") / 10}
                        alt={title}
                        src={image?.publicId}
                        sizes={"(max-width: 767px) 100vw, 50vw"}
                        className="h-fit min-h-72 w-full rounded-[10px]  object-contain"
                        onLoad={() => {
                            setIsTransforming && setIsTransforming(false);
                        }}
                        onError={(e) => {
                            console.log("error", e);
                            setIsTransforming && setIsTransforming(false);
                        }}
                        {...transformationConfig}
                    />

                    {isTransforming && (
                        <div
                            className="flex justify-center items-center absolute left-[50%] top-[50%] size-full -translate-x-1/2 -translate-y-1/2 ">
                            <CircleLoader className="w-12 h-12 text-accent" color="#BFAA40"/>
                        </div>
                    )}
                </div>
            ) : (
                <div className="flex justify-center items-center h-full">
                    Transformed Image
                </div>
            )}
            {!hasDownload && (
                <Button className="" onClick={(e) => downloadImage(e)}>
                    <DownloadCloud className="mr-4"/> Download
                </Button>
            )}
        </>
    );
};
