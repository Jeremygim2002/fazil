import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ActionButton } from '@/components/action-button';
import { TabsHeader } from '@/components/tabs-header';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

export default function UploadScreen() {
  const router = useRouter();

  return (
    <ThemedView style={styles.safeArea}>
      <SafeAreaView style={styles.safeAreaInset}>
        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          <TabsHeader />

          <ThemedView type="backgroundElement" style={styles.uploadCard}>
            <View style={styles.uploadIcon}>
              <Ionicons name="cloud-upload-outline" size={28} color="#0b3b78" />
            </View>
            <ThemedText type="smallBold" style={styles.uploadTitle}>
              Subir comprobante
            </ThemedText>
            <ThemedText themeColor="textSecondary" style={styles.uploadText}>
              Sube una foto o archivo del comprobante y luego valida la información en el mismo formulario.
            </ThemedText>
            <ActionButton
              label="Seleccionar archivo"
              icon={<Ionicons name="image-outline" size={18} color="#ffffff" />}
              style={styles.uploadButton}
            />
          </ThemedView>

          <ThemedView type="backgroundElement" style={styles.infoCard}>
            <ThemedText type="smallBold" style={styles.infoTitle}>
              Mismo formulario de validación
            </ThemedText>
            <ThemedText themeColor="textSecondary" style={styles.infoText}>
              Después de subir el comprobante vas a revisar RUC, factura, fecha, subtotal e IGV en la misma pantalla que usa la cámara.
            </ThemedText>
          </ThemedView>

          <ActionButton
            label="Continuar"
            icon={<Ionicons name="arrow-forward" size={18} color="#ffffff" />}
            onPress={() => router.push('/scanner-form')}
            style={styles.primaryButton}
          />
        </ScrollView>
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  safeAreaInset: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 18,
    paddingBottom: 32,
  },
  uploadCard: {
    marginTop: 8,
    borderRadius: 18,
    padding: 18,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    alignItems: 'center',
    gap: 8,
  },
  uploadIcon: {
    width: 52,
    height: 52,
    borderRadius: 16,
    backgroundColor: '#eaf2ff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  uploadTitle: {
    fontSize: 16,
    color: '#111827',
  },
  uploadText: {
    fontSize: 12,
    textAlign: 'center',
  },
  infoCard: {
    marginTop: 18,
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    gap: 6,
  },
  infoTitle: {
    fontSize: 15,
    color: '#111827',
  },
  infoText: {
    fontSize: 13,
    lineHeight: 19,
  },
  uploadButton: {
    marginTop: 6,
    alignSelf: 'stretch',
  },
  primaryButton: {
    marginTop: 18,
    alignSelf: 'stretch',
  },
});
