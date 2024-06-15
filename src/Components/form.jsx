import { useState, useEffect } from 'react';
import StarRatings from 'react-star-ratings';
import './Form.css';

const Form = ({ student, closeForm }) => {
  const [ratings, setRatings] = useState({
    ListeningSkills: 0,
    AttentionSpan: 0,
    Curiosity: 0,
    ReflectingAbility: 0,
  });
  const [attendance, setAttendance] = useState('Yes');
  const [error, setError] = useState(null);

  useEffect(() => {
    document.body.classList.add('no-scroll');
    return () => {
      document.body.classList.remove('no-scroll');
    };
  }, []);

  const handleRatingChange = (field, newRating) => {
    setRatings((prevRatings) => ({
      ...prevRatings,
      [field]: newRating,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      Student: student._id,
      Ratings: ratings,
      Attendance: attendance,
    };

    try {
      const response = await fetch('http://localhost:5000/attendence', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Error recording attendance');
      }

      console.log(`Form submitted for ${student.name}`);
      closeForm();
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className='modal'>
      <div className='modal-content'>
        <span className='close' onClick={closeForm}>
          &times;
        </span>
        <h2>Enter Attendance for {student.name}</h2>
        {error && <p className='error'>{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className='form-field'>
            <h3>Listening Skills</h3>
            <StarRatings
              rating={ratings.ListeningSkills}
              starRatedColor='blue'
              changeRating={(newRating) =>
                handleRatingChange('ListeningSkills', newRating)
              }
              numberOfStars={5}
              name='ListeningSkillsRating'
            />
          </div>
          <div className='form-field'>
            <h3>Attention Span</h3>
            <StarRatings
              rating={ratings.AttentionSpan}
              starRatedColor='blue'
              changeRating={(newRating) =>
                handleRatingChange('AttentionSpan', newRating)
              }
              numberOfStars={5}
              name='AttentionSpanRating'
            />
          </div>
          <div className='form-field'>
            <h3>Curiosity</h3>
            <StarRatings
              rating={ratings.Curiosity}
              starRatedColor='blue'
              changeRating={(newRating) =>
                handleRatingChange('Curiosity', newRating)
              }
              numberOfStars={5}
              name='CuriosityRating'
            />
          </div>
          <div className='form-field'>
            <h3>Reflecting Ability</h3>
            <StarRatings
              rating={ratings.ReflectingAbility}
              starRatedColor='blue'
              changeRating={(newRating) =>
                handleRatingChange('ReflectingAbility', newRating)
              }
              numberOfStars={5}
              name='ReflectingAbilityRating'
            />
          </div>
          <div className='form-field'>
            <h3>Attendance</h3>
            <label>
              <input
                type='radio'
                name='attendance'
                value='Yes'
                checked={attendance === 'Yes'}
                onChange={() => setAttendance('Yes')}
              />{' '}
              Yes
            </label>
            <label>
              <input
                type='radio'
                name='attendance'
                value='No'
                style={{ marginLeft: '10px' }}
                checked={attendance === 'No'}
                onChange={() => setAttendance('No')}
              />{' '}
              No
            </label>
          </div>
          <button type='submit'>Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Form;
