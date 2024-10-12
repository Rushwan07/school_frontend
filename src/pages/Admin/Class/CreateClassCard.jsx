import React, { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Pencil, Plus } from "lucide-react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import Multiselect from "multiselect-react-dropdown";
// name
// capacity
// supervisorId
// lessons
const CreateClassCard = () => {
    const [dialogOpen, setDialogOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const [selectedSubjects, setSelectedSubjects] = useState([]);
    const [selectedStaff, setSelectedStaff] = useState("");
    const [capacity, setCapacity] = useState(0);
    const [name, setName] = useState();
    const [fees, setFees] = useState(0);

    const staffMembers = [
        { id: 1, name: "John Doe" },
        { id: 2, name: "Jane Smith" },
        { id: 3, name: "Michael Johnson" },
        { id: 4, name: "Emily Davis" },
    ];
    const subjects = [
        { id: 1, name: "Mathematics" },
        { id: 2, name: "Science" },
        { id: 3, name: "History" },
        { id: 4, name: "Geography" },
        { id: 5, name: "English" },
        { id: 6, name: "Physical Education" },
    ];
    const students = [
        { id: 1, regNo: "Mathematics" },
        { id: 1, regNo: "1" },
        { id: 1, regNo: "2" },
        { id: 1, regNo: "4" },
        { id: 1, regNo: "3" },
        { id: 1, regNo: "5" },
    ];

    // useEffect(() => {
    //     const getClass = async () => {
    //         try {
    //             console.log("working fine");
    //             const res = await axios.get(BASE_URL + "/students", {
    //                 withCredentials: true,
    //             });

    //             setClasses(res?.data?.data?.class);
    //         } catch (error) {
    //             console.log(error);
    //             if (error?.response?.data?.message)
    //                 toast({
    //                     variant: "destructive",
    //                     title: error?.response?.data?.message,
    //                 });
    //             else {
    //                 toast({
    //                     variant: "destructive",
    //                     title: "Uh oh! Something went wrong.",
    //                     description: "There was a problem with your request.",
    //                 });
    //             }
    //         } finally {
    //             setLoading(false);
    //         }
    //     };
    //     getClass();
    // }, []);

    const handleSubmit = async () => {
        setLoading(true);
        try {
            console.log(selectedStaff);
            console.log(capacity);
            console.log(name);
            console.log(selectedSubjects);
            await new Promise((resolve) => setTimeout(resolve, 2000));

            setDialogOpen(false);
        } catch (error) {
            console.error("An error occurred:", error);
        } finally {
            setLoading(false);
        }
    };
    const handleSelectChange = (value) => {
        setSelectedStaff(value);
    };
    const [selectedStudents, setSelectedStudents] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    // Filter students based on the search term
    const filteredStudents = students.filter((student) =>
        student.regNo.toLowerCase().includes(searchTerm.toLowerCase()),
    );
    return (
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger>
                <button className="btn btn-sm btn-outline-primary rounded-full flex justify-center items-center gap-1">
                    <Plus size={18} />
                </button>
            </DialogTrigger>
            <DialogContent className="max-h-[80vh] overflow-x-hidden overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Create Class</DialogTitle>
                </DialogHeader>{" "}
                <div className="space-y-5">
                    <div>
                        <Label>Name</Label>
                        <Input
                            type="text"
                            placeholder="Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div>
                        <Label>Capacity</Label>
                        <Input
                            type="number"
                            placeholder="Capacity"
                            value={capacity}
                            onChange={(e) => setCapacity(e.target.value)}
                        />
                    </div>

                    <div>
                        <Label>Subjects</Label>
                        <Multiselect
                            options={subjects} // Options to display in the dropdown
                            selectedValues={selectedSubjects} // Preselected value to persist in dropdown
                            onSelect={(selectedList) => setSelectedSubjects(selectedList)} // Function will trigger on select event
                            onRemove={(selectedList) => setSelectedSubjects(selectedList)} // Function will trigger on remove event
                            displayValue="name" // Property to display in the dropdown
                            className="rounded-lg"
                        />
                    </div>
                    <div>
                        <label>Students</label>
                        <input
                            type="text"
                            placeholder="Search by Registration No"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="mb-2 rounded-lg border p-2 mx-3"
                        />
                        <Multiselect
                            options={filteredStudents} // Filtered options to display in the dropdown
                            selectedValues={selectedStudents} // Preselected values to persist in dropdown
                            onSelect={(selectedList) => setSelectedStudents(selectedList)} // Function will trigger on select event
                            onRemove={(selectedList) => setSelectedStudents(selectedList)} // Function will trigger on remove event
                            displayValue="regNo" // Property to display in the dropdown (change as needed)
                            className="rounded-lg"
                        />
                    </div>
                    <div>
                        <label>Staff</label>
                        <Select onValueChange={handleSelectChange}>
                            <SelectTrigger className="rounded-lg">
                                <SelectValue placeholder="Select Staff" />
                            </SelectTrigger>
                            <SelectContent>
                                {staffMembers.map((staff) => (
                                    <SelectItem key={staff.id} value={staff.id.toString()}>
                                        {staff.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div>
                        <Label>Fees</Label>
                        <Input
                            type="number"
                            placeholder="Fees"
                            value={fees}
                            onChange={(e) => setFees(e.target.value)}
                        />
                    </div>
                </div>
                <DialogFooter className="sm:justify-end">
                    <Button onClick={handleSubmit} disabled={loading}>
                        {loading ? "Saving..." : "Save"}
                    </Button>
                </DialogFooter>
            </DialogContent>{" "}
        </Dialog>
    );
};

export default CreateClassCard;
