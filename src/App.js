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

import React, {useState, useEffect} from 'react';
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
import UsersList from './components/users/UsersList';
import Footer from './components/footer';
import PrivateRoute from './PrivateRoutes';
import theme from './styles/app';
import Tooltips from './components/Tooltips';
import enMessages from './intl/translations/en.json';
import fiMessages from './intl/translations/fi.json';
import svMessages from './intl/translations/sv.json';
import SnackBar from './components/SnackBar';
import * as actions from './store/actions';
import {useCookies} from 'react-cookie';
import PublishersRequestsList from './components/publishersRequests/PublishersRequestsList';

export default connect(mapStateToProps, actions)(withRouter(props => {
	const {lang, userInfo, isLogin, history, location, responseMessage, getUserInfo} = props;
	const routeField = [
		{path: '/', component: Home},
		{path: '/publishers', component: PublishersList},
		{path: '/publishers/:id', component: PublishersList}

	];

	const privateRoutesList = [
		{path: '/users', role: ['admin'], component: UsersList},
		{path: '/requests/publishers', component: PublishersRequestsList}

	];
	const [token, setToken] = useState(null);
	const [cookie] = useCookies('login-cookie');

	useEffect(() => {
		setToken(cookie['login-cookie']);
		token !== null && getUserInfo(token);
	}, [cookie, getUserInfo, token]);

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
			{privateRoutesList.map(pRoute => (
				<PrivateRoute
					key={pRoute.path}
					exact
					user={userInfo.user.name}
					path={pRoute.path}
					component={isLogin ? pRoute.component :	Home}
				/>
			))}
		</>
	);

	const isModal = location.state;

	const handleLogOut = () => {
		logOut();
		redirectTo('/');
		window.location.reload();
	};

	function redirectTo(path) {
		history.push(path);
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
				<AdminNav userInfo={userInfo} redirectTo={redirectTo} loggedIn={isLogin}/>
				<section>
					{(userInfo.role.includes('publisher')) &&
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
