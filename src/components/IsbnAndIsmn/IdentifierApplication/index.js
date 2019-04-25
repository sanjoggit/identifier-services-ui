import React, {useState} from 'react';
import RenderTwoColComponent from '../../RenderTwoColComponent';
import RenderSelectInput from '../../RenderSelectInput';

const IdentifierApplication = () => {
	const initialState = {value: '', labelWidth: 0};
	const [state, setState] = useState(initialState);

	const identifierApplicationRender = [
		{
			title: 'ISBN and ISMN identifier application form',
			paragraph: [
				'If your publishing activities are occasional or you already have joined the ISBN system, please complete this application form for an ISBN.',
				'If you publish regularly (e.g., at least one publication each year) and you have not joined the ISBN system, please complete both the application form for the ISBN system and this application form for an ISBN.'
			],
			sideTitle: 'Monograph Publishing',
			linkLists: [
				{
					label: 'Application to Join the ISBN/ISMN System (Publisher Register)'
				},
				{
					label: 'ISBN and ISMN identifier application form'
				},
				{
					label: 'Publisher Register'
				},
				{
					label: 'Change contact information'
				},
				{
					label: 'The Finnish ISBN Agency'
				}
			],
			select: [
				{
					label: 'Publication',
					id: 'publication',
					options: [
						{name: 'Book, booklet', id: 'bookbooklet'},
						{name: 'Dissertation', id: 'dissertation'},
						{name: 'Notated music', id: 'notatedMusic'},
						{name: 'Map', id: 'map'},
						{name: 'Other', id: 'other'}
					]
				}
			]
		}
	];

	const handleChange = event => {
		setState({...state, value: event.target.value});
	};

	const handleSubmit = e => {
		e.preventDefault();
		console.log(state);
	};

	return (
		<>
			<RenderTwoColComponent data={identifierApplicationRender}/>
			{identifierApplicationRender.map(
				item =>
					item.select.length !== 0 && (
						<RenderSelectInput
							{...state}
							key={`${item.label}render`}
							data={item.select}
							handleChange={handleChange}
							handleSubmit={handleSubmit}
						/>
					)
			)}
		</>
	);
};

export default IdentifierApplication;
