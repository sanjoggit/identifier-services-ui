import React from 'react';
import PropTypes from 'prop-types';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import {Table, TableBody, TableCell, TableHead, TableFooter, TablePagination, TableRow, TableSortLabel, Paper, IconButton} from '@material-ui/core';
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

const headRows = [
	{id: 'sn', label: 'SN'},
	{id: 'name', label: 'Name'},
	{id: 'age', label: 'Age'}
];

function EnhancedTableHead(props) {
	const {order, orderBy, onRequestSort} = props;
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
	orderBy: PropTypes.string.isRequired
};

const useStyles = makeStyles(theme => ({
	root: {
		width: '100%',
		marginTop: theme.spacing(3)
	},
	paper: {
		width: '100%',
		marginBottom: theme.spacing(2)
	},
	table: {
		minWidth: 500
	},
	tableWrapper: {
		overflowX: 'auto'
	}
}));

function EnhancedTable(props) {
	const classes = useStyles();
	const [order, setOrder] = React.useState('asc');
	const [orderBy, setOrderBy] = React.useState('calories');
	const [page, setPage] = React.useState(0);
	const [rowsPerPage, setRowsPerPage] = React.useState(5);

	function handleRequestSort(event, property) {
		const isDesc = orderBy === property && order === 'desc';
		setOrder(isDesc ? 'asc' : 'desc');
		setOrderBy(property);
	}

	function handleChangePage(event, newPage) {
		setPage(newPage);
	}

	function handleChangeRowsPerPage(event) {
		setRowsPerPage(Number(event.target.value));
	}

	const emptyRows = rowsPerPage - Math.min(rowsPerPage, props.data.length - page * rowsPerPage);
	const {data, handlePublisherClick} = props;
	return (
		<Paper className={classes.paper}>
			<Table
				className={classes.table}
				aria-labelledby="tableTitle"
			>
				<EnhancedTableHead
					order={order}
					orderBy={orderBy}
					rowCount={data.length}
					onRequestSort={handleRequestSort}
				/>
				<TableBody>
					{stableSort(data, getSorting(order, orderBy))
						.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
						.map((row, index) => {
							return (
								<TableRow key={row.name}>
									<TableCell align="left">{`${index + 1}`}</TableCell>
									<TableCell component="th" iscope="row" onClick={() => handlePublisherClick(row.id)}>
										{row.name}
									</TableCell>
									<TableCell align="left">{row.age}</TableCell>
								</TableRow>
							);
						})}
					{emptyRows > 0 && (
						<TableRow style={{height: 49 * emptyRows}}>
							<TableCell colSpan={6}/>
						</TableRow>
					)}
				</TableBody>
				<TableFooter>
					<TableRow>
						<TablePagination
							rowsPerPageOptions={[5, 10, 25]}
							colSpan={3}
							count={data.length}
							rowsPerPage={rowsPerPage}
							page={page}
							SelectProps={{
								inputProps: {'aria-label': 'Rows per page'},
								native: true
							}}
							ActionsComponent={TablePaginationActions}
							onChangePage={handleChangePage}
							onChangeRowsPerPage={handleChangeRowsPerPage}
						/>
					</TableRow>
				</TableFooter>
			</Table>
		</Paper>
	);
}

export default EnhancedTable;

EnhancedTable.propTypes = {
	data: PropTypes.array.isRequired,
	handlePublisherClick: PropTypes.func.isRequired
};

function TablePaginationActions(props) {
	const classes = useStyles1();
	const theme = useTheme();
	const {count, page, rowsPerPage, onChangePage} = props;

	function handleFirstPageButtonClick(event) {
		onChangePage(event, 0);
	}

	function handleBackButtonClick(event) {
		onChangePage(event, page - 1);
	}

	function handleNextButtonClick(event) {
		onChangePage(event, page + 1);
	}

	function handleLastPageButtonClick(event) {
		onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
	}

	return (
		<div className={classes.root}>
			<IconButton
				disabled={page === 0}
				aria-label="First Page"
				onClick={handleFirstPageButtonClick}
			>
				{theme.direction === 'rtl' ? <LastPageIcon/> : <FirstPageIcon/>}
			</IconButton>
			<IconButton disabled={page === 0} aria-label="Previous Page" onClick={handleBackButtonClick}>
				{theme.direction === 'rtl' ? <KeyboardArrowRight/> : <KeyboardArrowLeft/>}
			</IconButton>
			<IconButton
				disabled={page >= Math.ceil(count / rowsPerPage) - 1}
				aria-label="Next Page"
				onClick={handleNextButtonClick}
			>
				{theme.direction === 'rtl' ? <KeyboardArrowLeft/> : <KeyboardArrowRight/>}
			</IconButton>
			<IconButton
				disabled={page >= Math.ceil(count / rowsPerPage) - 1}
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
	rowsPerPage: PropTypes.number.isRequired
};
