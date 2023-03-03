import { Fragment,useState, useEffect } from "react";
import Footer from "../footer/footer.component";
import axios from "axios";
import { Fab } from '@mui/material';
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import { FixedSizeList, ListChildComponentProps } from 'react-window';

function renderRow(props: ListChildComponentProps) {
  const { index, style } = props;

  return (
    <ListItem style={style} key={index} component="div" disablePadding>
      <ListItemButton>
        <ListItemText primary={`Item ${index + 1}`} />
      </ListItemButton>
    </ListItem>
  );
}


const InteractiveMap = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    var crisisCountries = [];
  
    useEffect(() => {
      const getData = async () => {
        try {
          const response = await axios.get(
            `https://api.reliefweb.int/v1/disasters?appname=apidoc&profile=full&preset=latest`
          );
          var crisisCountries = "";
          setData(response.data);
          setError(null);
        } catch (err) {
          setError(err.message);
          setData(null);
        } finally {
          setLoading(false);
        }
      };
      getData();
    }, []);
    return (
        <Fragment>
            <section className="map">
   <div className="options__wrapper">


<div className="options">
    <div className="options__panel">
            <button className="options__panel__all">All</button>
            <button className="options__panel__ongoing">Ongoing</button>
            <button className="options__panel__alerts">Alerts</button>
    </div>

    <div className="options__info">
    <h2 className="options__info__title">
        Filter by Country
      </h2>
      <Box
      sx={{ width: '100%', height: '100vh' }}
    >
      <FixedSizeList
        height={800}
        width={360}
        itemSize={46}
        itemCount={200}
        overscanCount={5}
      >
        {renderRow}
      </FixedSizeList>
    </Box>
      {/* {loading && <div>A moment please...</div>}
      {error && (
        <div>{`There is a problem fetching the post data - ${error}`}</div>
      )}
      <ul>
        {data &&
          data.data.map(({ id, fields }) => (
            <li key={id}>
              <h3>{fields.name}</h3>
              <a href="{href}">Link to article</a>
            </li>
          ))}
      </ul> */}
    </div>
</div>
<div className="options__toggle"><Fab size="small"  aria-label="close">
  <ArrowBackIosNewRoundedIcon />
</Fab></div>
</div>

    <div id="globe__canvas"></div>
                
            </section>
            
        </Fragment>
    )

}

export default InteractiveMap;