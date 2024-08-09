"use client"
import Link from "next/link";
import {SignedIn, SignedOut, UserButton} from "@clerk/nextjs";
import {dark} from "@clerk/themes";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger
} from "@/components/ui/sheet";
import {Button} from "@/components/ui/button";
import {MenuIcon} from "lucide-react";
import {navLinks} from "@/constants";
import {usePathname} from "next/navigation";

export const MobileNav = () => {
    const pathname = usePathname()

    return (
        <header className="lg:hidden">
            <nav className="flex gap-2 justify-between p-4 items-center">
                <SignedIn><UserButton appearance={{
                    baseTheme: dark,
                    variables: {
                        fontSize: "1.1rem",
                    },
                    elements: {
                        userButtonAvatarBox: "w-12 h-12",
                    }
                }}/></SignedIn>
                <div className="flex">
                    <div className="text-3xl font-bold text-white ">
                        <Link href={"/"}><h3>Bilder<span className="text-accent uppercase">Edit</span></h3>
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
                                            <Link href={"/"}><h3>Bilder<span
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
                                            <Link className="flex gap-2" href={link.route}>
                                                <link.icon className="w-4 h-4"/>
                                                {link.label}
                                            </Link>
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
