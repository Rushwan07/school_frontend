import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "@/components/StaffSidebar";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { setUser } from "@/features/Auth/userSlice";
import { useDispatch, useSelector } from "react-redux";

function Layout() {
    const navigate = useNavigate(); // Call useNavigate at the top level
    const dispatch = useDispatch(); // Call useDispatch at the top level

    const { user } = useSelector((state) => {
        return state?.user?.user || {};
    });

    const handleSignOut = async () => {
        try {
            // Perform sign-out operations here, if needed
            dispatch(setUser({})); // Use dispatch here instead of useDispatch
            navigate("/"); // Use navigate to redirect
            toast({
                variant: "destructive",
                title: "Logout Successfully",
            });
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <section>
            <div className="min-h-screen max-w-screen overflow-x-hidden flex">
                <div className="sticky top-0    bg-secondary">
                    <Sidebar />
                </div>
                <div className="flex-1">
                    <header className=" px-5 py-2 shadow-md ">
                        <nav className="flex justify-between items-center">
                            <span className="font-bold text-xl">Little Bees</span>
                            {user?.role && <Button onClick={handleSignOut}>Logout</Button>}
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
