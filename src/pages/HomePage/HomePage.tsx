// HomePage.tsx
// code for the landing page where user enters the input for what are the user's interests.
import Form from 'react-bootstrap/Form';
import React, { useContext, useState } from 'react';
import UserContext from '../../hooks/context/UserContext';
import Logo from '../../components/Logo/Logo';
import TextBox from '../../components/TextBox/TextBox';
import Text from '../../components/Text/Text';
import Button from '../../components/Button/Button';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import useTextBox from '../../hooks/validateTextBox';
import useFetchCourse from '../../hooks/useFetchCourse';
import './HomePage.css'; // Importing the CSS file
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const { textBoxValue, showError, handleTextChange, validateTextBox } = useTextBox();
  const fetchCourse = useFetchCourse();
  const navigate = useNavigate();
  const [isFetchingCourse, setIsFetchingCourse] = useState(false); // New loading state
  const userContext = useContext(UserContext);

  if (!userContext) {
    throw new Error('useContext must be used within a UserContext.Provider');
  }

  const { name } = userContext;


  const handleClick = async () => {
    if (validateTextBox()) {
      try {
        setIsFetchingCourse(true); // Start loading
        const data = await fetchCourse(textBoxValue);
        setIsFetchingCourse(false); // Stop loading on success
        navigate('/coursefinalization', { state: { data, textBoxValue} }); // Navigate with the fetched data
      } catch (error) {
        console.error('Failed to fetch the course. Error:', error);
        setIsFetchingCourse(false); // Stop loading on success
      }
    }
  };


  return (
    <React.StrictMode>
      <Logo />
      {name && <p>Welcome : {name}</p>}
      <div className="componentStyle"><Text tag="p" text="I want to learn" textAlign="center" paddingLeft="5vw" paddingRight="5vw" /></div>
      {showError && <ErrorMessage />}
      <TextBox height="100px" placeholder="e.g., Python, JavaScript, Neural Nets, Generative AI" onChange={handleTextChange} paddingLeft="25vw" paddingRight="25vw"/>
      <div className="componentStyle"><Text tag="p" text="in" textAlign="center" paddingLeft="5vw" paddingRight="5vw" /></div>
      <div className="select-container">
        <Form.Select aria-label="Default select example">
          <option>1</option>
          <option value="1">2</option>
          <option value="2">3</option>
          <option value="3">4</option>
          <option value="4">5</option>
          <option value="5">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
          <option value="11">15</option>
          <option value="12">20</option>
          <option value="13">30</option>
          <option value="14">60</option>
        </Form.Select>
        <Form.Select aria-label="Default select example">
          <option>Weeks</option>
          <option value="1">Days</option>
          <option value="2">Hours</option>
          <option value="3">Minutes</option>
        </Form.Select>
      </div>
      {isFetchingCourse ? <p>Loading books...</p> : <div className="componentStyle"><Button text="Teach Me!" onClick={handleClick} /></div>}
    </React.StrictMode>
  );
};

export default HomePage;
