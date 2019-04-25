import React from 'react'
import { Paper, Grid, withStyles, Typography, List, ListItem, ListItemText, Link, Divider } from '@material-ui/core';
import styles from '../../styles/isbAndIsmn'
import RenderTwoColComponent from '../RenderTwoColComponent';

const Issn = (props) => {
	const { classes } = props;

	const issn = [{
		title: "ISSN",
		paragraph: [
			"SSN identifies continuously published publications, as <b>journals</b> and series. The Finnish national ISSN Agency is responsible for providing the identifiers in Finland and sends the information about publications that have received an ISSN to the ISSN Portal database.",
			"Identifiers as a part of metadata serve the publishing industry and library sector in their entirety and support identification, processing and availability of publications.",
			"The identifiers are used, for example, in publishing industry's ordering and distribution systems to speed up the identification of publications as well as international and domestic joint catalogues, bibliographies, library lending systems and information retrieval. ISSN is inseparable with the title of the publication; if the title of the publication changes, the identifier must also be changed. A separate ISSN is given to various forms of publication."
		],
		sideTitle: "Monograph Publishing",
		linkLists: [
			{
				label: "ISSN identifier application from"
			},
			{
				label: "The Finnish ISSN Agency"
			}
		]
	}]

	return (
			<RenderTwoColComponent data={issn}/>
	)
}

export default withStyles(styles)(Issn)
