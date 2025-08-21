// import logo from './logo.svg';
import './App.css';
import Login from './pages/login';
import Dashboard from './pages/dashboard';
import FileUpload from './pages/fileUpload';
import ViewFile from './pages/viewFile';
import Customer from './pages/Customer';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="App">
  <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/fileupload" element={<FileUpload />} />
        <Route path="/view-file" element={<ViewFile />} />
        <Route path="/customer-data" element={<Customer />} />
  </Routes>
    </div>
  );
}

export default App;
