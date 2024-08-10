"use server";

import {handleError} from "@/lib/utils";
import {connectToDatabase} from "@/lib/database/mongoose";
import {revalidatePath} from "next/cache";
import User from "@/lib/database/models/user.model";
import Image from "@/lib/database/models/image.model"
import {redirect} from "next/navigation";
import {AddImageParams, UpdateImageParams} from "@/types/image";


export async function addImage({image, userId, path}: AddImageParams) {
    try {
        await connectToDatabase();
        const author: any = await User.findById(userId); // Der User der sich gerade eingeloggt hat
        if (!author) throw new Error("User not found");

        const newImage = await Image.create({...image, author: author._id});

        revalidatePath((path));

        return JSON.parse(JSON.stringify(image));
    } catch (error) {
        handleError(error);
    }
}


export async function updateImage({image, userId, path}: UpdateImageParams) {
    try {
        await connectToDatabase();
        const imageToUpdate: any = await Image.findById(image._id);

        if (!imageToUpdate || imageToUpdate.author.toHexString() !== userId) {

            throw new Error("Unauthorized or Image not found");
        }

        const updatedImage = await Image.findByIdAndUpdate(imageToUpdate._id, image, {new: true});


        revalidatePath((path));

        return JSON.parse(JSON.stringify(updatedImage));
    } catch (error) {
        handleError(error);
    }
}

export async function deleteImage(imageId: string) {

    try {
        await connectToDatabase();
        await Image.findByIdAndDelete(imageId);

    } catch (error) {
        handleError(error);
    } finally {
        redirect("/")
    }
}

const populateUser = (query: any) => query.populate({
    path: 'author',
    model: User,
    select: '_id firstName lastName clerkId'
})

export async function getImageById(imageId: string) {

    try {
        await connectToDatabase();
        const image = await populateUser(Image.findById(imageId));
        if (!image) throw new Error("Image not found");

        return JSON.parse(JSON.stringify(image));
    } catch (error) {
        handleError(error);
    }
}