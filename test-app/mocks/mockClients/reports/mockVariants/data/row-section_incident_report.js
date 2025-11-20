// @ts-nocheck
const parentData = () => {
  return [
    {
      type: 'Self harm',
      date: '25 April 2025, 11:55',
      reportedBy: 'Lando Calrissian',
      status: 'Awaiting analysis',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      incidentId: 'incidentId1234',
    },
  ]
}

const section2Data = () => {
  return [
    {
      prisonerName: 'Han Solo',
      prisonerDetails: 'Role: Perpertrator. Outcome: No outcome. Details: No comment',
      incidentId: 'incidentId1234',
    },
  ]
}

const section3Data = () => {
  return [
    {
      staffName: 'Homer Simpson',
      staffDetails: 'Role: Actively involved. Details: No comment',
      incidentId: 'incidentId1234',
    },
    {
      staffName: 'Ned Flanders',
      staffDetails: 'Role: Actively involved. Details: No comment',
      incidentId: 'incidentId1234',
    },
  ]
}

const section4Data = () => {
  return [
    {
      incidentQuestion: 'Where did the incident take place?',
      incidentResponse: 'cell',
      incidentId: 'incidentId1234',
    },
    {
      incidentQuestion: 'Did self harm method involve hanging?',
      incidentResponse: 'No',
      incidentId: 'incidentId1234',
    },
    {
      incidentQuestion: 'Did self harm method involve cutting?',
      incidentResponse: 'Yes',
      incidentId: 'incidentId1234',
    },
    {
      incidentQuestion: 'Was treatment administered',
      incidentResponse: 'Yes',
      incidentId: 'incidentId1234',
    },
  ]
}

module.exports = {
  parentData,
  section2Data,
  section3Data,
  section4Data,
}
