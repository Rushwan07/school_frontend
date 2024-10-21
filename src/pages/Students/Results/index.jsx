import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { ArrowDownAZ, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import ResultCard from "./ResultCard";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const StudentExamResult = () => {
    const [exams, setExams] = useState([]);
    const [loading, setLoading] = useState(false);
    const [expandedExamId, setExpandedExamId] = useState(null); // To track which exam's result is being viewed
    const { user, token } = useSelector((state) => {
        const user = state?.user?.user;
        return user || {};
    });
    const { toast } = useToast();

    useEffect(() => {
        const getExams = async () => {
            try {
                setLoading(true);
                const res = await axios.get(BASE_URL + "/exams/student-exams", {
                    headers: { token: token },
                });
                console.log(res.data.data.exam);
                setExams(res?.data?.data?.exam);
            } catch (error) {
                console.log(error);
                toast({
                    variant: "destructive",
                    title: "Uh oh! Something went wrong.",
                    description: "There was a problem with your request.",
                });
            } finally {
                setLoading(false);
            }
        };
        getExams();
    }, [token, toast]);

    const handleViewResults = (examId) => {
        if (expandedExamId === examId) {
            setExpandedExamId(null); // Collapse if the same exam is clicked again
        } else {
            setExpandedExamId(examId); // Expand to view results
        }
    };

    const renderRow = (exam) => (
        <React.Fragment key={exam._id}>
            <tr className="border-b border-gray-200 bg-white shadow-sm rounded even:bg-slate-50 text-sm hover:bg-gray-100">
                <td className="py-4 px-6">
                    <div>
                        <p className="font-semibold">{exam?.name}</p>
                        <p className="text-xs text-gray-500">{exam?.description}</p>
                    </div>
                </td>
                <td className="text-center text-xs hidden md:table-cell">{exam?.classId?.name}</td>
                <td className="text-center flex justify-center h-full py-6 items-center gap-2">
                    {exam?.subjects?.map((subject) => (
                        <div key={subject._id}>
                            <p className="font-semibold">{subject?.subjectId?.name},</p>
                            {/* <p className="text-xs text-gray-500">
                                {subject?.subjectId?.description}
                            </p> */}
                        </div>
                    ))}
                </td>
                <td className="text-center">
                    {exam?.results?.length > 0 ? (
                        <ResultCard
                            handleViewResults={handleViewResults}
                            examId={exam._id}
                            exam={exam}
                            studentId={user?._id}
                        />
                    ) : (
                        <Button variant="destructive">Please wait</Button>
                    )}
                </td>
            </tr>
            {/* Render exam result details if this exam is expanded */}
            {/* {expandedExamId === exam._id && (
                <tr className="bg-gray-50">
                    <td colSpan="4" className="p-4">
                        {exam?.results.length > 0 ? (
                            exam?.results[0]?.subjects?.map((result) => (
                                <div key={result._id} className="border-b py-2">
                                    <p className="font-semibold">
                                        Subject: {result?.subjectId?.name}
                                    </p>
                                    <p>Grade: {result?.grade}</p>
                                </div>
                            ))
                        ) : (
                            <p>No results available</p>
                        )}
                    </td>
                </tr>
            )} */}
        </React.Fragment>
    );

    return (
        <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
            <div className="flex items-center justify-between mb-5">
                <h1 className="text-lg font-semibold hidden md:block">Exam Results</h1>
                <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
                    <Input
                        type="text"
                        placeholder="Search exam"
                        className="border rounded px-3 py-2"
                    />
                    <div className="flex items-center gap-4 self-end ">
                        <button className="w-8 h-8 p-2 flex items-center justify-center rounded-full bg-yellow-400">
                            <SlidersHorizontal />
                        </button>
                        <button className="w-8 h-8 p-2 flex items-center justify-center rounded-full bg-yellow-400">
                            <ArrowDownAZ />
                        </button>
                    </div>
                </div>
            </div>

            {loading ? (
                <p>Loading exams...</p>
            ) : (
                <table className="table-auto w-full mx-auto shadow-md rounded">
                    <thead>
                        <tr className="bg-gray-100 text-center text-xs font-semibold">
                            <th className="px-6 py-3">Exam Name</th>
                            <th className="px-6 py-3 hidden md:table-cell">Class</th>
                            <th className="px-6 py-3">Subjects</th>
                            <th className="px-6 py-3">Action</th>
                        </tr>
                    </thead>
                    <tbody>{exams?.map(renderRow)}</tbody>
                </table>
            )}
        </div>
    );
};

export default StudentExamResult;
