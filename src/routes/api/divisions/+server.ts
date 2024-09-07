import { error } from '@sveltejs/kit';
import { getDivisionDataByName } from '$lib/dataProvider'
import type { RequestHandler } from './$types';

export const GET: RequestHandler = ({ url }) => {
  const divisionName = String(url.searchParams.get('divisionName'));
  if (!divisionName) {
    error(400, 'Invalid division.');
  }
  
  const divisionData = getDivisionDataByName(divisionName);
  
  return new Response(JSON.stringify(divisionData));
};
