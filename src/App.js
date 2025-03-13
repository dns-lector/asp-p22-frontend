import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './Home';
import Category from './Category';
import Layout from './Layout';


function App() {
  return <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout />} >
        <Route index element={<Home />} />
        <Route path="category/:id" element={<Category />} />
      </Route>
    </Routes>
  </BrowserRouter>;
}

export default App;
