mira courrio un error ya q use el sdk 55 peor ese no fucniona en expo go del celular porque useasa el sdk 55 peor quiero usar el 54 para poder ver lo q hace desd emi celular por ende ahora este proyecto use el sdk 54 , por ende hya varios cosas q no compilan aqui creo , ya q en el otro del sdk 55 tambien instale react native reuitilizales para componenetes peor AHORA NO LOQ UIERO USAR , REPITO NO LO QUIERO USAR AQUI YA Q TODAS LAS VENTAS QUE COOQUE AQUI YA NO TIENEN ESOS COMPONENTE REUSABLES SINO SUS ESTILSO ESTAN DEBAJO DE C ADA PANTALLA Y SI CREE COMPONENET S PROPIOS REUTILIZABLES POR ENDE , NECESITO TU AYUDA PARA PARA SOLUCIONA LSO ERRORES YA Q ESAT APP EN EL EL SDK 55 SI FUCNIAONABA BIEN YC OMO TE DIGO ALINEADO A REACT NATIVE REUSABLES TAMBIEN , por ende solo quieor eso q solucione slos errores y tambien use estilos por ende quoeor q los pongas aqui asi como estan ya q ahi tambien uso tailwind con el sdk 55 PERO AQUI NO E SNECESRAIO SOLO NSOE COMO SE HARIAN SOLO CREAR UN ARCVIO O NOSE TU SOLCUIONA PERO NO QUIEOR TAILWIND YA QUE AQUI NNO USAMOS TAILWWIND , por ende dime si me entendiste antes de inciiar te paso lo q creo : global.d.ts: declare module '*.css' {
  const content: { [className: string]: string } | string;
  export default content;
}

declare module '@/global.css';
, global.css : @tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --background: 0 0% 100%;
  --foreground: 240 10% 3.9%;
  --card: 0 0% 100%;
  --card-foreground: 240 10% 3.9%;
  --popover: 0 0% 100%;
  --popover-foreground: 240 10% 3.9%;
  --primary: 240 5.9% 10%;
  --primary-foreground: 0 0% 98%;
  --secondary: 240 4.8% 95.9%;
  --secondary-foreground: 240 5.9% 10%;
  --muted: 240 4.8% 95.9%;
  --muted-foreground: 240 3.8% 46.1%;
  --accent: 240 4.8% 95.9%;
  --accent-foreground: 240 5.9% 10%;
  --destructive: 0 84.2% 60.2%;
  --destructive-foreground: 0 0% 98%;
  --border: 240 5.9% 90%;
  --input: 240 5.9% 90%;
  --ring: 240 10% 3.9%;
  --radius: 0.75rem;

  --font-sans: Spline Sans, Inter, ui-sans-serif, system-ui, sans-serif;
  --font-mono: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, Liberation Mono,
    Courier New, monospace;
  --font-rounded: 'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic',
    sans-serif;
  --font-serif: Georgia, 'Times New Roman', serif;
}

.dark:root {
  --background: 240 10% 3.9%;
  --foreground: 0 0% 98%;
  --card: 240 10% 3.9%;
  --card-foreground: 0 0% 98%;
  --popover: 240 10% 3.9%;
  --popover-foreground: 0 0% 98%;
  --primary: 0 0% 98%;
  --primary-foreground: 240 5.9% 10%;
  --secondary: 240 3.7% 15.9%;
  --secondary-foreground: 0 0% 98%;
  --muted: 240 3.7% 15.9%;
  --muted-foreground: 240 5% 64.9%;
  --accent: 240 3.7% 15.9%;
  --accent-foreground: 0 0% 98%;
  --destructive: 0 62.8% 30.6%;
  --destructive-foreground: 0 0% 98%;
  --border: 240 3.7% 15.9%;
  --input: 240 3.7% 15.9%;
  --ring: 240 4.9% 83.9%;
}

@layer base {
  * {
    @apply border-border;
  }

  body {
    @apply bg-background text-foreground;
  }
}

, lib/theme.ts : import { Fonts } from '@/constants/theme';

