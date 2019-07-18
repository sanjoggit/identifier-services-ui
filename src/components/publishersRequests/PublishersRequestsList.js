import React, {useEffect} from 'react';
import {useCookies} from 'react-cookie';
import {connect} from 'react-redux';
import {Grid} from '@material-ui/core';

import * as actions from '../../store/actions';
import Spinner from '../Spinner';
import TableComponent from '../TableComponent';
import useStyles from '../../styles/publisherLists';

export default connect(mapStateToProps, actions)(props => {
	const {fetchPublishersRequestsList, publishersRequestsList, loading} = props;
	const [cookie] = useCookies('login-cookie');
	const classes = useStyles();

	useEffect(() => {
		fetchPublishersRequestsList(cookie['login-cookie']);
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const headRows = [
		{id: 'name', label: 'Name'},
		{id: 'language', label: 'Language'}
	];

	let publishersRequestsData;
	if ((publishersRequestsList === undefined) || (loading)) {
		publishersRequestsData = <Spinner/>;
	} else if (publishersRequestsList.length === 0) {
		publishersRequestsData = <p>No Data</p>;
	} else {
		publishersRequestsData = (
			<TableComponent
				data={publishersRequestsList
					.map(item => publishersRequestsRender(item._id, item.name, item.language))}
				//handleTableRowClick={handleTableRowClick}
				headRows={headRows}
			/>
		);
	}

	function publishersRequestsRender(id, name, language) {
		return {
			id: id,
			name: name,
			language: language
		};
	}

	console.log('publishersRequestsList', publishersRequestsList);
	const component = (
		<Grid>
			<Grid item xs={12} className={classes.publisherListSearch}>
				{publishersRequestsData}
			</Grid>
		</Grid>
	);
	return {
		...component
	};
});

function mapStateToProps(state) {
	return ({
		loading: state.publisher.loading,
		publishersRequestsList: state.publisher.publishersRequestsList.PublisherRequests
	});
}