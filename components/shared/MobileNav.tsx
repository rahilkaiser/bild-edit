"use client"
import Link from "next/link";
import {SignedIn, SignedOut, UserButton} from "@clerk/nextjs";
import {dark} from "@clerk/themes";
import {
    Sheet, SheetClose,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger
} from "@/components/ui/sheet";
import {Button} from "@/components/ui/button";
import {Camera, Filter, Home, ImageIcon, MenuIcon, Scan, ShoppingBag, Stars, User} from "lucide-react";
import {usePathname} from "next/navigation";

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


export const MobileNav = () => {
    const pathname = usePathname()

    return (
        <header className="lg:hidden sticky top-0 bg-background z-40 backdrop-blur">
            <nav className="flex gap-2 justify-between p-4 items-center opacity-100">
                <SignedIn><UserButton appearance={{
                    baseTheme: dark,
                    variables: {
                        fontSize: "1.1rem",
                    },
                    elements: {
                        userButtonAvatarBox: "w-12 h-12",
                    }
                }}/></SignedIn>
                <div className="flex ">
                    <div className="text-3xl font-bold text-white ">
                        <Link href={"/"}><h3>Quick<span className="text-accent uppercase">Edit</span></h3>
                        </Link>
                    </div>
                </div>
                <SignedIn>
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="ghost" className="hover:text-accent hover:bg-transparent">
                                <MenuIcon/>
                            </Button>
                        </SheetTrigger>
                        <SheetContent>
                            <SheetHeader className="py-16">
                                <SheetTitle>
                                    <div className="flex justify-center items-center gap-4">
                                        <div className="text-3xl font-bold text-white ">
                                            <Link href={"/"}><h3>Quick<span
                                                className="text-accent uppercase">Edit</span></h3>
                                            </Link>
                                        </div>
                                    </div>
                                </SheetTitle>
                                <SheetDescription className="flex justify-center items-center ">
                                    Better than Photoshop
                                </SheetDescription>
                            </SheetHeader>
                            <ul className="flex flex-col gap-4 w-full">
                                {navLinks.map((link, i) => {
                                    const isActive = link.route === pathname;

                                    return (
                                        <li key={i}
                                            className={`flex items-center gap-3 ${isActive ? "text-accent" : "text-white"} text-sm hover:text-accent transition-colors duration-300 cursor-pointer`}>
                                            <SheetClose asChild>

                                                <Link className="flex gap-2" href={link.route}>
                                                    <link.icon className="w-4 h-4"/>
                                                    {link.label}
                                                </Link>
                                            </SheetClose>
                                        </li>
                                    )
                                })}
                            </ul>

                        </SheetContent>
                    </Sheet>
                </SignedIn>

                <SignedOut>
                    <Button variant="outline" className="transition-colors duration-300">
                        <Link href={"/sign-in"}>Login</Link>
                    </Button>
                </SignedOut>


            </nav>
        </header>
    );
};
