import {IImage} from "@/lib/database/models/image.model";
import Link from "next/link";
import {CldImage} from "next-cloudinary";
import React from "react";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";

export function ImageCard({image}: { image: IImage }) {
    return (
        <div className="w-full ">
            <Link href={`/transformations/${image._id}`}>
                <Card className="w-full ">
                    <CardHeader>
                        <CardTitle>{image.title}</CardTitle>
                        <CardDescription className="text-accent font-semibold">{image.transformationType}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <CldImage
                            src={image.publicId}
                            alt={image.title}
                            width={image.width}
                            height={image.height}
                            {...image.config}
                            loading="lazy"
                            className="w-full h-full rounded-[10px] object-cover"
                            sizes="(max-width: 767px) 100vw, (max-width: 1279px) 50vw, 33vw"
                        />
                    </CardContent>
                    <CardFooter>
                        <p>
                            <span
                                className="font-semibold">Created at:</span><br/> {image.createdAt && new Date(image.createdAt).toLocaleDateString('de', {
                            year: 'numeric',
                            month: 'long',
                            day: '2-digit'
                        })}
                        </p>
                    </CardFooter>
                </Card>
            </Link>
        </div>
    );
}