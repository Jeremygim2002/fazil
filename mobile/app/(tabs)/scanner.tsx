import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ActionButton } from '@/components/action-button';
import { TabsHeader } from '@/components/tabs-header';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { clearPendingExtractedDocument, clearPendingPurchaseValidation } from '@/services/extracted-document-store';

export default function ScannerScreen() {
  const router = useRouter();

  return (
    <ThemedView style={styles.safeArea}>
      <SafeAreaView style={styles.safeAreaInset}>
        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          <TabsHeader />

          <ThemedView type="backgroundElement" style={styles.captureCard}>
            <View style={styles.captureIcon}>
              <Ionicons name="scan" size={30} color="#0b3b78" />
            </View>
            <ThemedText type="subtitle" style={styles.captureTitle}>
              Escanear comprobante
            </ThemedText>
            <ThemedText themeColor="textSecondary" style={styles.captureText}>
              Usa la cámara para capturar tu factura y luego revisa los datos.
            </ThemedText>
            <ActionButton
              label="Siguiente"
              icon={<Ionicons name="arrow-forward" size={18} color="#ffffff" />}
              onPress={() => {
                clearPendingExtractedDocument();
                clearPendingPurchaseValidation();
                router.push('/scanner-form');
              }}
              style={styles.primaryButton}
            />
          </ThemedView>
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
  captureCard: {
    marginTop: 12,
    borderRadius: 18,
    padding: 20,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    alignItems: 'center',
  },
  captureIcon: {
    width: 64,
    height: 64,
    borderRadius: 16,
    backgroundColor: '#eaf2ff',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  captureTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#111827',
    textAlign: 'center',
  },
  captureText: {
    marginTop: 6,
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
  },
  primaryButton: {
    marginTop: 16,
    alignSelf: 'stretch',
  },
});
