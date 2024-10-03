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
        <Card>
            <CardHeader>
                <CardTitle>Profile</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex gap-4 flex-wrap">
                    <div className="w-[250px] h-[250px]">
                        <img
                            src="https://images.pexels.com/photos/16094046/pexels-photo-16094046/free-photo-of-man-using-chatgpt.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                            alt="Preview"
                            className="mb-4 w-full h-full object-cover rounded-full"
                        />
                    </div>
                    <div className="">
                        <div className="flex items-center gap-5">
                            <h1 className="text-2xl font-semibold">{teacher.username}</h1>
                            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                                <DialogTrigger asChild>
                                    <Button>Edit</Button>
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>Edit Profile</DialogTitle>
                                    </DialogHeader>
                                    <form onSubmit={handleSubmit}>
                                        <Input
                                            label="Username"
                                            name="username"
                                            value={teacher.username}
                                            onChange={handleChange}
                                            required
                                            className="mb-3"
                                        />
                                        <Input
                                            label="Name"
                                            name="name"
                                            value={teacher.name}
                                            onChange={handleChange}
                                            required
                                            className="mb-3"
                                        />
                                        <Input
                                            label="Email"
                                            name="email"
                                            value={teacher.email}
                                            onChange={handleChange}
                                            className="mb-3"
                                        />
                                        <Input
                                            label="Phone"
                                            name="phone"
                                            value={teacher.phone}
                                            onChange={handleChange}
                                            className="mb-3"
                                        />
                                        <Textarea
                                            label="Address"
                                            name="address"
                                            value={teacher.address}
                                            onChange={handleChange}
                                            className="mb-3"
                                            required
                                        />
                                        <Input
                                            label="Blood Type"
                                            name="bloodType"
                                            value={teacher.bloodType}
                                            onChange={handleChange}
                                            className="mb-3"
                                        />
                                        <Select
                                            label="Sex"
                                            value={teacher.sex}
                                            onValueChange={(value) =>
                                                setTeacher((prev) => ({ ...prev, sex: value }))
                                            }
                                            className="mb-3"
                                        >
                                            <SelectTrigger className="mb-3">
                                                <SelectValue placeholder="Select sex" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="MALE">Male</SelectItem>
                                                <SelectItem value="FEMALE">Female</SelectItem>
                                            </SelectContent>
                                        </Select>

                                        <Input
                                            label="Birthday"
                                            type="date"
                                            name="birthday"
                                            value={teacher.birthday}
                                            onChange={handleChange}
                                            required
                                            className="mb-3"
                                        />
                                        <DialogFooter>
                                            <Button type="submit">Update Profile</Button>
                                        </DialogFooter>
                                    </form>
                                </DialogContent>
                            </Dialog>
                        </div>
                        <div className="flex gap-3 flex-wrap justify-center">
                            <div className="w-[400px] mt-5">
                                <div className="flex gap-2 items-center mb-1">
                                    <h1 className="text-[1.2rem] font-semibold">Name:</h1>
                                    <h2>{teacher.name}</h2>
                                </div>
                                <div className="flex gap-2 items-center mb-1">
                                    <h1 className="text-[1.2rem] font-semibold">Email:</h1>
                                    <h2>{teacher.email}</h2>
                                </div>
                                <div className="flex gap-2 items-center mb-1">
                                    <h1 className="text-[1.2rem] font-semibold">Phone:</h1>
                                    <h2>{teacher.phone}</h2>
                                </div>
                                <div className="flex gap-2  mb-1">
                                    <h1 className="text-[1.2rem] font-semibold">Address:</h1>
                                    <h2>
                                    {teacher.address}                                    </h2>
                                </div>
                                <div className="flex gap-2 items-center mb-1">
                                    <h1 className="text-[1.2rem] font-semibold">BloodType:</h1>
                                    <h2>{teacher.bloodType}</h2>
                                </div>
                            </div>
                            <div className="w-[400px] mt-5">
                                <div className="flex gap-2  mb-1">
                                    <h1 className="text-[1.2rem] font-semibold">Birthday:</h1>
                                    <h2>{teacher.birthday}</h2>
                                </div>
                                <div className="flex gap-2 items-center mb-1">
                                    <h1 className="text-[1.2rem] font-semibold">Gender:</h1>
                                    <h2>{teacher.sex}</h2>
                                </div>
                                <div className="flex gap-2 items-center mb-1">
                                    <h1 className="text-[1.2rem] font-semibold">Subjects:</h1>
                                    <h2>Maths, Science, Physics</h2>
                                </div>
                                <div className="flex gap-2 items-center mb-1">
                                    <h1 className="text-[1.2rem] font-semibold">Classes:</h1>
                                    <h2>9th</h2>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default Profile;
