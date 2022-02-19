import {
  Box,
  Grid,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";

const style = makeStyles({
  container: {
    marginTop: 30,
    marginBottom: 60,
  },
});
const myassets = () => {
  const classes = style();
  return (
    <Box sx={{ width: "100%" }} className={classes.container}>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={6} md={4}>
          <Card sx={{ maxWidth: 345 }}>
            <CardMedia
              component='img'
              height='140'
              image='/static/images/cards/contemplative-reptile.jpg'
              alt='green iguana'
            />
            <CardContent>
              <Typography gutterBottom variant='h5' component='div'>
                Lizard
              </Typography>
              <Typography variant='body2' color='text.secondary'>
                Lizards are a widespread group of squamate reptiles, with over
                6,000 species, ranging across all continents except Antarctica
              </Typography>
            </CardContent>
            <CardActions>
              <Button size='small'>Share</Button>
              <Button size='small'>Learn More</Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs={6} md={4}>
          <Card sx={{ maxWidth: 345 }}>
            <CardMedia
              component='img'
              height='140'
              image='/static/images/cards/contemplative-reptile.jpg'
              alt='green iguana'
            />
            <CardContent>
              <Typography gutterBottom variant='h5' component='div'>
                Lizard
              </Typography>
              <Typography variant='body2' color='text.secondary'>
                Lizards are a widespread group of squamate reptiles, with over
                6,000 species, ranging across all continents except Antarctica
              </Typography>
            </CardContent>
            <CardActions>
              <Button size='small'>Share</Button>
              <Button size='small'>Learn More</Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs={6} md={4}>
          <Card sx={{ maxWidth: 345 }}>
            <CardMedia
              component='img'
              height='140'
              image='/static/images/cards/contemplative-reptile.jpg'
              alt='green iguana'
            />
            <CardContent>
              <Typography gutterBottom variant='h5' component='div'>
                Lizard
              </Typography>
              <Typography variant='body2' color='text.secondary'>
                Lizards are a widespread group of squamate reptiles, with over
                6,000 species, ranging across all continents except Antarctica
              </Typography>
            </CardContent>
            <CardActions>
              <Button size='small'>Share</Button>
              <Button size='small'>Learn More</Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs={6} md={4}>
          <Card sx={{ maxWidth: 345 }}>
            <CardMedia
              component='img'
              height='140'
              image='/static/images/cards/contemplative-reptile.jpg'
              alt='green iguana'
            />
            <CardContent>
              <Typography gutterBottom variant='h5' component='div'>
                Lizard
              </Typography>
              <Typography variant='body2' color='text.secondary'>
                Lizards are a widespread group of squamate reptiles, with over
                6,000 species, ranging across all continents except Antarctica
              </Typography>
            </CardContent>
            <CardActions>
              <Button size='small'>Share</Button>
              <Button size='small'>Learn More</Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};
export default myassets;
