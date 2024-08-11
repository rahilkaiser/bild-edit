"use client"
import {IImage} from "@/lib/database/models/image.model";
import React from "react";
import {useRouter, useSearchParams} from "next/navigation";
import {formUrlQuery} from "@/lib/utils";
import {ImageCard} from "@/components/shared/ImageCard";

import {Pagination, PaginationContent, PaginationNext, PaginationPrevious} from "@/components/ui/pagination";
import {Button} from "@/components/ui/button";

const ImageListView = (
    {
        images,
        totalPages,
        page,
    }: {
        images: IImage[];
        totalPages: number;
        page: number;
    }) => {

    const router = useRouter();
    const searchParams = useSearchParams();

    const onPageChange = (action: string) => {
        const pageValue = action === "next" ? Number(page) + 1 : Number(page) - 1;
        const newUrl = formUrlQuery(searchParams.toString(), "page", pageValue);

        router.push(newUrl, {scroll: false});
    };

    return (
        <div className="flex flex-col">
            <div className="order-2 py-8">
                <h3>Recent Edits</h3>
            </div>
            {images.length > 0 ? (
                <div className="order-3 columns-1 lg:columns-3 xl:columns-4 gap-3 w-full space-y-3 pb-28 ">
                    {images.map((image) => (
                        <div className="break-inside-avoid" key={image._id}>
                            <ImageCard image={image}/>
                        </div>
                    ))}
                </div>


            ) : (
                <div className="order-3 flex justify-center items-center ">
                    <p className="p-20 font-semibold">Empty List</p>
                </div>
            )}

            {totalPages > 0 && (
                <Pagination className="my-10 order-1 lg:order-4">
                    <PaginationContent className="flex w-full">
                        <Button
                            disabled={Number(page) <= 1}
                            onClick={() => onPageChange("prev")}
                        >
                            <PaginationPrevious className="hover:bg-transparent hover:text-white"/>
                        </Button>

                        <p className="flex justify-center items-center flex-1">
                            {page} / {totalPages}
                        </p>

                        <Button
                            className="button w-32  text-white"
                            onClick={() => onPageChange("next")}
                            disabled={Number(page) >= totalPages}
                        >
                            <PaginationNext className="hover:bg-transparent hover:text-white"/>
                        </Button>
                    </PaginationContent>
                </Pagination>
            )}
        </div>
    );
};

export default ImageListView;
