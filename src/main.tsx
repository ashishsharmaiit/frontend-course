// Main.tsx
import { Provider } from "react-redux"
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CourseFirstPage from './pages/CoursePage/CourseFirstPage';
import LessonPage from './pages/LessonPage/LessonPage'; 
import LoginPage from './pages/LoginPage/LoginPage'; 
import store from "./store"
import WelcomePage from './pages/WelcomePage/WelcomePage'; 


function Main() {

  return (
    <Provider store={store}>
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/search" element={<CourseFirstPage />} />
        <Route path="/lesson" element={<LessonPage />} />
        <Route path="/welcome" element={<WelcomePage />} />
      </Routes>
    </Router>
    </Provider>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(<Main />);
