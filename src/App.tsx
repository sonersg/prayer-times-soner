import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router';
import Home from './routes/Home';
import Cities from './routes/Cities';
import MainLayout from './routes/MainLayout';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path='/' element={<Home />} />
          <Route path='/cities' element={<Cities />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
