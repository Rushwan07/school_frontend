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

const ConfirmationAlert = ({ name, regNo, fees, className }) => {
    const [loading, setLoading] = useState(false);

    const handleConfirm = () => {
        //studentId, regNo,baseFees, transportationFees, totalFees
        try {
            setLoading(true);

            setLoading(false);
        } catch (error) {
            console.log(error);
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
                                <strong>Fees:</strong> {fees}
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
