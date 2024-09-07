import { error } from '@sveltejs/kit';
import { getDivisionDataById, getPollingPlaceData } from '$lib/dataProvider'
import type { RequestHandler } from './$types';

export const GET: RequestHandler = ({ url }) => {
  const pollingPlaceId = Number(url.searchParams.get('pollingPlaceId') ?? '0');
  if (isNaN(pollingPlaceId) || pollingPlaceId < 0) {
    error(400, 'Invalid polling place.');
  }

  const pollingPlaceData = getPollingPlaceData(pollingPlaceId);

  const divisionData = getDivisionDataById(pollingPlaceData.divisionId);
  
  const returnData = {
    division: divisionData,
    pollingPlace: pollingPlaceData
  };
  
  return new Response(JSON.stringify(returnData));
};
