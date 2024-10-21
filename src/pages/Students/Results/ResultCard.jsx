import React, { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const ResultCard = ({ handleViewResults, examId, exam, studentId }) => {
    const [dialogOpen, setDialogOpen] = useState(false);
    console.log(exam);

    // Filter the results to show only for the specific student
    const studentResults = exam?.results?.find((result) => result?.studentId === studentId);
    console.log(exam?.results);
    console.log(studentResults);
    return (
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger>
                <Button onClick={() => handleViewResults(examId)}>View Results</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    {/* Show the exam name in the dialog title */}
                    <DialogTitle>{exam?.name}</DialogTitle>
                </DialogHeader>

                {/* Display subject names and marks (or grades) for the specific student */}
                <div className="space-y-4">
                    {studentResults ? (
                        studentResults?.subjects?.map((result) => (
                            <div key={result._id} className="border-b py-2">
                                <p className="font-semibold">Subject: {result?.subjectId?.name}</p>
                                {/* <p>Mark: {result?.mark}</p> */}
                                <p>Grade: {result?.grade}</p>
                            </div>
                        ))
                    ) : (
                        <p>No results available for this student</p>
                    )}
                </div>

                <DialogFooter className="sm:justify-end">
                    <Button onClick={() => setDialogOpen(false)}>Close</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default ResultCard;
