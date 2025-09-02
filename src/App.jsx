import './App.css';
import React from "react";
import NavBar from './Components/NavBar';
import News from './Components/News';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const App = () => {
  return (
    <Router>
      <NavBar />
      <Routes>
        {/* Home / Pakistan - default category is 'general' */}
        <Route
          key="pk"
          path="/"
          element={<News pageSize={7} country="pk" category="general" />}
        />

        {/* Category routes */}
        <Route
          key="business"
          path="/business"
          element={<News pageSize={7} country="pk" category="business" />}
        />
        <Route
          key="technology"
          path="/technology"
          element={<News pageSize={7} country="pk" category="technology" />}
        />
        <Route
          key="entertainment"
          path="/entertainment"
          element={<News pageSize={7} country="pk" category="entertainment" />}
        />
        <Route
          key="sports"
          path="/sports"
          element={<News pageSize={7} country="pk" category="sports" />}
        />
        <Route
          key="science"
          path="/science"
          element={<News pageSize={7} country="pk" category="science" />}
        />
        <Route
          key="health"
          path="/health"
          element={<News pageSize={7} country="pk" category="health" />}
        />
      </Routes>
    </Router>
  );
};

export default App;
