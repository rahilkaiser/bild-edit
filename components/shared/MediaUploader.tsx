"use client"
import {useToast} from "@/components/ui/use-toast";
import {CldImage, CldUploadWidget} from "next-cloudinary";
import Image from "next/image";
import {CircleFadingArrowUp, UploadCloud} from "lucide-react";
import {getImageSize} from "@/lib/utils";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";


export const MediaUploader = (
    {
        onValueChange,
        setImage,
        publicId,
        image,
        type
    }: {
        onValueChange: (value: string) => void;
        setImage: React.Dispatch<any>;
        publicId: string;
        image: any;
        type: string;
    }
) => {
    const {toast} = useToast();


    function onUploadSuccessHandler(result: any) {

        setImage((prevState: any) => {
            return {
                ...prevState,
                publicId: result?.info?.public_id,
                width: result?.info?.width,
                height: result?.info?.height,
                secureURL: result?.info?.secure_url
            }
        });

        onValueChange(result?.info?.public_id);

        console.log("onUploadSuccessHandler", result);
        toast({
            variant: "default",
            title: "Image uploaded successfully",
            description: "1 credit was deducted from your account",
            duration: 5000,
            className: "bg-green-500"
        })
    }

    function onUploadErrorHandler() {
        toast({
            variant: "destructive",
            title: "Oops, something went wrong",
            description: "Please try again",
            duration: 5000,
        })
    }

    return (
        <CldUploadWidget
            uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_PRESET_NAME}
            options={{
                multiple: false,
                resourceType: "image",

            }}
            onSuccess={onUploadSuccessHandler}
            onError={onUploadErrorHandler}
        >
            {({open}) => {

                    return <div className="flex flex-col items-center">
                        <h3 className="pb-4">Original</h3>
                        {publicId ? (
                        <div className="flex justify-center items-center cursor-pointer overflow-hidden rounded-lg">
                            <CldImage
                                width={getImageSize(type, image, "width")}
                                height={getImageSize(type, image, "height")}
                                alt={"original Image"}
                                src={publicId}
                                sizes={"(max-width: 767px) 100vw, 50vw"}
                            />
                        </div>

                    ) : (
                        <div  className="w-full" onClick={
                            () => {
                                open();
                            }
                        }>
                            <div
                                className="p-12 border-dashed border-2 rounded-xl cursor-pointer border-primary flex justify-center items-center flex-col gap-4">
                                <UploadCloud className="w-10 h-10 text-accent"/>
                                <p>Click here to upload Image</p>
                            </div>
                        </div>
                    )}

                </div>
            }}
        </CldUploadWidget>
    );
};
