import React, { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const Profile = () => {
    const [teacher, setTeacher] = useState({
        profile:
            "https://images.pexels.com/photos/16094046/pexels-photo-16094046/free-photo-of-man-using-chatgpt.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        username: "teacher123",
        name: "John Doe",
        email: "johndoe@example.com",
        phone: "123-456-7890",
        address: "123 Main St, Anytown, USA",
        bloodType: "O+",
        sex: "MALE",
        birthday: "1980-01-01",
    });

    const [isOpen, setIsOpen] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTeacher((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert("Profile updated locally!");
        setIsOpen(false); // Close the dialog
    };

    return (
        <div className="">
            <Card className="p-5">
                <h1 className="font-bold text-xl mb-4">Profile</h1>
                <div className="flex gap-10 flex-wrap ">
                    <div className="  ">
                        <img
                            src={teacher.profile}
                            alt="Preview"
                            className="mb-4 w-[250px] h-[250px] object-cover rounded-full hover:cursor-pointer"
                        />
                    </div>
                    <div className="  ">
                        <div className="flex gap-2 items-center mb-1">
                            <h1 className="text-[1.2rem] font-semibold">Name:</h1>
                            <h2>{teacher.name}</h2>
                        </div>
                        <div className="flex gap-2 items-center mb-1">
                            <h1 className="text-[1.2rem] font-semibold">Class:</h1>
                            <h2>{teacher.name}</h2>
                        </div>
                        <div className="flex gap-2 items-center mb-1">
                            <h1 className="text-[1.2rem] font-semibold">Grade:</h1>
                            <h2>{teacher.name}</h2>
                        </div>
                        <div className="flex gap-2 items-center mb-1">
                            <h1 className="text-[1.2rem] font-semibold">Regno:</h1>
                            <h2>{teacher.email}</h2>
                        </div>
                        <div className="flex gap-2 items-center mb-1">
                            <h1 className="text-[1.2rem] font-semibold">Parent Name:</h1>
                            <h2>{teacher.phone}</h2>
                        </div>
                        <div className="flex gap-2 items-center mb-1">
                            <h1 className="text-[1.2rem] font-semibold">Parent Phone:</h1>
                            <h2>{teacher.phone}</h2>
                        </div>
                    </div>
                    <div className=" ">
                        <div className="flex gap-2  mb-1">
                            <h1 className="text-[1.2rem] font-semibold">Address:</h1>
                            <h2>{teacher.address} </h2>
                        </div>
                        <div className="flex gap-2 items-center mb-1">
                            <h1 className="text-[1.2rem] font-semibold">BloodType:</h1>
                            <h2>{teacher.bloodType}</h2>
                        </div>
                        <div className="flex gap-2  mb-1">
                            <h1 className="text-[1.2rem] font-semibold">Birthday:</h1>
                            <h2>{teacher.birthday}</h2>
                        </div>
                        <div className="flex gap-2 items-center mb-1">
                            <h1 className="text-[1.2rem] font-semibold">Gender:</h1>
                            <h2>{teacher.sex}</h2>
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default Profile;
