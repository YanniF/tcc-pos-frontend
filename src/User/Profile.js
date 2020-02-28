import React from 'react';
import Grid from '@material-ui/core/Grid';

import Details from './Details'
import Stats from './Stats'
// // import Notifications from './Notifications'

function Profile() {
	return (
    <Grid container spacing={10}>
      <Grid item sm={7}>
        <Details />
      </Grid>
      <Grid item sm={4}>
        <Stats />
      </Grid>
    </Grid>
  );
}

export default Profile;
