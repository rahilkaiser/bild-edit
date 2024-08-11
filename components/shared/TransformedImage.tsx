"use client"
import {TransformedImageProps} from "@/types/image";
import {Button} from "@/components/ui/button";
import {DownloadCloud} from "lucide-react";
import {getImageSize} from "@/lib/utils";
import {CldImage, getCldImageUrl} from "next-cloudinary";
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

    const download = (url: string, filename: string) => {
        if (!url) {
            throw new Error("Resource URL not provided! You need to provide one");
        }

        fetch(url)
            .then((response) => response.blob())
            .then((blob) => {
                const blobURL = URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = blobURL;

                if (filename && filename.length)
                    a.download = `${filename.replace(" ", "_")}.png`;
                document.body.appendChild(a);
                a.click();
            })
            .catch((error) => console.log({error}));
    };

    function downloadImage(e: React.MouseEvent<HTMLButtonElement>) {

        e.preventDefault();

        download(getCldImageUrl({
            width: image?.width,
            height: image?.height,
            src: image?.publicId,
            ...transformationConfig
        }), title)
    }

    return (
        <div className="relative">
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
            {hasDownload && (
                <Button
                    className="absolute top-0 right-0 bg-accent text-accent-foreground font-semibold hover:bg-accent/80 "
                    onClick={(e) => downloadImage(e)}>
                    <DownloadCloud className="mr-4"/> Download
                </Button>
            )}
        </div>
    );
};
