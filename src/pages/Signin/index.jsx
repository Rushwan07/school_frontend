import React from "react";

import { Button } from "@/components/ui/button";
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
    const handleSubmit = () => {
        console.log("handle submit called");
        navigate("/");
    };
    return (
        <div className="bg-background flex-col w-screen h-screen flex justify-center items-center">
            <h1 className="text-2xl font-bold mb-10 text-center">Little Bees Management System</h1>
            <Card className="sm:w-[350px]">
                <CardHeader>
                    <CardTitle>Welcome Back!</CardTitle>
                    <CardDescription>Please sign in to continue</CardDescription>
                </CardHeader>
                <CardContent>
                    <form>
                        <div className="grid w-full items-center gap-4">
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="email">Email Address / Registration Number</Label>
                                <Input id="email" placeholder="Enter your email or reg number" />
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
                    </form>
                </CardContent>
                <CardFooter className="flex">
                    <Button className="w-full" onClick={handleSubmit}>
                        Sign In
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
};

export default Signin;
