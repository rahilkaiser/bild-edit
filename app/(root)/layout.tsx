import {SideBar} from "@/components/shared/SideBar";
import {MobileNav} from "@/components/shared/MobileNav";

export default function Layout({children}: { children: React.ReactNode }) {
    return (
        <main className="root">
            <SideBar/>
            <MobileNav/>


            {/*<div className="container mx-auto">*/}
            {/*    <div className="wrapper">*/}
            {/*        {children}*/}
            {/*    </div>*/}
            {/*</div>*/}
        </main>
    );
};
