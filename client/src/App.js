import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import CommunityHomePage from 'scenes/communityHomePage/index.jsx'
import LoginPage from 'scenes/loginPage/index.jsx'
import ProfilePage from 'scenes/profilePage/index.jsx'
import LandingPage from 'scenes/landingPage/index.jsx'
import Navigation from 'layout/navigation/index.jsx'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { createTheme } from '@mui/material/styles'
import { themeSettings } from 'theme'
import './css/main.scss'
import InteractiveMap from 'scenes/interactiveMap'
import Contact from 'scenes/contactPage'
import PostPage from 'scenes/postPage'
import TopicPage from 'scenes/topicPage'

function App () {
  const mode = useSelector(state => state.mode)
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode])

  return (
    <div className='app'>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route path='/' element={<Navigation />} />
            <Route index element={<LandingPage />} />
            <Route path='/Login' element={<LoginPage />} />
            <Route path='/interactiveMap' element={<InteractiveMap />} />
            <Route path='/contact' element={<Contact />} />
            <Route path='/home' element={<CommunityHomePage />} />
            <Route path='/profile/:userId' element={<ProfilePage />} />
            <Route path='/post/:postId' element={<PostPage />} />
            <Route path='/posts/:category' element={<TopicPage />} />
            {/* <Route path="/CommunityNavbar" element={<CommunityNavbar />} /> */}
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  )
}

export default App
