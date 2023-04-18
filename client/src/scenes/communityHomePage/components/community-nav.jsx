
import { Box } from "@mui/system";
import { Link } from "react-router-dom";
import { categoryData } from "utils/content/categoryData";
import FlexBetween from "components/FlexBetween";

const CommunitySubNav = () => {
  return (
    <Box sx={{ width: 320, maxWidth: '100%' }}>

      <nav>
        <ul className="community__nav">
          {/* general */}
          <li className="community__nav__heading">General</li>
          <li><Link to="/home" sx={{ color: 'black' }}><span>🏠</span>  Home</Link></li>
          <li> <Link to="" ><span>🆕</span>  Latest Post</Link></li>
          <li><Link to="/" ><span>💬</span>  Popular Discussions</Link></li>
          <li><Link to="/" ><span>📚</span>  Helpful Resources</Link></li>

          {/* Topics */}
          <li className="community__nav__heading">Topics</li>
          {categoryData.map(category => (

            <li> <Link to="/topic/${category.title}" ><span className={`category--${category.title.replace(/\s+/g, '-')}`}></span>
              {category.title}</Link></li>
          ))}

        </ul>

      </nav>

    </Box>
  );

}

export default CommunitySubNav;