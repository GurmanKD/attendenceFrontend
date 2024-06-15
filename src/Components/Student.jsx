// src/Student.js
import { useState } from "react";
import Form from "./form";
import './Student.css';

const Student = ({ student }) => {
    const [showForm, setShowForm] = useState(false);

    const openForm = () => setShowForm(true);
    const closeForm = () => setShowForm(false);

    return (
        <div className="Students">
            <div className="studentDetails">
                <h1>{student.name}</h1>
                <p>Roll No: {student.rollNumber}</p>
            </div>
            <div className="studentbutton">
            <button onClick={openForm}>Enter Attendance</button>
            {showForm && <Form student={student} closeForm={closeForm} />}
            </div>
        </div>
    );
};

export default Student;
