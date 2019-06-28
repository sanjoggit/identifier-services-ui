/* eslint-disable no-undef */
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
import {connect} from 'react-redux';
import {MuiThemeProvider} from '@material-ui/core/styles';
import {IntlProvider} from 'react-intl';

import Home from './components/main';
import TopNav from './components/navbar/topNav';
import AdminNav from './components/navbar/adminNav';
import Publisher from './components/publishers/Publisher';
import PublishersList from './components/publishers/PublishersList';
import Footer from './components/footer';
// import PrivateRoute from './PrivateRoutes';
import theme from './styles/app';
import Tooltips from './components/Tooltips';
import enMessages from './intl/translations/en.json';
import fiMessages from './intl/translations/fi.json';
import svMessages from './intl/translations/sv.json';
import SnackBar from './components/SnackBar';
import {logOut} from './store/actions/auth';

export default connect(mapStateToProps, {logOut})(withRouter(props => {
	const {lang, userInfo, isLogin, history, location, responseMessage} = props;
	const routeField = [
		{path: '/', component: (userInfo.groups !== undefined && (userInfo.groups.includes('admin') || userInfo.groups.includes('publisher')) ? PublishersList : Home)},
		{path: '/publishers', component: PublishersList},
		{path: '/publishers/:id', component: PublishersList}

	];

	// Const privateRoutesList = [
	// 	{path: '/templates/:id', role: ['admin'], component: ''},
	// 	{path: '/user/requests/:id', role: ['admin'], component: ''},
	// 	{path: '/publishers/request/:id', role: ['admin'], component: ''},
	// 	{path: '/ranges/isbn/:id', role: ['admin'], component: ''},
	// 	{path: '/ranges/ismn/:id', role: ['admin'], component: ''},
	// 	{path: '/ranges/issn/:id', role: ['admin'], component: ''}

	// ];

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
			{/* {privateRoutesList.map(pRoute => pRoute.role.includes(user.role) && (
				<PrivateRoute
					key={pRoute.path}
					exact
					user={user.role}
					name={pRoute.path}
					path={pRoute.path}
					component={pRoute.component}
				/>
			))} */}
		</>
	);

	const isModal = location.state;

	const handleLogOut = () => {
		logOut();
		redirectTo('/');
	};

	function redirectTo(path, state) {
		history.push({
			pathname: path,
			state: state
		});
		window.location.reload();
	}

	const translations = {
		fi: fiMessages,
		en: enMessages,
		sv: svMessages

	};

	const component = (
		<IntlProvider locale={lang} messages={translations[lang]}>
			<MuiThemeProvider theme={theme}>
				<TopNav loggedIn={isLogin} redirectTo={redirectTo} logOut={handleLogOut}/>
				<CssBaseline/>
				<AdminNav user={userInfo} loggedIn={isLogin}/>
				<section>
					{(userInfo.groups !== undefined && userInfo.groups.includes('publisher')) &&
					<Tooltips label="contact form" title="contactForm"/>
					}
					<Switch>
						{routes}
					</Switch>
					{isModal ? <Route path="/publishers/:id" component={Publisher}/> : null}
					{responseMessage && <SnackBar message={responseMessage} variant="success" openSnackBar={Boolean(responseMessage)}/>}
				</section>
				<Footer/>
			</MuiThemeProvider>
		</IntlProvider>
	);
	return {
		...component
	};
}));

function mapStateToProps(state) {
	return {
		lang: state.locale.lang,
		responseMessage: state.contact.responseMessage,
		isLogin: state.login.isLogin,
		userInfo: state.login.userInfo
	};
}
