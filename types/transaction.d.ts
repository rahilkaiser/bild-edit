/**
 * Parameters required to initiate a checkout transaction.
 *
 * @property {string} plan - The plan being purchased.
 * @property {number} credits - The number of credits involved in the transaction.
 * @property {number} amount - The amount of money involved in the transaction.
 * @property {string} buyerId - The ID of the user making the purchase.
 */
declare type CheckoutTransactionParams = {
    plan: string;
    credits: number;
    amount: number;
    buyerId: string;
};

/**
 * Parameters required to create a transaction record.
 *
 * @property {string} stripeId - The Stripe ID associated with the transaction.
 * @property {number} amount - The amount of money involved in the transaction.
 * @property {number} credits - The number of credits involved in the transaction.
 * @property {string} plan - The plan associated with the transaction.
 * @property {string} buyerId - The ID of the user making the purchase.
 * @property {Date} createdAt - The date the transaction was created.
 */
declare type CreateTransactionParams = {
    stripeId: string;
    amount: number;
    credits: number;
    plan: string;
    buyerId: string;
    createdAt: Date;
};