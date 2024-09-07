import type { RequestEvent } from '@sveltejs/kit';
import { parse } from 'csv-parse/sync';

export const getPollingPlaceData = async (id: number, fetch: RequestEvent['fetch']) => {
  const allPollingPlaceData = await getPollingPlacesData(fetch);
  const pollingPlace = allPollingPlaceData.find((p) => p.id == id);
  if (!pollingPlace) return null;

  return {
    ...pollingPlace,
    snagData: {
      votePercent: 0.94,
      preferences: {
        sausageTomatoSauceOnion: 0.3,
        sausageTomatoSauce: 0.35,
        sausageOnly: 0.1,
        sausageOnion: 0.25,
      },
    },
  } as PollingPlaceWithSnagData;
};

export const getDivisionDataByName = async (name: string, fetch: RequestEvent['fetch']) => {
  const allDivisionData = await getDivisionData(fetch);
  const division = allDivisionData.find((d) => d.name == name);

  console.log('found division', division);

  const allMembersData = await getMemberData(fetch);
  const member = allMembersData.find((m) => m.divisionName == name);

  const allCandidatesData = await getCandidateData(fetch);
  const candidates = allCandidatesData.filter((c) => c.divisionName == name);

  return {
    ...division,
    currentMember: member,
    candidates,
  } as DivsionWithMemberAndCandidates;
};

type Divsion = {
  name: string;
};

export type DivsionWithMemberAndCandidates = Divsion & {
  currentMember: Member;
  candidates: Array<Candidate>;
};

type PollingPlace = {
  id: number;
  divisionName: string;
  name: string;
  locationName: string;
  address1: string;
  suburb: string;
  postCode: string;
  state: string;
};

export type PollingPlaceWithSnagData = PollingPlace & {
  snagData: {
    votePercent: number;
    preferences: {
      sausageTomatoSauceOnion: number;
      sausageTomatoSauce: number;
      sausageOnly: number;
      sausageOnion: number;
    };
  };
};

export type Candidate = {
  surname: string;
  givenName: string;
  party: string;
  divisionName: string;
};

export type Member = Candidate & {
  address1: string;
  suburb: string;
  state: string;
  postCode: string;
  phone: string;
};

type CSVDivision = {
  objectid: string;
  elect_div: string;
  area_sqkm: string;
  sortname: string;
  globalid: string;
  e_div_numb: string;
  numccds: string;
  actual: string;
  projected: string;
  total_popu: string;
  australian: string;
  Shape__Area: string;
  Shape__Length: string;
};

const getDivisionData = async (fetch: RequestEvent['fetch']): Promise<Array<Divsion>> => {
  const headers = [
    'objectid',
    'elect_div',
    'area_sqkm',
    'sortname',
    'globalid',
    'e_div_numb',
    'numccds',
    'actual',
    'projected',
    'total_popu',
    'australian',
    'Shape__Area',
    'Shape__Length',
  ];
  const fileName = 'Federal_Electoral_Boundaries.csv';
  const csvData = await loadCSVData<CSVDivision>(fileName, headers, fetch);
  return csvData.map(
    (d) =>
      ({
        name: d.elect_div,
      }) as Divsion,
  );
};

type CSVPollingPlace = {
  State: string;
  DivisionID: string;
  DivisionNm: string;
  PollingPlaceID: string;
  PollingPlaceTypeID: string;
  PollingPlaceNm: string;
  PremisesNm: string;
  PremisesAddress1: string;
  PremisesAddress2: string;
  PremisesAddress3: string;
  PremisesSuburb: string;
  PremisesStateAb: string;
  PremisesPostCode: string;
  Latitude: string;
  Longitude: string;
};

const getPollingPlacesData = async (fetch: RequestEvent['fetch']): Promise<Array<PollingPlace>> => {
  const headers = [
    'State',
    'DivisionID',
    'DivisionNm',
    'PollingPlaceID',
    'PollingPlaceTypeID',
    'PollingPlaceNm',
    'PremisesNm',
    'PremisesAddress1',
    'PremisesAddress2',
    'PremisesAddress3',
    'PremisesSuburb',
    'PremisesStateAb',
    'PremisesPostCode',
    'Latitude',
    'Longitude',
  ];
  const fileName = 'GeneralPollingPlacesDownload-27966.csv';
  const csvData = await loadCSVData<CSVPollingPlace>(fileName, headers, fetch);
  return csvData.map(
    (d) =>
      ({
        id: parseInt(d.PollingPlaceID),
        divisionName: d.DivisionNm,
        name: d.PollingPlaceNm,
        locationName: d.PremisesNm,
        address1: d.PremisesAddress1,
        suburb: d.PremisesSuburb,
        postCode: d.PremisesPostCode,
        state: d.PremisesStateAb,
      }) as PollingPlace,
  );
};

