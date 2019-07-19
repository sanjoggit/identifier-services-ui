/* eslint-disable no-mixed-operators */
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
import PropTypes from 'prop-types';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import {Table, TableBody, TableCell, TableHead, TableFooter, TableRow, TableSortLabel, Paper, IconButton} from '@material-ui/core';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';

const useStyles1 = makeStyles(theme => ({
	root: {
		flexShrink: 0,
		color: theme.palette.text.secondary,
		marginLeft: theme.spacing(2.5)
	}
}));

function desc(a, b, orderBy) {
	if (b[orderBy] < a[orderBy]) {
		return -1;
	}

	if (b[orderBy] > a[orderBy]) {
		return 1;
	}

	return 0;
}

function stableSort(array, cmp) {
	const stabilizedThis = array.map((el, index) => [el, index]);
	stabilizedThis.sort((a, b) => {
		const order = cmp(a[0], b[0]);
		if (order !== 0) {
			return order;
		}

		return a[1] - b[1];
	});
	return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
	return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
}

function EnhancedTableHead(props) {
	const {order, orderBy, onRequestSort, headRows} = props;
	const createSortHandler = property => event => {
		onRequestSort(event, property);
	};

	return (
		<TableHead>
			<TableRow>
				{headRows.map(row => (
					<TableCell
						key={row.id}
						align="left"
						padding="default"
						sortDirection={orderBy === row.id ? order : false}
					>
						<TableSortLabel
							active={orderBy === row.id}
							direction={order}
							onClick={createSortHandler(row.id)}
						>
							{row.label}
						</TableSortLabel>
					</TableCell>
				))}
			</TableRow>
		</TableHead>
	);
}

EnhancedTableHead.propTypes = {
	onRequestSort: PropTypes.func.isRequired,
	order: PropTypes.string.isRequired,
	orderBy: PropTypes.string.isRequired,
	headRows: PropTypes.array.isRequired
};

const useStyles = makeStyles(theme => ({
	root: {
		width: '100%',
		marginTop: theme.spacing(3)
	},
	paper: {
		width: '100%',
		marginBottom: theme.spacing(2),
		boxShadow: 'none',
		background: 'inherit',
		cursor: 'pointer'
	},
	table: {
		minWidth: 500,
		marginTop: 60

	},
	tableRow: {
		'&:hover': {
			background: '#00224f29'
		}
	},

	tableWrapper: {
		overflowX: 'auto'
	}
}));

export default function (props) {
	const classes = useStyles();
	const [order, setOrder] = React.useState('asc');
	const [orderBy, setOrderBy] = React.useState('calories');
	const [page, setPage] = React.useState(0);
	const [rowsPerPage] = React.useState(5);

	function handleRequestSort(event, property) {
		const isDesc = orderBy === property && order === 'desc';
		setOrder(isDesc ? 'asc' : 'desc');
		setOrderBy(property);
	}

	function handleChangePage(event, newPage) {
		setPage(newPage);
	}

	const emptyRows = rowsPerPage - Math.min(rowsPerPage, props.data.length - page * rowsPerPage);
	const {data, headRows, handleTableRowClick, totalDataCount, first, setFirst} = props;
	const component = (
		<Paper className={classes.paper}>
			<Table
				className={classes.table}
				aria-labelledby="tableTitle"
			>
				<EnhancedTableHead
					order={order}
					orderBy={orderBy}
					rowCount={data.length}
					headRows={headRows}
					onRequestSort={handleRequestSort}
				/>
				<TableBody>
					{stableSort(data, getSorting(order, orderBy))
						.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
						.map(row => {
							return (
								<TableRow key={row.name} className={classes.tableRow} onClick={() => handleTableRowClick(row.id)}>
									{Object.keys(row).map(key => (key !== 'id') && (
										<TableCell key={row[key]} component="th" scope="row">
											{row[key]}
										</TableCell>
									))}
								</TableRow>
							);
						})
					}
					{emptyRows > 0 && (
						<TableRow style={{height: 49 * emptyRows}}>
							<TableCell colSpan={6}/>
						</TableRow>
					)}
				</TableBody>
				<TableFooter>
					<TableRow>
						<TablePaginationActions
							colSpan={headRows.length}
							count={totalDataCount}
							rowsPerPage={rowsPerPage}
							page={page}
							setFirst={setFirst}
							first={first}
							onChangePage={handleChangePage}
						/>
					</TableRow>
				</TableFooter>
			</Table>
		</Paper>
	);

	return {
		...component,
		propTypes: {
			data: PropTypes.array.isRequired,
			headRows: PropTypes.array.isRequired
		}
	};
}

function TablePaginationActions(props) {
	const classes = useStyles1();
	const theme = useTheme();
	const {count, page, rowsPerPage, onChangePage, setFirst, first} = props;

	function handleFirstPageButtonClick(event) {
		onChangePage(event, 0);
		setFirst(0);
	}

	function handleBackButtonClick(event) {
		onChangePage(event, page - 1);
		setFirst(first - 5);
	}

	function handleNextButtonClick(event) {
		onChangePage(event, page + 1);
		setFirst(first + 5);
	}

	function handleLastPageButtonClick(event) {
		onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
		setFirst(count - (count % rowsPerPage));
	}

	return (
		<div className={classes.root}>
			<span>{first + 1}-{(first + 5 > count) ? count : first + 5}/{count}</span>
			<IconButton
				disabled={first === 0}
				aria-label="First Page"
				onClick={handleFirstPageButtonClick}
			>
				{theme.direction === 'rtl' ? <LastPageIcon/> : <FirstPageIcon/>}
			</IconButton>
			<IconButton disabled={first === 0} aria-label="Previous Page" onClick={handleBackButtonClick}>
				{theme.direction === 'rtl' ? <KeyboardArrowRight/> : <KeyboardArrowLeft/>}
			</IconButton>
			<IconButton
				disabled={(count / (first + 5)) < 1}
				aria-label="Next Page"
				onClick={handleNextButtonClick}
			>
				{theme.direction === 'rtl' ? <KeyboardArrowLeft/> : <KeyboardArrowRight/>}
			</IconButton>
			<IconButton
				disabled={(count / (first + 5)) < 1}
				aria-label="Last Page"
				onClick={handleLastPageButtonClick}
			>
				{theme.direction === 'rtl' ? <FirstPageIcon/> : <LastPageIcon/>}
			</IconButton>
		</div>
	);
}

TablePaginationActions.propTypes = {
	count: PropTypes.number.isRequired,
	onChangePage: PropTypes.func.isRequired,
	page: PropTypes.number.isRequired,
	rowsPerPage: PropTypes.number.isRequired,
	setFirst: PropTypes.func.isRequired,
	first: PropTypes.string.isRequired
};
