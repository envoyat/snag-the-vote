import { error } from '@sveltejs/kit';
import { getDivisionDataByName, getPollingPlaceData } from '$lib/dataProvider'
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ url, fetch }) => {
  const pollingPlaceId = Number(url.searchParams.get('pollingPlaceId') ?? '0');
  if (isNaN(pollingPlaceId) || pollingPlaceId < 0) {
    error(400, 'Invalid polling place.');
  }

  const pollingPlaceData = await getPollingPlaceData(pollingPlaceId, fetch);

  if (!pollingPlaceData) {
    error(400, 'Invalid polling place.');
  }

  const divisionData = await getDivisionDataByName(pollingPlaceData.divisionName, fetch);
  
  const returnData = {
    division: divisionData,
    pollingPlace: pollingPlaceData
  };
  
  return new Response(JSON.stringify(returnData));
};
