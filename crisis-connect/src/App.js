import {BrowserRouter as Router,Routes, Route, Link} from 'react-router-dom'
import Navigation from './routes/navigation/navigation.component.jsx'
import Home from './routes/home/home.component'
import './css/main.scss';



const App = () =>{
  return (
      <Routes>
        <Route path='/' element={<Navigation />}>
          <Route index element={<Home />} />
     
        </Route>
      </Routes>
  );
}


export default App;
