// src/App.jsx
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import CompetitionsList from './pages/CompetitionsList/CompetitionList';
import CompetitionDetails from './pages/CompetitionDetails/CompetitionDetails';
import ImportLenex from './pages/LenexUpload/LenexUpload';
import PrivateRoute from './components/PrivateRoute';
import Authentication from './pages/Authentication/Authentication';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<CompetitionsList />} />
        <Route path="/competitions/:id" element={<CompetitionDetails />} />
        <Route path="/import" element={<PrivateRoute><ImportLenex /></PrivateRoute>} />
        <Route path="/login" element={<Authentication login/>} />
        <Route path="/register" element={<Authentication register />} />
      </Routes>
    </>
  );
}

export default App;
