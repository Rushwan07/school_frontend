import { Outlet } from "react-router-dom";
import Sidebar from "@/components/Sidebar";
import { Button } from "@/components/ui/button";

function Layout() {
    return (
        <section>
            <div className="min-h-screen max-w-screen overflow-x-hidden flex">
                <div className="sticky top-0   bg-secondary">
                    <Sidebar />
                </div>
                <div className="flex-1">
                    <header className=" px-5 py-2 shadow-md ">
                        <nav className="flex justify-between items-center">
                            <span className="font-bold text-xl">Little Bees</span>
                            <Button>Get start</Button>
                        </nav>
                    </header>
                    <div className="p-1 md:p-5">
                        <Outlet />
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Layout;
