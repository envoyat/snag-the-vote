export type Divsion = {
  name: string;
};

export type DivisionWithMemberAndCandidates = Divsion & {
  currentMember: Member;
  candidates: Array<Candidate>;
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

export type PollingPlace = {
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

export type DivisionAndPollingPlaceData = {
  division: DivisionWithMemberAndCandidates;
  pollingPlace: PollingPlaceWithSnagData;
};

export type APIDataItem = DivisionWithMemberAndCandidates | DivisionAndPollingPlaceData;

export const isAPIDivision = (attr: APIDataItem): attr is DivisionWithMemberAndCandidates =>
  'currentMember' in attr;

export const isAPIPollingPlace = (attr: APIDataItem): attr is DivisionAndPollingPlaceData =>
  'division' in attr;
