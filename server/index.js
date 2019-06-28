/* eslint-disable handle-callback-err */
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

import express from 'express';
import cors from 'cors';
import path from 'path';
import nodemailer from 'nodemailer';
import bodyParser from 'body-parser';
import validateContentType from '@natlibfi/express-validate-content-type';
import parse from 'url-parse';
import {HTTP_PORT, SMTP_URL, BASE_URL} from '../config/config';
import fetch from 'node-fetch';
import base64 from 'base-64';
import HttpStatus from 'http-status';

function bodyParse() {
	validateContentType({
		type: ['application/json']
	});
	return bodyParser.json({
		type: ['application/json']
	});
}

const app = express();
app.use(cors());
app.use(bodyParse());

process.on('SIGINT', () => {
	process.exit(-1);
});

app.use(express.static(path.resolve(__dirname, '..', 'dist', 'public')));

app.post('/message', (req, res) => {
	async function main() {
		const parseUrl = parse(SMTP_URL, true);
		const emailcontent = `
			<h3>Contact Details</h3>
			<ul>
				<li>Name: ${req.body.name}</li>
				<li>Email: ${req.body.email}</li>
			</ul>
			<h3>Message</h3>
			<p>${req.body.description}</p>
		`;

		let transporter = nodemailer.createTransport({
			host: parseUrl.hostname,
			port: parseUrl.port,
			secure: false
		});

		let info = await transporter.sendMail({
			from: 'test@test.com',
			to: 'rojakamatya@gmail.com',
			replyTo: 'test@test.com',
			subject: 'New Message',
			text: 'hello World!!',
			html: emailcontent
		});
		res.send('Message Sent');
	}

	main().catch(console.error);
});

app.post('/auth', async (req, res) => {
	const result = await fetch(BASE_URL, {
		method: 'POST',
		headers: {
			Authorization: 'Basic ' + base64.encode(req.body.username + ':' + req.body.password)
		},
		credentials: 'include'
	});
	const token = result.headers.get('Token');
	res.cookie('login-cookie', token, {maxAge: 60000, httpOnly: false});
	res.sendStatus(HttpStatus.OK);
});

app.get('/logOut', (req, res) => {
	res.clearCookie('login-cookie');
	res.send('cookie cleared');
});

app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, '../dist/public/index.html'));
});

app.listen(HTTP_PORT, () => console.log('info', `Application Started on PORT ${HTTP_PORT}`));

