import { type ReactNode } from 'react';
import { Pressable, StyleSheet, View, type PressableProps, type StyleProp, type TextStyle, type ViewStyle } from 'react-native';

import { ThemedText } from '@/components/themed-text';

type ActionButtonVariant = 'primary' | 'secondary';

type ActionButtonProps = PressableProps & {
  label: string;
  icon?: ReactNode;
  variant?: ActionButtonVariant;
  textStyle?: StyleProp<TextStyle>;
  contentStyle?: StyleProp<ViewStyle>;
  style?: StyleProp<ViewStyle>;
};

export function ActionButton({ label, icon, variant = 'primary', textStyle, contentStyle, style, ...props }: ActionButtonProps) {
  return (
    <Pressable
      accessibilityRole="button"
      style={[styles.base, variant === 'primary' ? styles.primary : styles.secondary, style as StyleProp<ViewStyle>]}
      {...props}>
      <View style={[styles.content, contentStyle]}>
        {icon ? <View style={styles.icon}>{icon}</View> : null}
        <ThemedText style={[styles.label, variant === 'primary' ? styles.primaryLabel : styles.secondaryLabel, textStyle]}>
          {label}
        </ThemedText>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 18,
  },
  primary: {
    backgroundColor: '#0b3b78',
  },
  secondary: {
    backgroundColor: '#f3f4f6',
    borderWidth: 1,
    borderColor: '#cbd5e1',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  icon: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontWeight: '800',
    fontSize: 14,
    letterSpacing: 0.6,
  },
  primaryLabel: {
    color: '#ffffff',
  },
  secondaryLabel: {
    color: '#0f172a',
  },
});