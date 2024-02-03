// Main.tsx
import { Provider } from "react-redux"
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CoursePage from './pages/CoursePage/CoursePage';
import CourseFirstPage from './pages/CoursePage/CourseFirstPage';
import HomePage from './pages/HomePage/HomePage'; // Import HomePage
import CourseFinalization from './pages/CourseFinalization/CourseFinalization'; // Import HomePage
import store from "./store"


function Main() {

  return (
    <Provider store={store}>
    <Router>
      <Routes>
        <Route path="/" element={<CourseFirstPage />} />
        <Route path="/course-page" element={<CoursePage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/coursefinalization" element={<CourseFinalization />} />
      </Routes>
    </Router>
    </Provider>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(<Main />);
