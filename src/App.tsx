import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router';
import Home from './routes/Home';
import Cities from './routes/Cities';
import MainLayout from './routes/MainLayout';
import Settings from './routes/Settings';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path='/' element={<Home />} />
          <Route path='/cities' element={<Cities />} />
          <Route path='/settings' element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
