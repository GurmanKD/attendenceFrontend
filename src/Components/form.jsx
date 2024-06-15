import { useState, useEffect } from "react";
import StarRatings from "react-star-ratings";
import './Form.css';

const Form = ({ student, closeForm }) => {
    const [rating, setRating] = useState(0);
    const [error, setError] = useState(null);

    useEffect(() => {
        document.body.classList.add('no-scroll');
        return () => {
            document.body.classList.remove('no-scroll');
        };
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const formData = {
            Student: student._id,
            ListeningSkills: e.target.ListeningSkills.value,
            AttentionSpan: e.target.AttentionSpan.value,
            Curiosity: e.target.Curiosity.value,
            ReflectingAbility: e.target.ReflectingAbility.value,
            ratings: rating,
        };

        try {
            const response = await fetch('http://localhost:5000/attendence', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || 'Error recording attendance');
            }

            console.log(`Rating for ${student.name}: ${rating}`);
            closeForm();
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close" onClick={closeForm}>&times;</span>
                <h2>Enter Attendance for {student.name}</h2>
                {error && <p className="error">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <textarea name="ListeningSkills" placeholder="Listening Skills" required></textarea>
                    <textarea name="AttentionSpan" placeholder="Attention Span" required></textarea>
                    <textarea name="Curiosity" placeholder="Curiosity" required></textarea>
                    <textarea name="ReflectingAbility" placeholder="Reflecting Ability" required></textarea>
                    <StarRatings
                        rating={rating}
                        starRatedColor="blue"
                        changeRating={(newRating) => setRating(newRating)}
                        numberOfStars={5}
                        name='rating'
                    />
                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    );
};

export default Form;
