/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-expressions */
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

import React, {useEffect} from 'react';
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
import PublisherRequest from './components/publishersRequests/publisherRequest';
import User from './components/users/User';
import UsersList from './components/users/UsersList';
import UsersRequest from './components/usersRequests/UsersRequest';
import UsersRequestsList from './components/usersRequests/UsersRequestsList';
import Message from './components/messageTemplates/Message';
import MessagesList from './components/messageTemplates/MessagesList';
import PublishersRequestsList from './components/publishersRequests/PublishersRequestsList';
import Footer from './components/footer';
import PrivateRoute from './components/PrivateRoutes';
import theme from './styles/app';
import Tooltips from './components/Tooltips';
import enMessages from './intl/translations/en.json';
import fiMessages from './intl/translations/fi.json';
import svMessages from './intl/translations/sv.json';
import SnackBar from './components/SnackBar';
import * as actions from './store/actions';

export default connect(mapStateToProps, actions)(withRouter(props => {
	const {lang, userInfo, isAuthenticated, history, location, responseMessage, getApiUrl} = props;
	const {modal} = location.state !== undefined && location.state;

	useEffect(() => {
		getApiUrl();
	}, []);

	const routeField = [
		{path: '/', component: Home},
		{path: '/publishers', component: PublishersList},
		{path: '/publishers/:id', component: PublishersList}

	];

	const privateRoutesList = [
		{path: '/users', role: ['admin', 'publisherAdmin', 'publisher', 'system'], component: UsersList},
		{path: '/users/:id', role: ['admin', 'publisherAdmin', 'publisher', 'system'], component: UsersList},
		{path: '/requests/users', role: ['admin', 'publisherAdmin'], component: UsersRequestsList},
		{path: '/requests/users/:id', role: ['admin', 'publisherAdmin'], component: UsersRequestsList},
		{path: '/templates', role: ['admin'], component: MessagesList},
		{path: '/templates/:id', role: ['admin'], component: MessagesList},
		{path: '/requests/publishers', role: ['publisher', 'admin'], component: PublishersRequestsList},
		{path: '/requests/publishers/:id', role: ['system', 'admin'], component: PublishersRequestsList}

	];

	const routes = (
		<>
			{routeField.map(fields => (
				<Route
					key={fields.path}
					exact
					path={fields.path}
					render={props => <fields.component {...props}/>}
				/>
			))}
			{privateRoutesList.map(pRoute => (
				<PrivateRoute
					key={pRoute.path}
					exact
					role={pRoute.role}
					path={pRoute.path}
					component={pRoute.component}
				/>
			))}
		</>
	);

	const translations = {
		fi: fiMessages,
		en: enMessages,
		sv: svMessages

	};

	const component = (
		<IntlProvider locale={lang} messages={translations[lang]}>
			<MuiThemeProvider theme={theme}>
				<TopNav userInfo={userInfo} isAuthenticated={isAuthenticated} history={history}/>
				<CssBaseline/>
				<AdminNav userInfo={userInfo} isAuthenticated={isAuthenticated}/>
				<section>
					{
						isAuthenticated ? (userInfo.role.includes('publisher')) &&
						<Tooltips label="contact form" title="contactForm"/> :
							null
					}
					<Switch>
						{routes}
					</Switch>
					{modal ? <Route path="/publishers/:id" component={Publisher}/> : null}
					{modal ? <Route path="/requests/publishers/:id" component={PublisherRequest}/> : null}
					{modal ? <Route path="/users/:id" component={User}/> : null}
					{modal ? <Route path="/requests/users/:id" component={UsersRequest}/> : null}
					{modal ? <Route path="/templates/:id" component={Message}/> : null}

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
		isAuthenticated: state.login.isAuthenticated,
		userInfo: state.login.userInfo
	};
}
