"use client"
import {useToast} from "@/components/ui/use-toast";
import {useEffect} from "react";
import {loadStripe} from "@stripe/stripe-js";
import {checkoutCredits} from "@/lib/actions/transaction.action";
import {Button} from "@/components/ui/button";

export const Checkout = (
    {
        plan,
        amount,
        credits,
        buyerId,
    }: {
        plan: string;
        amount: number;
        credits: number;
        buyerId: string;
    }) => {

    const {toast} = useToast();

    useEffect(() => {
        loadStripe(process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY!);
    }, [])

    useEffect(() => {
        const query = new URLSearchParams(window.location.search);
        if (query.get("success")) {
            toast({
                title: "Order placed!",
                description: "You will receive an email confirmation",
                duration: 5000,
                className: "success-toast",
            });
        }

        if (query.get("canceled")) {
            toast({
                title: "Order canceled!",
                description: "Continue to shop around and checkout when you're ready",
                duration: 5000,
                className: "error-toast",
            });
        }
    }, []);


    const onCheckout = async () => {
        const transaction = {
            plan,
            amount,
            credits,
            buyerId,
        };

        await checkoutCredits(transaction);
    };


    return (
        <form action={onCheckout} method="POST">
            <section>
                <Button
                    type="submit"
                    role="link"
                    variant="outline"
                >
                    Buy Credit
                </Button>
            </section>
        </form>
    );
};
