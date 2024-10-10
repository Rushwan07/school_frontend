import React, { useState } from "react";

// Example student result data (replace this with actual data fetching)
const studentResult = {
    _id: "670524810c6aa699c6ede9d0",
    subjects: [
        {
            subjectId: {
                _id: "6704ea5418b730aed6cc5089",
                name: "Tamil",
                description: "Description for Tamil subject",
            },
            mark: 43,
            assignmentMark: 23,
            grade: "B+",
        },
        {
            subjectId: {
                _id: "6704ea5418b730aed6cc5090",
                name: "Math",
                description: "Description for Math subject",
            },
            mark: 45,
            assignmentMark: 25,
            grade: "A",
        },
    ],
    total: 136,
    examId: {
        _id: "670519227e2fd9ab12fc5b8e",
        name: "Final Exam",
        description: "Final examination for the academic year",
    },
    classId: {
        _id: "6704ec91fee39a5e6ebd0162",
        name: "X A",
    },
    studentId: {
        _id: "670504cf9d81be21a0a06e3e",
        regno: "101",
        name: "Subin",
        address: "123 Main Street, Anytown, USA",
        img: "https://example.com/student.jpg",
    },
};

const StudentExamResult = () => {
    const [result, setResult] = useState(studentResult); // Set this from fetched data

    return (
        <div className="bg-white p-6 rounded-md m-4">
            <h1 className="text-lg font-semibold mb-5">Exam Result</h1>
            <div className="mb-5">
                <p>
                    <strong>Name:</strong> {result.studentId.name}
                </p>
                <p>
                    <strong>Registration Number:</strong> {result.studentId.regno}
                </p>
                <p>
                    <strong>Class:</strong> {result.classId.name}
                </p>
                <p>
                    <strong>Exam:</strong> {result.examId.name}
                </p>
            </div>

            <h2 className="text-md font-semibold mb-3">Subject-wise Marks</h2>
            <div className="flex flex-col gap-1">
                {result.subjects.map((subject) => (
                    <div
                        key={subject.subjectId._id}
                        className="p-4 border border-gray-300 rounded-md"
                    >
                        <p>
                            <strong>Subject:</strong> {subject.subjectId.name}
                        </p>
                        {/* <p>
                            <strong>Mark:</strong> {subject.mark} / 50
                        </p> */}
                        <p>
                            <strong>Assignment Mark:</strong> {subject.assignmentMark} / 25
                        </p>
                        <p>
                            <strong>Grade:</strong> {subject.grade}
                        </p>
                    </div>
                ))}
            </div>

            {/* <div className="mt-6 p-4 bg-gray-100 rounded-md">
                <p>
                    <strong>Total Marks:</strong> {result.total}
                </p>
            </div> */}
        </div>
    );
};

export default StudentExamResult;
