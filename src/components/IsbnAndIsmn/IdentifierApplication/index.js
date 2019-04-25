import React, { useState } from 'react'
import RenderTwoColComponent from '../../RenderTwoColComponent';
import RenderSelectInput from '../../RenderSelectInput';

const IdentifierApplication = (props) => {
	const { classes } = props;

	const initialState = { value: "", labelWidth: 0 };
	const [state, setState] = useState(initialState);

	const identifierApplicationRender = [{
		title: "ISBN and ISMN identifier application form",
		paragraph: [
			"If your publishing activities are occasional or you already have joined the ISBN system, please complete this application form for an ISBN.",
			"If you publish regularly (e.g., at least one publication each year) and you have not joined the ISBN system, please complete both the application form for the ISBN system and this application form for an ISBN."
		],
		sideTitle: "Monograph Publishing",
		linkLists: [
			{
				label: "Application to Join the ISBN/ISMN System (Publisher Register)"
			},
			{
				label: "ISBN and ISMN identifier application form"
			},
			{
				label: "Publisher Register"
			},
			{
				label: "Change contact information"
			},
			{
				label: "The Finnish ISBN Agency"
			}
		],
		select: {
			label: "The publication is",
			options: [
				{ name: "Book, booklet", id: "bookbooklet" },
				{ name: "Dissertation", id: "dissertation" },
				{ name: "Notated music", id: "notatedMusic" },
				{ name: "Map", id: "map" },
				{ name: "Other", id: "other" }
			]
		}
	}]

	const handleChange = (event) => {
		setState({ ...state, value: event.value })
	}

	return (
		<>
			<RenderTwoColComponent data={identifierApplicationRender} />
			<RenderSelectInput data={identifierApplicationRender} />
		</>
	)
}

export default IdentifierApplication;