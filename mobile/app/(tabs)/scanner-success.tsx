import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ActionButton } from '@/components/action-button';
import { TabsHeader } from '@/components/tabs-header';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

export default function ScannerSuccessScreen() {
  const router = useRouter();

  return (
    <ThemedView style={styles.safeArea}>
      <SafeAreaView style={styles.safeAreaInset}>
        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          <TabsHeader />

          <View style={styles.titleRow}>
            <ThemedText type="subtitle" style={styles.title}>
              Detalles de Transacción
            </ThemedText>
          </View>

          <ThemedView type="backgroundElement" style={styles.heroCard}>
            <ThemedText themeColor="textSecondary" style={styles.heroLabel}>
              MONTO TOTAL
            </ThemedText>
            <ThemedText style={styles.heroAmount}>S/1,245.50</ThemedText>

            <View style={styles.confidencePill}>
              <Ionicons name="checkmark-circle-outline" size={18} color="#172554" />
              <ThemedText style={styles.confidenceText}>Confianza de IA: 98%</ThemedText>
            </View>
          </ThemedView>

          <ThemedView type="backgroundElement" style={styles.detailsCard}>
            <ThemedText type="smallBold" style={styles.detailsTitle}>
              Metadatos Técnicos
            </ThemedText>

            <DetailRow label="ID de Transacción" value="TXN-8472-991A-B4C2" icon="pricetag-outline" />
            <DetailRow label="Sincronización BigQuery" value="2023-10-27T14:32:01Z" icon="sync-outline" />
            <DetailRow label="Número de Constancia Fiscal" value="TCN-DE-482910" icon="document-text-outline" />
          </ThemedView>

          <ActionButton
            label="Ver Imagen Original"
            variant="secondary"
            icon={<Ionicons name="image-outline" size={18} color="#0f172a" />}
            style={styles.secondaryButton}
          />

          <ActionButton
            label="Volver al Inicio"
            icon={<Ionicons name="home-outline" size={18} color="#ffffff" />}
            onPress={() => router.replace('/(tabs)' as never)}
            style={styles.primaryButton}
          />
        </ScrollView>
      </SafeAreaView>
    </ThemedView>
  );
}

function DetailRow({ label, value, icon }: { label: string; value: string; icon: string }) {
  return (
    <View style={styles.detailRow}>
      <View style={styles.detailHeading}>
        <Ionicons name={icon as any} size={18} color="#64748b" />
        <ThemedText style={styles.detailLabel}>{label}</ThemedText>
      </View>
      <ThemedText style={styles.detailValue}>{value}</ThemedText>
    </View>
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
  titleRow: {
    paddingTop: 10,
    paddingBottom: 10,
  },
  title: {
    color: '#111827',
  },
  heroCard: {
    borderRadius: 18,
    padding: 20,
    alignItems: 'center',
    gap: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  heroLabel: {
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 1.2,
  },
  heroAmount: {
    fontSize: 34,
    fontWeight: '900',
    color: '#111827',
  },
  confidencePill: {
    marginTop: 4,
    borderWidth: 1,
    borderColor: '#bfdbfe',
    backgroundColor: '#eff6ff',
    borderRadius: 999,
    paddingHorizontal: 16,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  confidenceText: {
    color: '#172554',
    fontWeight: '800',
    fontSize: 13,
  },
  detailsCard: {
    marginTop: 18,
    borderRadius: 18,
    padding: 16,
    gap: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  detailsTitle: {
    fontSize: 16,
    color: '#111827',
  },
  detailRow: {
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    paddingTop: 12,
    gap: 6,
  },
  detailHeading: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  detailLabel: {
    fontSize: 13,
    color: '#475569',
  },
  detailValue: {
    fontSize: 13,
    color: '#0f172a',
    fontWeight: '700',
  },
  secondaryButton: {
    marginTop: 18,
    alignSelf: 'stretch',
  },
  primaryButton: {
    marginTop: 14,
    alignSelf: 'stretch',
  },
});