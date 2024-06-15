// src/Attendence.js
import { useEffect, useState } from "react";
import Student from "../Components/Student";
import './Attendence.css';
const Attendence = () => {
    const [students, setStudents] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/students')
            .then(res => res.json())
            .then(data => setStudents(data));
    }, []);

    return (
        <div className="main">
            <h1>Attendance</h1>
            <div className="student">
            {students.map((student) => (
                <Student key={student._id} student={student} />
            ))}
            </div>
        </div>
    );
};

export default Attendence;
