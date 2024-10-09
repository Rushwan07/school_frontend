import { Button } from "@/components/ui/button";
import React from "react";
import Banner from "@/assets/home-banner.webp";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Home = () => {
    const user = useSelector((state) => state.user.user);

    const navigate = useNavigate();

    const handleNavigate = () => {
        if (user?.role == "admin") {
            navigate("/admin/dashboard");
        }
        if (user?.role == "student") {
            navigate("/student/profile");
        }
        if (user.role == "teacher") {
            navigate("/staffs/profile");
        }
    };

    return (
        <section>
            <header className=" px-5 py-2 shadow-md ">
                <nav className="flex justify-between items-center">
                    <span className="font-bold text-xl">Little Bees</span>
                    <Button onClick={handleNavigate}> Get Started</Button>
                </nav>
            </header>
            <div className="h-[90vh]   flex justify-center items-center gap-20">
                <div>
                    <h1 className="text-3xl font-bold">
                        Streamline <br />
                        Child care &
                    </h1>

                    <p className="text-xl">Efficiently manage daycare operations </p>
                    <br />
                    <Button className="px-5" onClick={handleNavigate}>
                        Get Started
                    </Button>
                </div>
                <div className="w-[40vw] rounded-md overflow-hidden relative custom-shadow ">
                    <img src={Banner} className="object-cover " />
                </div>
            </div>
        </section>
    );
};

export default Home;
