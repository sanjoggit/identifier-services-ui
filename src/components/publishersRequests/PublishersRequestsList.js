import React from 'react';

export default function () {
	const test = 'Publisher List component';
	const component = (
		<h1 style={{marginTop: '200px'}}>{test}</h1>
	);

	return {
		...component
	};
}
