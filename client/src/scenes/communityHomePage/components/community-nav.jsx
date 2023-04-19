import { Box, List, ListItem, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import { categoryData } from 'utils/content/categoryData'
import { useNavigate } from 'react-router-dom'
import FlexBetween from 'components/FlexBetween'

const CommunitySubNav = () => {
  const navigate = useNavigate()
  return (
    <Box sx={{  maxWidth: '320px', top: '4rem', position: 'sticky' }}>
      <List >
        {/* general */}

        <ListItem className='community__nav__heading'>General</ListItem>
        <ListItem
          onClick={() => {
            navigate(`/home`)
            navigate(0)
          }}
         sx={{ display:'flex', gap:'0.5rem' }}
        >
          <span>🏠</span> Home
        </ListItem>
        <ListItem   sx={{ display:'flex', gap:'0.5rem' }}>
          <span>🆕</span> Latest Post
        </ListItem>
        <ListItem   sx={{ display:'flex', gap:'0.5rem' }}>
          <span>💬</span> Popular Discussions
        </ListItem>
        <ListItem   sx={{ display:'flex', gap:'0.5rem' }}>
          <span>📚</span> Helpful Resources
        </ListItem>

        {/* Topics */}
        <ListItem className='community__nav__heading'>Topics</ListItem>
        {categoryData.map(category => (
          <ListItem
            key={category.id}
            onClick={() => {
              navigate(`/posts/${category.title}`)
              navigate(0)
            }}
          >
            <span
              className={`category--${category.title.replace(/\s+/g, '-')}`}
            ></span>
            {category.title}
          </ListItem>
        ))}
      </List>
    </Box>
  )
}

export default CommunitySubNav
