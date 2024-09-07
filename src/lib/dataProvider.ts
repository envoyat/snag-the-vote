export const getPollingPlaceData = (id: number) => {
  return {
    id: id,
    divisionId: 213,
    divisionName: 'Gippsland',
    snagData: {
      votePercent: 0.94,
      preferences: {
        sausageTomatoSauceOnion: 0.3,
        sausageTomatoSauce: 0.35,
        sausageOnly: 0.1,
        sausageOnion: 0.25
      }
    }
  };
};

const divisionData = {
  id: 213,
  name: 'Gippsland',
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

export const getDivisionDataById = (id: number) => {
  return divisionData;
};

export const getDivisionDataByName = (name: string) => {
  return divisionData;
};
