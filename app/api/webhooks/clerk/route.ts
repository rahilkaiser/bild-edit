import {headers} from "next/headers";
import {Webhook} from "svix";
import {WebhookEvent} from "@clerk/backend";
import {createUser, deleteUser, updateUser} from "@/lib/actions/user.actions";
import {clerkClient} from "@clerk/nextjs/server";
import {NextResponse} from "next/server";

const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET!;

if (!WEBHOOK_SECRET) {
    throw new Error("WEBHOOK_SECRET env variable is not defined");
}

const SVIX_HEADERS = {
    ID: "svix-id",
    TIMESTAMP: "svix-timestamp",
    SIGNATURE: "svix-signature",
};

interface CreateUserParams {
    clerkId: string;
    email: string;
    username: string;
    firstName: string;
    lastName: string;
    photo: string;
}

/**
 * Retrieves and validates the necessary Svix headers from the incoming request.
 * @returns An object containing the svixId, svixTimestamp, and svixSignature headers.
 * @throws Will throw an error if any of the required Svix headers are missing.
 */
function getSvixHeaders() {
    const headerPayload = headers();
    const svixId = headerPayload.get(SVIX_HEADERS.ID);
    const svixTimestamp = headerPayload.get(SVIX_HEADERS.TIMESTAMP);
    const svixSignature = headerPayload.get(SVIX_HEADERS.SIGNATURE);

    if (!svixId || !svixTimestamp || !svixSignature) {
        throw new Error("Missing Svix headers");
    }

    return {svixId, svixTimestamp, svixSignature};
}

/**
 * Verifies the webhook's authenticity using the Svix library and the provided headers.
 * @param body The stringified body of the request.
 * @param headers An object containing the Svix headers.
 * @returns A verified WebhookEvent object.
 * @throws Will throw an error if the webhook verification fails.
 */
function verifyWebhook(body: string, headers: { svixId: string, svixTimestamp: string, svixSignature: string }) {
    const wh = new Webhook(WEBHOOK_SECRET);

    try {
        return wh.verify(body, {
            [SVIX_HEADERS.ID]: headers.svixId,
            [SVIX_HEADERS.TIMESTAMP]: headers.svixTimestamp,
            [SVIX_HEADERS.SIGNATURE]: headers.svixSignature,
        }) as WebhookEvent;
    } catch (error) {
        console.error("Error verifying webhook:", error);
        throw new Error("Error verifying webhook");
    }
}

/**
 * Handles the 'user.created' event from the webhook, creating a new user in the system.
 * @param event The verified WebhookEvent containing the user creation data.
 * @returns A JSON response indicating the user was successfully created.
 */
async function handleUserCreated(event: WebhookEvent) {
    const {id, email_addresses, image_url, first_name, last_name, username} = event.data;

    const user: CreateUserParams = {
        clerkId: id,
        email: email_addresses[0].email_address,
        username: username!,
        firstName: first_name,
        lastName: last_name,
        photo: image_url,
    } as CreateUserParams;

    const newUser = await createUser(user);

    if (newUser) {
        await clerkClient.users.updateUserMetadata(id!, {
            publicMetadata: {
                userId: newUser._id,
            },
        });
    }

    return NextResponse.json({message: "User created", user: newUser});
}

/**
 * Handles the 'user.updated' event from the webhook, updating an existing user's data.
 * @param event The verified WebhookEvent containing the updated user data.
 * @returns A JSON response indicating the user was successfully updated.
 */
async function handleUserUpdated(event: WebhookEvent) {
    const {id, image_url, first_name, last_name, username} = event.data;

    const user = {
        firstName: first_name,
        lastName: last_name,
        username: username!,
        photo: image_url,
    };

    const updatedUser = await updateUser(id!, user);
    return NextResponse.json({message: "User updated", user: updatedUser});
}


/**
 * Handles the 'user.deleted' event from the webhook, deleting an existing user from the system.
 * @param event The verified WebhookEvent containing the ID of the user to be deleted.
 * @returns A JSON response indicating the user was successfully deleted.
 */
async function handleUserDeleted(event: WebhookEvent) {
    const {id} = event.data;

    const deletedUser = await deleteUser(id!);
    return NextResponse.json({message: "User deleted", user: deletedUser});
}

/**
 * Validates the request, verifies the webhook, and dispatches the appropriate event handler.
 * @param req The incoming HTTP request object.
 * @returns A response indicating the result of the webhook processing.
 */
export async function POST(req: Request) {
    try {
        const svixHeaders = getSvixHeaders();
        const payload = await req.json();
        const body = JSON.stringify(payload);
        const event = verifyWebhook(body, svixHeaders);

        const eventTypeHandlers: { [key: string]: (event: WebhookEvent) => Promise<Response> } = {
            "user.created": handleUserCreated,
            "user.updated": handleUserUpdated,
            "user.deleted": handleUserDeleted,
        };

        if (eventTypeHandlers[event.type]) {
            return await eventTypeHandlers[event.type](event);
        } else {
            console.log(`Unhandled event type: ${event.type}`);
            return new Response("Unhandled event type", {status: 400});
        }
    } catch (error) {
        console.error("Unexpected error:", error);
        return new Response("Server error", {status: 500});
    }
}
