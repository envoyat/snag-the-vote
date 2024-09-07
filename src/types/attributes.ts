export interface ElectoralDivision {
  objectid: number;
  elect_div: string;
}

export interface PollingPlace {
  __OBJECTID: number;
  State: string;
  DivisionID: number;
  DivisionNm: string;
  PollingPlaceID: number;
  PollingPlaceTypeID: number;
  PollingPlaceNm: string;
  PremisesNm: string;
  PremisesAddress1: string;
  PremisesAddress2: string;
  PremisesAddress3: string;
  PremisesSuburb: string;
  PremisesStateAb: string;
  PremisesPostCode: number;
  Latitude: number;
  Longitude: number;
}

export type SelectionAttributes = ElectoralDivision | PollingPlace;

export const isElectoralDivision = (attr: SelectionAttributes): attr is ElectoralDivision =>
  'elect_div' in attr;

export const isPollingPlace = (attr: SelectionAttributes): attr is PollingPlace =>
  'PollingPlaceID' in attr;
