import React from 'react';
import Bg from '../../../assets/img/bg.jpg';
import {withStyles} from '@material-ui/core';
import banner from '../../../styles/banner';
import PropTypes from 'prop-types';

const Banner = props => {
	const {classes} = props;
	return (
		<div className={classes.bannerContainer}>
            <h1>Identifier Services</h1>
		</div>
	);
};

Banner.propTypes = {
	classes: PropTypes.objectOf(PropTypes.string).isRequired
};

export default withStyles(banner)(Banner);
