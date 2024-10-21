import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import axios from "axios";
import { toast } from "@/hooks/use-toast";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const ConfirmationAlert = ({
    name,
    regNo,
    basefees,
    totalfees,
    transportationFees,
    className,
    feesId,
    setStudents,
    token,
}) => {
    const [loading, setLoading] = useState(false);

    const handleConfirm = async () => {
        //studentId, regNo,baseFees, transportationFees, totalFees
        try {
            setLoading(true);
            const res = await axios.patch(
                BASE_URL + "/fees/update-status/" + feesId,
                {},
                {
                    headers: { token: token },
                },
            );
            console.log(res);

            setStudents((prevStudents) => {
                console.log("Previous Students:", prevStudents); // Check previous students
                return prevStudents?.map((student) => {
                    console.log("Checking student:", student); // Log each student's regno
                    if (student?.studentId.regno == regNo) {
                        console.log("Updating student:", student.regno); // Log when a student is updated
                        return { ...student, isPaid: true }; // Update the isPaid status
                    }
                    return student; // Return the original student if no match
                });
            });
            setLoading(false);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <AlertDialog>
            <AlertDialogTrigger>
                <Button variant="secondary">Pay</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Confirm Payment</AlertDialogTitle>
                    <AlertDialogDescription>
                        You are about to mark the following student as having paid their fees:
                        <div>
                            <p>
                                <strong>Name:</strong> {name}
                            </p>
                            <p>
                                <strong>Registration Number:</strong> {regNo}
                            </p>
                            <p>
                                <strong>Class:</strong> {className}
                            </p>
                            <p>
                                <strong>Base Fees:</strong>
                                {basefees || "--"}
                            </p>
                            <p>
                                <strong>Transportation Fees:</strong>
                                {transportationFees || "--"}
                            </p>
                            <p>
                                <strong>Total Fees:</strong>
                                {totalfees || "--"}
                            </p>
                        </div>
                        This action cannot be undone.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleConfirm} disabled={loading}>
                        {loading ? "Processing..." : "Confirm"}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default ConfirmationAlert;
