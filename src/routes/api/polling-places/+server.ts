import { error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = ({ url }) => {
	const pollingPlaceId = Number(url.searchParams.get('pollingPlaceId') ?? '0');
	if (isNaN(pollingPlaceId) || pollingPlaceId < 0) {
		error(400, 'Invalid polling place.');
	}
	
	const returnData = {
		divisionId: 213,
		divisionName: 'Gippsland',
		currentMember: {
			surname: 'Chester',
			givenName: 'Darren',
			party: 'The Nationals',
			address1: 'Level 1, 89 Raymond Street',
			suburb: 'Sale',
			state: 'VIC',
			postCode: '3850',
			phone: '(03) 5144 6744'
		},
		candidates: [
			{
				surname: 'Chester',
				givenName: 'Darren',
				party: 'The Nationals'
			},
			{
				surname: 'Forster',
				givenName: 'Gregory Emil',
				party: 'United Australia Party'
			},
			{
				surname: 'Langley',
				givenName: 'Jannette',
				party: 'Australian Labor Party'
			},
			{
				surname: 'McDonald',
				givenName: 'Jim',
				party: 'Liberal Democrats'
			},
			{
				surname: 'Thorpe',
				givenName: 'Marjorie',
				party: 'The Greens'
			},
		]
	};
	
	return new Response(JSON.stringify(returnData));
};
