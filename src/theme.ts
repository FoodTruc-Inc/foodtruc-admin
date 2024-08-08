import {
  DEFAULT_THEME,
  MantineProviderProps,
  createTheme,
} from '@mantine/core';

const color = [
  '#F9FAFB', // 0 lightGrey
  '#1BAC4B', // 1 green
  '#939393', // 2 grey
  '#FFFFFF', // 3 white
  '#E8F7ED', // 4 lighterGreen
  '#F75555', // 5 red
  '#F4F4F4', // 6 slightGrey
  '#ECECEC', // 7 border
  '#0F172A', // 8 darkBlue
  '#04220E', // 9 darkGreen
  '#000000', // 10 black
  '#DDFFE8', // 11 lightGreen
  '#637875', // 12 darkGrey
  '#212121', // 13 slightBlack
  '#FF8A00', // 14 orange
  '#08322C', // 15 darkGreen
  '#EEEEEE', // 16 lightestGrey
  '#FB9400', // 17 orange
  '#FFAB38', // 18 yellow
  '#616161', // 19 darkGrey
  '#CCCCCC', // 20 lightGrey
  '#E2E8F0', // 21 lightestGrey
  '#DEE2E6', // 22 Grey
  '#64748B', // 23 darkGrey
  '#475569', // 24 thirdGrey
  '#9E9E9E', // 25 thirdGrey
  '#E8EBF0', // 26 lightGrey
  '#020202', // 27 black
  '#333333', // 28 darkGrey
] as any;

export const theme: MantineProviderProps['theme'] = createTheme({
  fontFamily: `Urbanist, ${DEFAULT_THEME.fontFamily}`,
  colors: {
    color,
  },
});
