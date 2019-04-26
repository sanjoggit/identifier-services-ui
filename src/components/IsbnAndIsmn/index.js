import React from 'react';
import RenderTwoColComponent from '../RenderTwoColComponent';

const IsbnAndIsmn = () => {
	const isbnAndIsmnRender = [
		{
			title: 'ISBN and ISMN',
			paragraph: [
				'ISBN identifies <b>books</b> and <b>ISMN notated music publications</b> intended for public use. The Finnish national ISBN Agency is responsible for handing out ISBNs and ISMNs in Finland. The Agency maintains a national publisher register and provides information about Finnish publishers for national and international use.',
				'Identifiers as a part of metadata serve the publishing industry and library sector in their entirety and support identification, processing and availability of publications. The identifiers are used, for example, in publishing industry\'s ordering and distribution systems to speed up the recognition of publications as well as international and domestic joint catalogues, bibliographies, library lending systems and information retrieval.',
				'Each book or sheet music publication and publication form (printed, audio-visual, digital) and each edition containing changes are rewarded a separate ISBN or ISMN. This promotes the identification of publications in the publishing industry\'s distribution chain and ensures that customers get the desired publication at their disposal. Publication format may be a printed book or an audiovisual or electronic recording.'
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
			]
		}
	];

	return <RenderTwoColComponent data={isbnAndIsmnRender}/>;
};

export default IsbnAndIsmn;
