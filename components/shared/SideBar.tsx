"use client"
import Link from "next/link";
import {SignedIn, SignedOut, UserButton} from "@clerk/nextjs";
import {navLinks} from "@/constants";
import {usePathname} from "next/navigation";
import {Button} from "@/components/ui/button";
import {dark} from "@clerk/themes";


export const SideBar = () => {
    const pathname = usePathname()

    return (
        <aside
            className="hidden h-screen w-1/6 p-5 bg-gradient-to-b from-primary to-background shadow-md lg:flex flex-col items-center">
            <div className="flex flex-col gap-6 w-full h-full">
                {/* Logo or Title */}
                <div className="flex">
                    <div className="text-3xl font-bold text-white mb-8">
                        <Link href={"/"}><h3>Bilder<span className="text-accent uppercase underline">Edit</span></h3>
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
                        <Button asChild>
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
