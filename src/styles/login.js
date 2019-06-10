
/**
 *
 * @licstart  The following is the entire license notice for the JavaScript code in this file.
 *
 * UI microservice of Identifier Services
 *
 * Copyright (C) 2019 University Of Helsinki (The National Library Of Finland)
 *
 * This file is part of identifier-services-ui
 *
 * identifier-services-ui program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * identifier-services-ui is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *
 * @licend  The above is the entire license notice
 * for the JavaScript code in this file.
 *
 */
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles({
	main: {
		maxWidth: 400
	},
	hakaLogo: {
		height: 300,
		display: 'grid',
		gridTemplateRows: '8fr 2fr',
		'& img': {
			width: '100%',
			alignSelf: 'center'
		}

	},
	notes: {
		margin: '10px -20px -20px',
		padding: '5px 20px',
		background: '#00224F20',
		'& p': {
			fontSize: '0.75rem',
			'& a': {
				fontWeight: 700
			}
		}
	},
	loginForm: {
		display: 'grid',
		gridTemplateRows: '9fr 1fr',
		maxWidth: 700,
		maxHeight: 400,
		margin: '40px 0px 0px'
	},
	inputGap: {
		marginBottom: 20
	},
	personIcon: {
		height: 30,
		width: 30
	}
});

export default useStyles;
