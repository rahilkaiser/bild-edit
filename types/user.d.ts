
/**
 * Parameters required to create a new user.
 *
 * @property {string} clerkId - The unique identifier for the user from Clerk.
 * @property {string} email - The email address of the user.
 * @property {string} username - The chosen username for the user.
 * @property {string} firstName - The first name of the user.
 * @property {string} lastName - The last name of the user.
 * @property {string} photo - The URL of the user's profile photo.
 */
declare type CreateUserParams = {
    clerkId: string;
    email: string;
    username: string;
    firstName: string;
    lastName: string;
    photo: string;
};

/**
 * Parameters for updating an existing user's information.
 *
 * @property {string} firstName - The updated first name of the user.
 * @property {string} lastName - The updated last name of the user.
 * @property {string} username - The updated username for the user.
 * @property {string} photo - The updated URL of the user's profile photo.
 */
declare type UpdateUserParams = {
    firstName: string;
    lastName: string;
    username: string;
    photo: string;
};