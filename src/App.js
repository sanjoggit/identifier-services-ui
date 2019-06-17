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
import CssBaseline from '@material-ui/core/CssBaseline';
import {Switch, Route, withRouter} from 'react-router-dom';

import {MuiThemeProvider} from '@material-ui/core/styles';
import Home from './components/main';
import TopNav from './components/navbar/topNav';
import AdminNav from './components/navbar/adminNav';
import Publisher from './components/publishers/Publisher';
import PublishersList from './components/publishers/PublishersList';
import Footer from './components/footer';
import PrivateRoute from './PrivateRoutes';
import theme from './styles/app';
import Tooltips from './components/Tooltips';

export default withRouter(props => {
	const [user, setUser] = React.useState({role: 'admin', isLoggedIn: false});
	const routeField = [
		{path: '/', component: (user.role === 'admin' || user.role === 'publisher') ? PublishersList : Home},
		{path: '/publishers', component: PublishersList},
		{path: '/publishers/:id', component: PublishersList}

	];

	const privateRoutesList = [
		{path: '/templates/:id', role: ['admin'], component: ''},
		{path: '/user/requests/:id', role: ['admin'], component: ''},
		{path: '/publishers/request/:id', role: ['admin'], component: ''},
		{path: '/ranges/isbn/:id', role: ['admin'], component: ''},
		{path: '/ranges/ismn/:id', role: ['admin'], component: ''},
		{path: '/ranges/issn/:id', role: ['admin'], component: ''}

	];

	const routes = (
		<>
			{routeField.map(fields => (
				<Route
					key={fields.path}
					exact
					path={fields.path}
					component={fields.component}
				/>
			))}
			{privateRoutesList.map(pRoute => pRoute.role.includes(user.role) && (
				<PrivateRoute
					key={pRoute.path}
					exact
					user={user.role}
					name={pRoute.path}
					path={pRoute.path}
					component={pRoute.component}
				/>
			))}
		</>
	);

	const {location} = props;
	const isModal = location.state;

	const handleLogOut = () => {
		setUser({role: ''});
		props.history.push('/publishers');
	};

	const component = (
		<MuiThemeProvider theme={theme}>
			<TopNav loggedIn={user.isLoggedIn} role={user.role} logOut={handleLogOut}/>
			<CssBaseline/>
			<AdminNav user={user}/>
			<section>
				{(user.role === 'publisher') &&
					<Tooltips label="contact form" title="contactForm"/>
				}
				<Switch>
					{routes}
				</Switch>
				{isModal ? <Route path="/publishers/:id" component={Publisher}/> : null}

			</section>
			<Footer/>
		</MuiThemeProvider>
	);
	return {
		...component
	};
});
