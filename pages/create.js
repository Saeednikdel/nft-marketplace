import { Box, Grid, Card, CardActions, Button, TextField } from "@mui/material";

const create = () => {
  return (
    <>
      <Box sx={{ width: "100%" }} style={{ marginTop: 20 }}>
        <Grid container>
          <Grid item xs={12} md={6}>
            <Card>
              <div>
                <TextField
                  name='name'
                  label='name'
                  placeholder='name'
                  style={{ margin: 20 }}
                />
              </div>
              <div>
                <TextField
                  name='desc'
                  label='desc'
                  placeholder='desc'
                  style={{ margin: 20 }}
                  multiline
                  rows={4}
                />
              </div>
              <div>
                <TextField
                  type='number'
                  name='price'
                  label='price'
                  placeholder='price'
                  style={{ margin: 20 }}
                />
              </div>
              <CardActions>
                <Button variant='contained' style={{ margin: 20 }}>
                  send
                </Button>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};
export default create;