export const THEME = {
  light: {
    background: '0 0% 100%',
    foreground: '240 10% 3.9%',
    card: '0 0% 100%',
    cardForeground: '240 10% 3.9%',
    popover: '0 0% 100%',
    popoverForeground: '240 10% 3.9%',
    primary: '240 5.9% 10%',
    primaryForeground: '0 0% 98%',
    secondary: '240 4.8% 95.9%',
    secondaryForeground: '240 5.9% 10%',
    muted: '240 4.8% 95.9%',
    mutedForeground: '240 3.8% 46.1%',
    accent: '240 4.8% 95.9%',
    accentForeground: '240 5.9% 10%',
    destructive: '0 84.2% 60.2%',
    destructiveForeground: '0 0% 98%',
    border: '240 5.9% 90%',
    input: '240 5.9% 90%',
    ring: '240 10% 3.9%',
    radius: '0.75rem',
  },
  dark: {
    background: '240 10% 3.9%',
    foreground: '0 0% 98%',
    card: '240 10% 3.9%',
    cardForeground: '0 0% 98%',
    popover: '240 10% 3.9%',
    popoverForeground: '0 0% 98%',
    primary: '0 0% 98%',
    primaryForeground: '240 5.9% 10%',
    secondary: '240 3.7% 15.9%',
    secondaryForeground: '0 0% 98%',
    muted: '240 3.7% 15.9%',
    mutedForeground: '240 5% 64.9%',
    accent: '240 3.7% 15.9%',
    accentForeground: '0 0% 98%',
    destructive: '0 62.8% 30.6%',
    destructiveForeground: '0 0% 98%',
    border: '240 3.7% 15.9%',
    input: '240 3.7% 15.9%',
    ring: '240 4.9% 83.9%',
    radius: '0.75rem',
  },
} as const;

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
      primary: 'hsl(240 5.9% 10%)',
      background: 'hsl(0 0% 100%)',
      card: 'hsl(0 0% 100%)',
      text: 'hsl(240 10% 3.9%)',
      border: 'hsl(240 5.9% 90%)',
      notification: 'hsl(0 84.2% 60.2%)',
    },
  },
  dark: {
    dark: true,
    fonts: navFonts,
    colors: {
      primary: 'hsl(0 0% 98%)',
      background: 'hsl(240 10% 3.9%)',
      card: 'hsl(240 10% 3.9%)',
      text: 'hsl(0 0% 98%)',
      border: 'hsl(240 3.7% 15.9%)',
      notification: 'hsl(0 62.8% 30.6%)',
    },
  },
} as const;, lib/utils.ts : import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}, constants/theme.ts: /**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import '@/global.css';

import { Platform } from 'react-native';

export const Colors = {
  light: {
    text: '#000000',
    background: '#ffffff',
    backgroundElement: '#F0F0F3',
    backgroundSelected: '#E0E1E6',
    textSecondary: '#60646C',
  },
  dark: {
    text: '#ffffff',
    background: '#000000',
    backgroundElement: '#212225',
    backgroundSelected: '#2E3135',
    textSecondary: '#B0B4BA',
  },
} as const;

export type ThemeColor = keyof typeof Colors.light & keyof typeof Colors.dark;

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: 'var(--font-display)',
    serif: 'var(--font-serif)',
    rounded: 'var(--font-rounded)',
    mono: 'var(--font-mono)',
  },
});

export const Spacing = {
  half: 2,
  one: 4,
  two: 8,
  three: 16,
  four: 24,
  five: 32,
  six: 64,
} as const;

export const BottomTabInset = Platform.select({ ios: 50, android: 80 }) ?? 0;
export const MaxContentWidth = 800;
, yap listo VUEVOA AREPETIR LOQ  QTE PASE ES LO Q TENIA CONEL SDK 55 Y REACT NATIVE REUTILIZABLES POR ENDE AHOAR USARE EL 54 Y ADAPTALO A LO Q YA TENIA , SI TIENES UDAS ANTES D EOCMENZAR PREGUNTAME , SINO DAME EL PLAN 