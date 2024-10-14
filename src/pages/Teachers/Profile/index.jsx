import React, { useEffect, useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
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
import useFirebaseUpload from "@/hooks/use-firebaseUploads";
import { useSelector } from "react-redux";
import axios from "axios";
import { toast } from "@/hooks/use-toast";
const BASE_URL = import.meta.env.VITE_BASE_URL;

const Profile = () => {
    const { user, token } = useSelector((state) => {
        const user = state?.user?.user;
        return user || {};
    });
    const [image, setImage] = useState(null);
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);

    const [teacher, setProfile] = useState([]);

    const [isOpen, setIsOpen] = useState(false);
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFile(file);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfile((prev) => ({ ...prev, [name]: value }));
    };

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     alert("Profile updated locally!");
    //     setIsOpen(false);
    // };

    const { progress, error, downloadURL } = useFirebaseUpload(file);
    useEffect(() => {
        if (downloadURL) {
            setImage(downloadURL);
            setProfile((prevProfile) => ({
                ...prevProfile,
                img: downloadURL,
            }));
        }
    }, [downloadURL]);

    const handleSubmit = async () => {
        // setLoading(true);
        try {
            const res = await axios.put(BASE_URL + "/teachers/" + user?._id, teacher, {
                withCredentials: true,
            });

            setProfile((prev) =>
                prev.map((assignment) =>
                    assignment._id === user?._id ? { ...assignment, ...teacher } : assignment,
                ),
            );

            setIsOpen(false);
        } catch (error) {
            console.error("An error occurred:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const getClass = async () => {
            try {
                console.log("working fine");
                const res = await axios.get(BASE_URL + `/teachers/${user._id}`, {
                    headers: { token: token },
                });

                setProfile(res?.data?.data?.teacher);
            } catch (error) {
                console.log(error);
                if (error?.response?.data?.message)
                    toast({
                        variant: "destructive",
                        title: error?.response?.data?.message,
                    });
                else {
                    toast({
                        variant: "destructive",
                        title: "Uh oh! Something went wrong.",
                        description: "There was a problem with your request.",
                    });
                }
            } finally {
                setLoading(false);
            }
        };
        getClass();
    }, []);
    console.log("USer", teacher);
    return (
        <Card>
            <CardHeader>
                <div className="flex justify-between items-center flex-wrap">
                    <h1 className="font-bold text-xl ">Profile</h1>
                    <div className="flex items-center gap-5">
                        <h1 className="text-2xl font-semibold">{teacher?.username}</h1>
                        <Dialog open={isOpen} onOpenChange={setIsOpen}>
                            <DialogTrigger asChild>
                                <Button>Edit</Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Edit Profile</DialogTitle>
                                </DialogHeader>
                                <form onSubmit={handleSubmit}>
                                    {progress > 0 && progress !== 100 && (
                                        <p>Upload progress: {progress}%</p>
                                    )}
                                    <>
                                        <Input
                                            label="Profile"
                                            name="profile"
                                            type="file"
                                            onChange={handleImageChange}
                                            className="mb-3"
                                        />
                                    </>

                                    <div className="flex justify-center items-center mb-3">
                                        <img
                                            src={teacher?.img}
                                            alt="Selected"
                                            className="w-[100px] h-[100px] object-cover rounded-full"
                                        />
                                    </div>
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
                                        value={teacher?.bloodType}
                                        onChange={handleChange}
                                        className="mb-3"
                                    />
                                    <Select
                                        label="Sex"
                                        value={teacher.sex}
                                        onValueChange={(value) =>
                                            setProfile((prev) => ({ ...prev, sex: value }))
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
                                        value={teacher?.birthday}
                                        onChange={handleChange}
                                        className="mb-3"
                                    />
                                    <DialogFooter>
                                        <Button type="submit">Update Profile</Button>
                                    </DialogFooter>
                                </form>
                            </DialogContent>
                        </Dialog>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <div className="flex gap-10 flex-wrap">
                    <div className="w-[250px] h-[250px]">
                        <img
                            src={teacher?.img}
                            alt="Preview"
                            className="mb-4 w-full h-full object-cover rounded-full hover:cursor-pointer"
                        />
                    </div>

                    <div className=" mt-5">
                        <div className="flex gap-2 items-center mb-1">
                            <h1 className="text-[1.2rem] font-semibold">Name:</h1>
                            <h2>{teacher?.name}</h2>
                        </div>
                        <div className="flex gap-2 items-center mb-1">
                            <h1 className="text-[1.2rem] font-semibold">Email:</h1>
                            <h2>{teacher?.email}</h2>
                        </div>
                        <div className="flex gap-2 items-center mb-1">
                            <h1 className="text-[1.2rem] font-semibold">Phone:</h1>
                            <h2>{teacher?.phone}</h2>
                        </div>
                        <div className="flex gap-2  mb-1">
                            <h1 className="text-[1.2rem] font-semibold">Address:</h1>
                            <h2>{teacher?.address} </h2>
                        </div>
                        <div className="flex gap-2 items-center mb-1">
                            <h1 className="text-[1.2rem] font-semibold">BloodType:</h1>
                            <h2>{teacher?.bloodType}</h2>
                        </div>
                    </div>
                    <div className=" mt-5">
                        <div className="flex gap-2  mb-1">
                            <h1 className="text-[1.2rem] font-semibold">Birthday:</h1>
                            <h2>{teacher?.birthday}</h2>
                        </div>
                        <div className="flex gap-2 items-center mb-1">
                            <h1 className="text-[1.2rem] font-semibold">Gender:</h1>
                            <h2>{teacher?.sex}</h2>
                        </div>
                        <div className="flex gap-2 items-center mb-1">
                            <h1 className="text-[1.2rem] font-semibold">Subjects:</h1>
                            <h2>{teacher?.subjects?.join()}</h2>
                        </div>
                        <div className="flex gap-2 items-center mb-1">
                            <h1 className="text-[1.2rem] font-semibold">Classes:</h1>
                            <h2>
                                {teacher?.classes?.map((classItem) => classItem.name).join(", ")}
                            </h2>
                        </div>
                    </div>
                    <div className="">
                        {/* <div className="flex gap-3 flex-wrap justify-center">
                            
                        </div> */}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default Profile;
