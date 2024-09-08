import type { RequestEvent } from '@sveltejs/kit';
import { parse } from 'csv-parse/sync';
import type {
  Candidate,
  Divsion,
  DivisionWithMemberAndCandidates,
  Member,
  PollingPlace,
  PollingPlaceWithSnagData,
} from '../types/apiData';

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

  const allMembersData = await getMemberData(fetch);
  const member = allMembersData.find((m) => m.divisionName == name);

  const allCandidatesData = await getCandidateData(fetch);
  const candidates = allCandidatesData.filter((c) => c.divisionName == name);

  return {
    ...division,
    currentMember: member,
    candidates,
  } as DivisionWithMemberAndCandidates;
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
  const fileName = 'Federal_Electoral_Boundaries.csv';
  const csvData = await loadCSVData<CSVDivision>(fileName, fetch);
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
  const fileName = 'GeneralPollingPlacesDownload-27966.csv';
  const csvData = await loadCSVData<CSVPollingPlace>(fileName, fetch);
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
  const fileName = 'HouseCandidatesDownload-27966.csv';
  const csvData = await loadCSVData<CSVCandidate>(fileName, fetch);
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
  const fileName = 'FamilynameRepsCSV.csv';
  const csvData = await loadCSVData<CSVMember>(fileName, fetch);
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
