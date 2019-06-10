import React from 'react';
import {Modal, Typography} from '@material-ui/core';

export default function Publisher({match}) {
    console.log('match', match.params.id)
	return (

		<Modal
			open
			aria-labelledby="simple-modal-title"
			aria-describedby="simple-modal-description"
		>
			<div>
				<Typography variant="h6" id="modal-title">
            Text in a modal
				</Typography>
				<Typography variant="subtitle1" id="simple-modal-description">
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
				</Typography>
			</div>
		</Modal>
	);
}
