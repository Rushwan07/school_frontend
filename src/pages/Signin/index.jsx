import React, { useState } from "react";

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { useDispatch } from "react-redux";
import { setUser } from "@/features/Auth/userSlice";
import { useToast } from "@/hooks/use-toast";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const Signin = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [regNo, setRegNo] = useState("");

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { toast } = useToast();

    const handleStaffSignin = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(
                BASE_URL + "/users/signin",
                { username, password },
                {
                    withCredentials: true,
                },
            );

            const { admin, teacher } = res?.data?.data;
            if (admin) {
                dispatch(setUser(admin));
            } else if (teacher) {
                dispatch(setUser(teacher));
            }

            navigate("/");
        } catch (error) {
            toast({
                variant: "destructive",
                title: error?.response?.data?.message,
            });
            console.log(error);
        }
    };
    const handleStudentSignin = async () => {
        try {
            const res = await axios.post(
                BASE_URL + "/users/signin",
                { regNo },
                {
                    withCredentials: true,
                },
            );

            const student = res?.data?.data?.student;
            dispatch(setUser(student));

            navigate("/");
        } catch (error) {
            console.error("Error signing in", error);
            toast({
                variant: "destructive",
                title: error?.response?.data?.message,
            });
        }
    };

    return (
        <div className=" flex-col w-screen h-screen flex justify-center items-center">
            <h1 className="text-2xl font-bold mb-10 text-center">Little Bees Management System</h1>
            <Card>
                <Tabs defaultValue="student" className="w-[400px] p-2">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="student">Student</TabsTrigger>
                        <TabsTrigger value="staff">Staff</TabsTrigger>
                    </TabsList>
                    <CardHeader className="text-center  pb-2">
                        <CardTitle>Welcome Back!</CardTitle>
                        <CardDescription>Please sign in to continue</CardDescription>
                    </CardHeader>
                    <TabsContent value="student">
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="regno">Register Number </Label>
                            <Input
                                type="text"
                                id="regno"
                                placeholder="Enter your regno"
                                value={regNo}
                                onChange={(e) => setRegNo(e.target.value)}
                            />
                        </div>

                        <Button className="w-full mt-5" onClick={handleStudentSignin}>
                            {" "}
                            Get In
                        </Button>
                    </TabsContent>
                    <TabsContent value="staff">
                        <form>
                            <div className="grid w-full items-center gap-4">
                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="username">User name </Label>
                                    <Input
                                        id="username"
                                        placeholder="Enter your username"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                    />
                                </div>
                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="password">Password</Label>
                                    <Input
                                        id="password"
                                        type="password"
                                        placeholder="Enter your password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                            </div>

                            <Button className="w-full mt-5" onClick={handleStaffSignin}>
                                {" "}
                                Sign In
                            </Button>
                        </form>
                    </TabsContent>
                </Tabs>
            </Card>
        </div>
    );
};

export default Signin;
