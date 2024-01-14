// Main.tsx
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage/LoginPage'; // Import HomePage
import HomePage from './pages/HomePage/HomePage'; // Import HomePage
import CourseFinalization from './pages/CourseFinalization/CourseFinalization'; // Import HomePage
import UserContext from './hooks/context/UserContext';
import { useState } from 'react';


function Main() {

  const [userId, setUserId] = useState<number | null>(null);
  const [name, setName] = useState<string | null>(null);

  return (
    <UserContext.Provider value={{ userId, name, setUserId, setName }}>
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/coursefinalization" element={<CourseFinalization />} />
      </Routes>
    </Router>
    </UserContext.Provider>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(<Main />);
