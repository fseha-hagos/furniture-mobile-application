/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = '#0a7ea4';
const tintColorDark = '#fff';

export const Colors = {
  light: {
    text: '#11181C',
    background: '#fff',
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#ECEDEE',
    background: '#151718',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
  },
};

export default {
  primary: '#4864d5',
  primaryMuted: '#838db4',
  secondary: '#38A3A5',
  muted: '#3A5A92',
  background: '#F5F5F5',
  gray: '#626D77',
  dark: '#141518',
  lightGray: '#D8DCE2',
  extraLightGray: "#e5e8eb",
  green: '#4FEE57',
  lightGreen: '#DBFFCB',
  red: '#EF0827',
  yellow: '#FCC70B',
};

