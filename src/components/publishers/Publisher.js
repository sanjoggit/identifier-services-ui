import React from 'react';
import {Typography} from '@material-ui/core';

import ModalLayout from '../ModalLayout';

export default function () {
	return (

		// <Modal
		// 	open
		// 	aria-labelledby="simple-modal-title"
		// 	aria-describedby="simple-modal-description"
		// >
		// </Modal>
		<ModalLayout isTableRow color="primary">
			<div>
				<Typography variant="h6" id="modal-title">
            Text in a modal
				</Typography>
				<Typography variant="subtitle1" id="simple-modal-description">
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
				</Typography>
			</div>
		</ModalLayout>
	);
}
