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

import React from 'react';
import TopNav from './components/navbar/topNav';
import CssBaseline from '@material-ui/core/CssBaseline';
import {HashRouter as Router, Switch, Route} from 'react-router-dom';

import {MuiThemeProvider} from '@material-ui/core/styles';
import Home from './components/main';
import Publisher from './components/publishers';
import Footer from './components/footer';
import PrivateRoute from './PrivateRoutes';
import theme, {useStyles} from './styles/app';
import {AppBar, Button, Typography} from '@material-ui/core';

const App = ({user = 'admin'}) => {
	const classes = useStyles();
	const routeField = [
		{path: '/', component: Home},
		{path: '/publishers', component: Publisher}
	];

	const privateRoutesList = [
		{path: '/templates/:id', role: ['admin'], component: ''},
		{path: '/user/requests/:id', role: ['admin'], component: ''},
		{path: '/publishers/:id', role: ['admin', 'publisher-admin'], component: Publisher},
		{path: '/publishers/request/:id', role: ['admin'], component: ''},
		{path: '/ranges/isbn/:id', role: ['admin'], component: ''},
		{path: '/ranges/ismn/:id', role: ['admin'], component: ''},
		{path: '/ranges/issn/:id', role: ['admin'], component: ''}

	];

	const routes = (
		<Switch>
			{routeField.map(fields => (
				<Route
					key={fields.path}
					exact
					path={fields.path}
					component={fields.component}
				/>
			))}
			{privateRoutesList.map(pRoute => pRoute.role.includes(user) && (
				<PrivateRoute
					key={pRoute.path}
					exact
					user={user}
					name={pRoute.path}
					path={pRoute.path}
					component={pRoute.component}
				/>
			))}
		</Switch>
	);
	return (
		<Router>
			<MuiThemeProvider theme={theme}>
				<TopNav/>
				<CssBaseline/>
				{(user === 'admin') &&
					adminNav(classes)
				}
				{routes}
				<Footer/>
			</MuiThemeProvider>
		</Router>
	);
};

export default App;

function adminNav(classes) {
	const nav = (
		<AppBar position="static" color="secondary">
			<Typography className={classes.adminNav}>
				<Button>Publishers</Button>
				<Button>Requests</Button>
				<Button>Users</Button>
				<Button>Identifier Rangess</Button>
				<Button>Message Tempaltes</Button>
			</Typography>
		</AppBar>
	);
	return nav;
}
