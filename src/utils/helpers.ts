import dayjs from 'dayjs';

export const processUrlVariables = (
  url: string,
  variables: Record<string, any>
) => {
  let processedUrl = url;
  const values = { ...variables };
  const query = { ...(values.query || {}) };
  delete values.query;

  Object.keys(values).forEach((key) => {
    processedUrl = processedUrl.replace(`:${key}`, variables[key]);
  });

  if (query) {
    Object.keys(query).forEach((key) => {
      if (query[key] === undefined) {
        delete query[key];
      }
    });

    const queryString = new URLSearchParams(query).toString();
    processedUrl = `${processedUrl}?${queryString}`;
  }

  return processedUrl;
};

export const generateTimeSlots = (selectedDate: any) => {
  let timesArray = [];
  const now = dayjs();
  let startHour = 0;
  let startMinute = 0;

  if (selectedDate.isSame(now, 'day')) {
    startHour = now.hour() + 1;
    startMinute = 0;
  }

  const endHour = 23;

  for (let hour = startHour; hour <= endHour; hour++) {
    for (let minute = startMinute; minute < 60; minute += 30) {
      timesArray.push(dayjs().hour(hour).minute(minute).second(0));
    }
    startMinute = 0;
  }

  return timesArray;
};

export const replaceChar = (str: string) => {
  return str?.replace(/[^a-zA-Z0-9]/g, ' ');
};

export const usStates = [
  'Alabama',
  'Alaska',
  'Arizona',
  'Arkansas',
  'California',
  'Colorado',
  'Connecticut',
  'Delaware',
  'Florida',
  'Georgia',
  'Hawaii',
  'Idaho',
  'Illinois',
  'Indiana',
  'Iowa',
  'Kansas',
  'Kentucky',
  'Louisiana',
  'Maine',
  'Maryland',
  'Massachusetts',
  'Michigan',
  'Minnesota',
  'Mississippi',
  'Missouri',
  'Montana',
  'Nebraska',
  'Nevada',
  'New Hampshire',
  'New Jersey',
  'New Mexico',
  'New York',
  'North Carolina',
  'North Dakota',
  'Ohio',
  'Oklahoma',
  'Oregon',
  'Pennsylvania',
  'Rhode Island',
  'South Carolina',
  'South Dakota',
  'Tennessee',
  'Texas',
  'Utah',
  'Vermont',
  'Virginia',
  'Washington',
  'West Virginia',
  'Wisconsin',
  'Wyoming',
];

export const formatDateToYYYYMMDD = (dateString: string) => {
  const date = new Date(dateString);

  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');

  return `${year}-${month}-${day}`;
};
