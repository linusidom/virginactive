import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom'
import { Posts } from './Posts';
import { OtherPage } from './OtherPage';


function App() {
  return (
    <div className="App">
      <Router>
        <Link to='/'>Home</Link>
        <Link to='/otherPage'>OtherPage</Link>
        <Routes>
          <Route path='/' element={<Posts/>}/>
          <Route path='/otherPage' element={<OtherPage/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
