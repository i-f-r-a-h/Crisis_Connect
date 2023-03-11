
import { Box } from "@mui/system";
import { Link } from "react-router-dom";

const CommunityNavBar = () => {
    return (
        <Box sx={{ width: 320, maxWidth: '100%' }}>

            <nav>
            <ul className="community__nav">
                {/* general */}
            <li className="community__nav__heading">General</li>
            <li><Link to="/" sx={{ color: 'black' }}><span>🏠</span>  Home</Link></li>
            <li> <Link to="/" ><span>🆕</span>  Latest Post</Link></li>
            <li><Link to="/" ><span>💬</span>  Popular Discussions</Link></li>
            <li><Link to="/" ><span>📚</span>  Helpful Resources</Link></li>

                    {/* Topics */}
            <li className="community__nav__heading">Topics</li>
            <li><Link to="/" sx={{ color: 'black' }}><span>🟣</span>Emergency Alerts</Link></li>
            <li> <Link to="/" ><span>🟢</span>Disaster Response</Link></li>
            <li><Link to="/" ><span>🟡</span>Volunteering Opportunities</Link></li>
            <li><Link to="/" ><span>🟣</span>Donations</Link></li>
            <li> <Link to="/" ><span>🟢</span>Post-Disaster Recovery</Link></li>
            <li><Link to="/" ><span>🟡</span>General Discussion</Link></li>

               {/* general */}
            <li className="community__nav__heading">General</li>
            <li><Link to="/" sx={{ color: 'black' }}><span>🌎</span>By Country</Link></li>
            <li> <Link to="/" ><span>🌪</span> By Disaster Type</Link></li>

          
          </ul>

            </nav>
      
        </Box>
      );

}

export default CommunityNavBar;