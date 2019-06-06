import React from 'react';
import {Grid} from '@material-ui/core';
import PublisherLists from './PublisherLists';

export default function () {
	return (
		<Grid>
			<Grid item xs={12}>
				<PublisherLists/>
			</Grid>
		</Grid>
	);
}
