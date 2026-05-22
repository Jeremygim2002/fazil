import { Colors, Fonts } from '@/constants/theme';

const navFonts = {
  regular: { fontFamily: Fonts.sans, fontWeight: '400' },
  medium: { fontFamily: Fonts.sans, fontWeight: '500' },
  bold: { fontFamily: Fonts.sans, fontWeight: '700' },
  heavy: { fontFamily: Fonts.sans, fontWeight: '900' },
} as const;

export const NAV_THEME = {
  light: {
    dark: false,
    fonts: navFonts,
    colors: {
      primary: Colors.light.tint,
      background: Colors.light.background,
      card: Colors.light.background,
      text: Colors.light.text,
      border: Colors.light.backgroundElement,
      notification: '#dc2626',
    },
  },
  dark: {
    dark: true,
    fonts: navFonts,
    colors: {
      primary: Colors.dark.tint,
      background: Colors.dark.background,
      card: Colors.dark.background,
      text: Colors.dark.text,
      border: Colors.dark.backgroundElement,
      notification: '#b91c1c',
    },
  },
} as const;
