import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const ParentForm = ({parentData, setParentData}) => {
   

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setParentData((prev) => ({ ...prev, [name]: value }));
    };

    return (
        <div className="mt-6">
            <h3 className="text-lg font-semibold">Parent Details</h3>
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <Label>Parent Name</Label>
                    <Input
                        name="name" // Input name matches the state key
                        type="text"
                        value={parentData.name}
                        onChange={handleInputChange}
                        placeholder="Enter parent name"
                    />
                </div>
                <div>
                    <Label>Email</Label>
                    <Input
                        name="email"
                        type="email"
                        value={parentData.email}
                        onChange={handleInputChange}
                        placeholder="Enter parent email"
                    />
                </div>
                <div>
                    <Label>Phone</Label>
                    <Input
                        name="phone"
                        type="text"
                        value={parentData.phone}
                        onChange={handleInputChange}
                        placeholder="Enter phone number"
                    />
                </div>
                <div>
                    <Label>Address</Label>
                    <Input
                        name="address"
                        type="text"
                        value={parentData.address}
                        onChange={handleInputChange}
                        placeholder="Enter address"
                    />
                </div>
            </div>
        </div>
    );
};

export default ParentForm;
