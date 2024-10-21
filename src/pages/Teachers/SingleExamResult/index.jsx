import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { toast } from "@/hooks/use-toast";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const SingleExam = () => {
    const { examId, classId } = useParams();
    const navigate = useNavigate();
    const [students, setStudents] = useState([]);
    const [subjects, setSubjects] = useState([]);
    const [marksData, setMarksData] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const getClass = async () => {
            try {
                setLoading(true);
                const res = await axios.get(BASE_URL + "/classes/" + classId, {
                    withCredentials: true,
                });
                setSubjects(res?.data?.data?.subjects);
                const studentsFromClass = res?.data?.data?.students || [];
                setStudents(studentsFromClass);
                const resSubjects = res?.data?.data?.subjects;
                setMarksData(
                    studentsFromClass.map((student) => ({
                        studentId: student._id,
                        examId,
                        classId,
                        total: 0,
                        subjects: resSubjects?.map((subject) => ({
                            subjectId: subject._id,
                            mark: "",
                            assignmentMark: "",
                        })),
                    })),
                );
            } catch (error) {
                console.error(error);
                toast({
                    variant: "destructive",
                    title: error?.response?.data?.message || "An error occurred",
                    description: "There was a problem with your request.",
                });
            } finally {
                setLoading(false);
            }
        };
        getClass();
    }, [classId, examId]);

    const handleInputChange = (studentId, subjectId, field, value) => {
        setMarksData((prev) =>
            prev.map((student) =>
                student.studentId === studentId
                    ? {
                          ...student,
                          subjects: student.subjects.map((subject) =>
                              subject.subjectId === subjectId
                                  ? { ...subject, [field]: value }
                                  : subject,
                          ),
                      }
                    : student,
            ),
        );
    };

    const calculateTotal = (studentId) => {
        const studentData = marksData.find((student) => student.studentId === studentId);
        const total = studentData?.subjects.reduce((acc, subject) => {
            const subjectMark = parseInt(subject.mark) || 0;
            const assignmentMark = parseInt(subject.assignmentMark) || 0;
            return acc + subjectMark + assignmentMark;
        }, 0);
        return total || 0;
    };

    const handleSave = async () => {
        const formattedData = marksData.map((student) => ({
            classId,
            studentId: student.studentId,
            examId: student.examId,
            total: calculateTotal(student.studentId),
            subjects: student.subjects.map((subject) => ({
                subjectId: subject.subjectId,
                mark: subject.mark,
                assignmentMark: subject.assignmentMark,
            })),
        }));
        console.log("Formatted Data:", formattedData);
        setLoading(true);
        try {
            const res = await axios.post(BASE_URL + "/results", formattedData);
            console.log(res);
            navigate("/admin/results");
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

    return (
        <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
            <h1 className="text-lg font-semibold mb-5">Update Marks</h1>

            <table className="table-auto w-full mx-auto shadow-md rounded">
                <thead>
                    <tr className="bg-gray-100 text-center text-xs font-semibold">
                        <th className="px-6 py-3">Reg no</th>
                        <th className="px-6 py-3">Name</th>
                        {subjects.map((subject) => (
                            <th key={subject._id} className="px-6 py-3">
                                {subject.name}
                            </th>
                        ))}
                        <th className="px-6 py-3">Total</th>
                    </tr>
                </thead>

                <tbody>
                    {marksData.map((student) => (
                        <tr key={student.studentId} className="text-center even:bg-gray-100">
                            <td className="px-6 py-4">
                                {students.find((s) => s._id === student.studentId)?.regno || "N/A"}
                            </td>
                            <td className="px-6 py-4">
                                {students.find((s) => s._id === student.studentId)?.name || "N/A"}
                            </td>
                            {student.subjects.map((subject) => (
                                <td key={subject.subjectId} className="px-6 py-4">
                                    <div className="flex flex-col gap-2">
                                        <Input
                                            type="number"
                                            placeholder="Subject Mark"
                                            value={subject.mark}
                                            onChange={(e) =>
                                                handleInputChange(
                                                    student.studentId,
                                                    subject.subjectId,
                                                    "mark",
                                                    e.target.value,
                                                )
                                            }
                                            min="0"
                                        />
                                        <Input
                                            type="number"
                                            placeholder="Assignment Mark"
                                            value={subject.assignmentMark}
                                            onChange={(e) =>
                                                handleInputChange(
                                                    student.studentId,
                                                    subject.subjectId,
                                                    "assignmentMark",
                                                    e.target.value,
                                                )
                                            }
                                            min="0"
                                        />
                                    </div>
                                </td>
                            ))}
                            <td className="px-6 py-4">{calculateTotal(student.studentId)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <Button onClick={handleSave} className="mt-4">
                Save
            </Button>
        </div>
    );
};

export default SingleExam;
