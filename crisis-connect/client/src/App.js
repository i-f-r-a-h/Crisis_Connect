import {BrowserRouter as Router,Routes, Route, Link} from 'react-router-dom'
import Navigation from './routes/navigation/navigation.component.jsx'
import Home from './routes/home/home.component'
import './css/main.scss';
import Contact from './routes/contact/contact.jsx';
import InteractiveMap from './routes/map/map.component.jsx';
import Community from './routes/community/community.component.jsx';



const App = () =>{
  return (
      <Routes>
        <Route path='/' element={<Navigation />}>
          <Route index element={<Home />} />
          <Route path='interactiveMap' element={<InteractiveMap />} />
          <Route path='community' element={<Community />} />
          <Route path='contact' element={<Contact />} />

     
        </Route>
      </Routes>
      
  );
}


export default App;
