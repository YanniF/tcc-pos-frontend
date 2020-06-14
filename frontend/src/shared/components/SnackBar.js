import React from 'react';

import { Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';

export default ({ message, setToasterMessage }) => (
	<Snackbar open={!!message} autoHideDuration={4000} onClose={() => setToasterMessage('')}>
		<Alert onClose={() => setToasterMessage('')} severity="success">
			{message}
		</Alert>
	</Snackbar>
);
