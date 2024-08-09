import {TransformedImageProps} from "@/types/image";
import {Button} from "@/components/ui/button";
import {DownloadCloud} from "lucide-react";
import {getImageSize} from "@/lib/utils";
import {CldImage} from "next-cloudinary";


export const TransformedImage = ({
                                     image,
                                     transformationConfig,
                                     isTransforming,
                                     setIsTransforming,
                                     type,
                                     title,
                                     hasDownload = false
                                 }: TransformedImageProps) => {
    function downloadImage(e: React.MouseEvent<HTMLButtonElement>) {

    }

    return (

        <div className="flex flex-col gap-4 justify-center items-center">
            <h3>Result</h3>

            {image?.publicId && transformationConfig ? (
                <div className="relative">
                    <CldImage
                        width={getImageSize(type, image, "width")}
                        height={getImageSize(type, image, "height")}
                        alt={image.title}
                        src={image?.publicId}
                        sizes={"(max-width: 767px) 100vw, 50vw"}
                        onLoad={() => {
                            setIsTransforming && setIsTransforming(false);
                        }}
                        onError={(e) => {
                            console.log("error", e);
                            setIsTransforming && setIsTransforming(false);
                        }}
                    />

                    {isTransforming && (<div>
                        Processing...
                    </div>)}
                </div>
            ) : (
                <div className="flex justify-center items-center h-full">Transformed Image</div>
            )}
            {!hasDownload && (

                <Button className="" onClick={(e) => downloadImage(e)}>
                    <DownloadCloud className="mr-4"/> Download
                </Button>
            )}
        </div>

    )
};
