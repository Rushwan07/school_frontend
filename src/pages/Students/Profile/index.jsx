import React from "react";

import { Card } from "@/components/ui/card";
import { useSelector } from "react-redux";

const Profile = () => {
    const { user, token } = useSelector((state) => {
        const user = state?.user?.user;
        return user || {};
    });

    return (
        <div className="">
            <Card className="p-5">
                <h1 className="font-bold text-xl mb-4">Profile</h1>
                <div className="flex gap-10 flex-wrap ">
                    <div className="  ">
                        <img
                            src={user?.img}
                            alt="Preview"
                            className="mb-4 w-[250px] h-[250px] object-cover rounded-full hover:cursor-pointer"
                        />
                    </div>
                    <div className="  ">
                        <div className="flex gap-2 items-center mb-1">
                            <h1 className="text-[1.2rem] font-semibold">Name:</h1>
                            <h2>{user?.name}</h2>
                        </div>
                        <div className="flex gap-2 items-center mb-1">
                            <h1 className="text-[1.2rem] font-semibold">Class:</h1>
                            <h2>{user?.classId?.name}</h2>
                        </div>
                        {/* <div className="flex gap-2 items-center mb-1">
                            <h1 className="text-[1.2rem] font-semibold">Grade:</h1>
                            <h2>{teacher.name}</h2>
                        </div> */}
                        <div className="flex gap-2 items-center mb-1">
                            <h1 className="text-[1.2rem] font-semibold">Regno:</h1>
                            <h2>{user?.regno}</h2>
                        </div>
                        <div className="flex gap-2 items-center mb-1">
                            <h1 className="text-[1.2rem] font-semibold">Parent Name:</h1>
                            <h2>{user?.parentId?.name}</h2>
                        </div>
                        <div className="flex gap-2 items-center mb-1">
                            <h1 className="text-[1.2rem] font-semibold">Parent Phone:</h1>
                            <h2>{user?.parentId?.phone}</h2>
                        </div>
                    </div>
                    <div className=" ">
                        <div className="flex gap-2  mb-1">
                            <h1 className="text-[1.2rem] font-semibold">Address:</h1>
                            <h2>{user?.address} </h2>
                        </div>
                        <div className="flex gap-2 items-center mb-1">
                            <h1 className="text-[1.2rem] font-semibold">BloodType:</h1>
                            <h2>{user?.bloodType}</h2>
                        </div>
                        <div className="flex gap-2  mb-1">
                            <h1 className="text-[1.2rem] font-semibold">Birthday:</h1>
                            <h2>{user?.birthday?.split("T")[0]}</h2>
                        </div>
                        <div className="flex gap-2 items-center mb-1">
                            <h1 className="text-[1.2rem] font-semibold">Gender:</h1>
                            <h2>{user?.sex}</h2>
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default Profile;
