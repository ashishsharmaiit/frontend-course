// Main.tsx
import { Provider } from "react-redux"
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CoursePage from './pages/CoursePage/CoursePage';
import HomePage from './pages/HomePage/HomePage'; // Import HomePage
import CourseFinalization from './pages/CourseFinalization/CourseFinalization'; // Import HomePage
import LessonPage from './pages/LessonPage/LessonPage'; // Import HomePage
import store from "./store"


function Main() {

  return (
    <Provider store={store}>
    <Router>
      <Routes>
        <Route path="/" element={<CoursePage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/lesson" element={<LessonPage />} />
        <Route path="/coursefinalization" element={<CourseFinalization />} />
      </Routes>
    </Router>
    </Provider>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(<Main />);
