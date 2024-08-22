import './globals.css';
import {BrowserRouter as Router, Route,Routes} from "react-router-dom"
import InvalidUrl from './pages/InvalidUrl';
import Main from './pages/Main';
function App() {
 return(
  <Router>
    <Routes>
      <Route path='/' element={<Main />}/>
      <Route path='*' element={<InvalidUrl />}/>
    </Routes>
  </Router>
 );
}

export default App;
