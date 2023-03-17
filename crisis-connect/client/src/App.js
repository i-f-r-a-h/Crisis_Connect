import {BrowserRouter as Router,Routes, Route, Link} from 'react-router-dom'
import Navigation from './routes/navigation/navigation.component.jsx'
import Home from './routes/home/home.component'
import './css/main.scss';
import Contact from './routes/contact/contact.jsx';
import InteractiveMap from './routes/map/map.component.jsx';
import Community from './routes/community/community.component.jsx';
import Login from './routes/authmodal/login.jsx';
import Register from './routes/authmodal/register.jsx';
import { UserContextProvider } from './routes/authmodal/UserContext.js';
import CreatePost from './routes/community/createPost.jsx'
import PostPage from './routes/community/postPage.jsx';

const App = () =>{
  return (
    <UserContextProvider>
   <Routes>
        <Route path='/' element={<Navigation />}>
          <Route index element={<Home />} />
          <Route path='interactiveMap' element={<InteractiveMap />} />
          <Route path='community' element={<Community />} />
          <Route path='contact' element={<Contact />} />
          <Route path='login' element={<Login />}/>
          <Route path='register' element={<Register />} />
          <Route path='create' element={<CreatePost />} />
          <Route path='/post/:id' element={<PostPage />} />


     
        </Route>
      </Routes>
    </UserContextProvider>
   
      
  );
}


export default App;
