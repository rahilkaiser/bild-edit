"use client"
import Link from "next/link";
import {SignedIn, SignedOut, UserButton} from "@clerk/nextjs";
import {usePathname} from "next/navigation";
import {Button} from "@/components/ui/button";
import {dark} from "@clerk/themes";
import {Camera, Filter, Home, ImageIcon, Scan, ShoppingBag, Stars, User} from "lucide-react";


const navLinks = [
    {
        label: "Home",
        route: "/",
        icon: Home,
    },
    {
        label: "Image Restore",
        route: "/transformations/add/restore",
        icon: ImageIcon,
    },
    {
        label: "Generative Fill",
        route: "/transformations/add/fill",
        icon: Stars,
    },
    {
        label: "Object Remove",
        route: "/transformations/add/remove",
        icon: Scan,
    },
    {
        label: "Object Recolor",
        route: "/transformations/add/recolor",
        icon: Filter,
    },
    {
        label: "Background Remove",
        route: "/transformations/add/removeBackground",
        icon: Camera,
    },
    {
        label: "Profile",
        route: "/profile",
        icon: User,
    },
    {
        label: "Buy Credits",
        route: "/credits",
        icon: ShoppingBag,
    },
];


export const SideBar = () => {
    const pathname = usePathname()

    return (
        <aside
            className="fixed top-0 left-0 hidden h-screen  w-64 p-5 bg-gradient-to-b from-primary to-background shadow-md lg:flex flex-col items-center">
            <div className="flex flex-col gap-6 w-full h-full">
                {/* Logo or Title */}
                <div className="flex">
                    <div className="text-3xl font-bold text-white mb-8">
                        <Link href={"/"}><h3>Quick<span className="text-accent uppercase underline">Edit</span></h3>
                        </Link>
                    </div>
                </div>

                {/* Navigation Links */}
                <nav className="flex flex-col gap-4 w-full">

                    <SignedIn>
                        <ul className="flex flex-col gap-4 w-full">
                            {navLinks.slice(0, 6).map((link, i) => {
                                const isActive = link.route === pathname;

                                return (
                                    <li key={i}
                                        className={`flex items-center gap-3 ${isActive ? "text-accent" : "text-white"} text-lg hover:text-accent transition-colors duration-300 cursor-pointer`}>
                                        <Link className="flex gap-2" href={link.route}>
                                            <link.icon className="w-6 h-6"/>
                                            {link.label}
                                        </Link>
                                    </li>
                                )
                            })}

                        </ul>
                    </SignedIn>


                    <SignedOut>
                        <Button asChild className="bg-accent text-black hover:bg-accent/80 transition-colors duration-300">
                            <Link href={"/sign-in"}>Login</Link>
                        </Button>
                    </SignedOut>
                </nav>

                {/* Placeholder for more content */}
                <div className="mt-auto text-white text-sm">
                    Admin
                </div>

                <SignedIn>
                    <ul className="flex flex-col gap-4">
                        {navLinks.slice(6).map((link, i) => {
                            const isActive = link.route === pathname;

                            return (
                                <li key={i}
                                    className={`flex px-2 items-center gap-3 ${isActive ? "text-accent" : "text-white"} text-lg hover:text-accent transition-colors duration-300 cursor-pointer`}>
                                    <Link className="flex gap-2" href={link.route}>
                                        <link.icon className="w-6 h-6"/>
                                        {link.label}
                                    </Link>
                                </li>
                            )
                        })}
                        <li className="">
                            <UserButton showName appearance={{
                                baseTheme: dark,
                                variables: {
                                    fontSize: "1.1rem",
                                },
                                layout: {
                                    shimmer: false,
                                }
                            }}/>
                        </li>
                    </ul>
                </SignedIn>
            </div>
        </aside>
    );
};
