import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const SingleExam = () => {
    const { examId } = useParams();

    // Sample data for students and subjects
    const [students, setStudents] = useState([
        { _id: "student1", regNo: "123", name: "John Doe" },
        { _id: "student2", regNo: "124", name: "Jane Smith" },
    ]);

    const [subjects, setSubjects] = useState([
        { _id: "subject1", name: "Math" },
        { _id: "subject2", name: "Science" },
        { _id: "subject3", name: "Physics" },
        { _id: "subject4", name: "Chemistry" },
    ]);

    const [marksData, setMarksData] = useState(
        students.map((student) => ({
            studentId: student._id,
            examId,
            total: 0,
            subjects: subjects.map((subject) => ({
                subjectId: subject._id,
                mark: "",
                assignmentMark: "",
            })),
        })),
    );

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

    const handleSave = () => {
        const formattedData = marksData.map((student) => ({
            studentId: student.studentId,
            examId: student.examId,
            total: calculateTotal(student.studentId),
            subjects: student.subjects.map((subject) => ({
                subjectId: subject.subjectId,
                mark: subject.mark,
                assignmentMark: subject.assignmentMark,
            })),
        }));
        console.log(formattedData);
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
                                {students.find((s) => s._id === student.studentId)?.regNo}
                            </td>
                            <td className="px-6 py-4">
                                {students.find((s) => s._id === student.studentId)?.name}
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
