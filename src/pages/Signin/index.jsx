import React from "react";

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";

const Signin = () => {
    const navigate = useNavigate();
    const handleStaffSignin = () => {
        console.log("handle submit called");
        navigate("/");
    };
    const handleStudentSignin = () => {
        console.log("handle submit called");
        navigate("/");
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
                            <Input type="text" id="regno" placeholder="Enter your regno" />
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
                                    <Label htmlFor="email">Email Address </Label>
                                    <Input id="email" placeholder="Enter your email  " />
                                </div>
                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="password">Password</Label>
                                    <Input
                                        id="password"
                                        type="password"
                                        placeholder="Enter your password"
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
