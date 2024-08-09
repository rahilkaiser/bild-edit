import {SideBar} from "@/components/shared/SideBar";
import {MobileNav} from "@/components/shared/MobileNav";

export default function Layout({children}: { children: React.ReactNode }) {
    return (
        <main className="flex lg:flex-row flex-col">
            <SideBar/>
            <MobileNav/>

            <div className="lg:ml-64 overflow-y-auto flex-1 container mx-auto py-4">{children}</div>
        </main>

    );
};