type CSVCandidate = {
  StateAb: string;
  DivisionID: string;
  DivisionNm: string;
  PartyAb: string;
  PartyNm: string;
  CandidateID: string;
  Surname: string;
  GivenNm: string;
  Elected: string;
  HistoricElected: string;
};

const getCandidateData = async (fetch: RequestEvent['fetch']): Promise<Array<Candidate>> => {
  const headers = [
    'StateAb',
    'DivisionID',
    'DivisionNm',
    'PartyAb',
    'PartyNm',
    'CandidateID',
    'Surname',
    'GivenNm',
    'Elected',
    'HistoricElected',
  ];
  const fileName = 'HouseCandidatesDownload-27966.csv';
  const csvData = await loadCSVData<CSVCandidate>(fileName, headers, fetch);
  return csvData.map(
    (d) =>
      ({
        surname: d.Surname,
        givenName: d.GivenNm,
        party: d.PartyNm,
        divisionName: d.DivisionNm,
      }) as Candidate,
  );
};

type CSVMember = {
  Honorific: string;
  Salutation: string;
  'Post Nominals': string;
  Surname: string;
  'First Name': string;
  'Other Name': string;
  'Preferred Name': string;
  Initials: string;
  Electorate: string;
  State: string;
  'Political Party': string;
  Gender: string;
  Telephone: string;
  'Electorate Address Line 1': string;
  'Electorate Address Line 2': string;
  'Electorate Suburb': string;
  'Electorate State': string;
  'Electorate PostCode': string;
  'Electorate Telephone': string;
  'Electorate Fax': string;
  'Electorate TollFree': string;
  'Electorate Postal Address': string;
  'Electorate Postal Suburb': string;
  'Electorate Postal State': string;
  'Electorate Postal Postcode': string;
  'Label Address': string;
  'Label Suburb': string;
  'Label State': string;
  'Label Postcode': string;
  'Parliamentary Title': string;
  'Ministerial Title': string;
};

const getMemberData = async (fetch: RequestEvent['fetch']): Promise<Array<Member>> => {
  const headers = [
    'Honorific',
    'Salutation',
    'Post Nominals',
    'Surname',
    'First Name',
    'Other Name',
    'Preferred Name',
    'Initials',
    'Electorate',
    'State',
    'Political Party',
    'Gender',
    'Telephone',
    'Electorate Address Line 1',
    'Electorate Address Line 2',
    'Electorate Suburb',
    'Electorate State',
    'Electorate PostCode',
    'Electorate Telephone',
    'Electorate Fax',
    'Electorate TollFree',
    'Electorate Postal Address',
    'Electorate Postal Suburb',
    'Electorate Postal State',
    'Electorate Postal Postcode',
    'Label Address',
    'Label Suburb',
    'Label State',
    'Label Postcode',
    'Parliamentary Title',
    'Ministerial Title',
  ];
  const fileName = 'FamilynameRepsCSV.csv';
  const csvData = await loadCSVData<CSVMember>(fileName, headers, fetch);
  return csvData.map(
    (d) =>
      ({
        surname: d.Surname,
        givenName: d['First Name'],
        party: d['Political Party'],
        divisionName: d.Electorate,
        address1: d['Electorate Address Line 1'],
        suburb: d['Electorate Suburb'],
        state: d['Electorate State'],
        postCode: d['Electorate PostCode'],
        phone: d['Electorate Telephone'],
      }) as Member,
  );
};

const loadCSVData = async <T>(
  fileName: string,
  headers: Array<string>,
  fetch: RequestEvent['fetch'],
): Promise<Array<T>> => {
  const csvData = await fetch('/' + fileName);
  const csvText = await csvData.text();

  const csvRecords: Array<T> = parse(csvText, {
    columns: true,
    skip_empty_lines: true,
  });

  return csvRecords;
};
