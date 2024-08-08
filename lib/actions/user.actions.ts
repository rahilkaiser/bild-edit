"use server";

import { revalidatePath } from "next/cache";
import User from "../database/models/user.model";
import { connectToDatabase } from "../database/mongoose";
import { handleError } from "../utils";

/**
 * Creates a new user in the database.
 *
 * @param user - The user details required to create a new user.
 * @returns The newly created user object.
 * @throws Will throw an error if user creation fails.
 */
export async function createUser(user: CreateUserParams) {
    try {
        await connectToDatabase();
        const newUser = await User.create(user);
        return JSON.parse(JSON.stringify(newUser));
    } catch (error) {
        handleError(error);
    }
}

/**
 * Retrieves a user by their clerk ID from the database.
 *
 * @param userId - The clerk ID of the user to retrieve.
 * @returns The user object if found.
 * @throws Will throw an error if the user is not found or if there is a database error.
 */
export async function getUserById(userId: string) {
    try {
        await connectToDatabase();
        const user = await User.findOne({ clerkId: userId });
        if (!user) throw new Error("User not found");
        return JSON.parse(JSON.stringify(user));
    } catch (error) {
        handleError(error);
    }
}

/**
 * Updates a user's information in the database.
 *
 * @param clerkId - The clerk ID of the user to update.
 * @param user - The updated user details.
 * @returns The updated user object.
 * @throws Will throw an error if the update fails or if the user is not found.
 */
export async function updateUser(clerkId: string, user: UpdateUserParams) {
    try {
        await connectToDatabase();
        const updatedUser = await User.findOneAndUpdate({ clerkId }, user, {
            new: true,
        });
        if (!updatedUser) throw new Error("User update failed");
        return JSON.parse(JSON.stringify(updatedUser));
    } catch (error) {
        handleError(error);
    }
}

/**
 * Deletes a user from the database by their clerk ID.
 *
 * @param clerkId - The clerk ID of the user to delete.
 * @returns The deleted user object, or null if the user was not found.
 * @throws Will throw an error if the user is not found or if the deletion fails.
 */
export async function deleteUser(clerkId: string) {
    try {
        await connectToDatabase();
        const userToDelete:any = await User.findOne({ clerkId });
        if (!userToDelete) {
            throw new Error("User not found");
        }
        const deletedUser = await User.findByIdAndDelete(userToDelete._id);
        revalidatePath("/");
        return deletedUser ? JSON.parse(JSON.stringify(deletedUser)) : null;
    } catch (error) {
        handleError(error);
    }
}

/**
 * Updates a user's credit balance in the database.
 *
 * @param userId - The ID of the user whose credits are being updated.
 * @param creditFee - The amount by which to adjust the user's credit balance.
 * @returns The updated user object with the new credit balance.
 * @throws Will throw an error if the update fails or if the user is not found.
 */
export async function updateCredits(userId: string, creditFee: number) {
    try {
        await connectToDatabase();
        const updatedUserCredits = await User.findOneAndUpdate(
            { _id: userId },
            { $inc: { creditBalance: creditFee }},
            { new: true }
        );
        if (!updatedUserCredits) throw new Error("User credits update failed");
        return JSON.parse(JSON.stringify(updatedUserCredits));
    } catch (error) {
        handleError(error);
    }
}
