import { useRouter } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function LoginSuccessScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.content}>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>OK</Text>
        </View>
        <Text style={styles.title}>Sesion iniciada</Text>
        <Text style={styles.description}>
          Tu cuenta fue validada correctamente. Ya puedes entrar a Fazil.
        </Text>
        <Pressable
          accessibilityRole="button"
          style={styles.button}
          onPress={() => router.replace('/(tabs)' as never)}>
          <Text style={styles.buttonText}>Entrar a Fazil</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f6f8fc',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 28,
  },
  badge: {
    width: 72,
    height: 72,
    borderRadius: 36,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#dcfce7',
    marginBottom: 22,
  },
  badgeText: {
    color: '#166534',
    fontSize: 18,
    fontWeight: '900',
  },
  title: {
    color: '#111827',
    fontSize: 28,
    fontWeight: '800',
    lineHeight: 34,
    textAlign: 'center',
  },
  description: {
    color: '#6b7280',
    fontSize: 16,
    lineHeight: 24,
    marginTop: 10,
    textAlign: 'center',
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#0b3b78',
    borderRadius: 14,
    justifyContent: 'center',
    marginTop: 30,
    minHeight: 58,
    paddingHorizontal: 28,
    width: '100%',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '800',
    lineHeight: 22,
  },
});
