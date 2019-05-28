import React, {useState} from 'react';
import {AppBar, Toolbar, Typography, Grid, Select, FormControl, NativeSelect} from '@material-ui/core';
import useStyles from '../../../styles/topNav';
import Logo from '../../../assets/logo/logo.png';
import PersonIcon from '@material-ui/icons/Person';
import LanguageIcon from '@material-ui/icons/Language';
import ArrowDropDown from '@material-ui/icons/ArrowDropDown';

const TopNav = () => {
	const [state, setState] = useState({
		lang: 'EN'
	});
	const classes = useStyles();

	const handleChange = e => {
		setState({
			...state,
			lang: e.target.value
		});
	};

	const val = [{value: 'EN', label: 'English'}, {value: 'FI', label: 'Suomi'}, {value: 'SV', label: 'Swedish'}];

	return (
		<Grid container className={classes.topBarContainer}>
			<Grid item xs={12} className={classes.topBar}>
				<AppBar position="static">
					<Toolbar className={classes.navbarContainer}>
						<Typography variant="h6" color="inherit">
							<img src={Logo} alt="" className={classes.mainLogo}/>
						</Typography>
						<div className={classes.rightMenu}>
							<PersonIcon className={classes.personIcon}/>
							<LanguageIcon/>
							{/* <FormControl className={classes.formControl}>
								<NativeSelect
									value={state.lang}
									className={classes.selectEmpty}
									onChange={handleChange}
								>
									<option>{state.lang}</option>
									{val.map(item => (
										<option key={item.value} value={item.value}>{item.label}</option>
									))}
								</NativeSelect>
							</FormControl> */}
							<span className={classes.languageSelect}>EN</span>
							<ArrowDropDown/>
						</div>
					</Toolbar>
				</AppBar>
			</Grid>
		</Grid>
	);
};

export default TopNav;
