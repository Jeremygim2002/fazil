import Ionicons from '@expo/vector-icons/Ionicons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ActionButton } from '@/components/action-button';
import { TabsHeader } from '@/components/tabs-header';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

export default function ScannerErrorScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ reasons?: string; detractionType?: string; sunatStatus?: string; issueDate?: string }>();

  const reasons = (params.reasons ?? '')
    .split('|')
    .map((reason) => reason.trim())
    .filter(Boolean);

  return (
    <ThemedView style={styles.safeArea}>
      <SafeAreaView style={styles.safeAreaInset}>
        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          <TabsHeader />

          <View style={styles.titleRow}>
            <ThemedText type="subtitle" style={styles.title}>
              Resolución de Incidencia
            </ThemedText>
          </View>

          <View style={styles.alertBox}>
            <Ionicons name="warning" size={24} color="#b91c1c" />
            <View style={styles.alertCopy}>
              <ThemedText style={styles.alertTitle}>Incidencia Detectada</ThemedText>
              <ThemedText style={styles.alertText}>Fecha Expirada, Empresa No Habida o Detracción inválida.</ThemedText>
            </View>
          </View>

          <ThemedView type="backgroundElement" style={styles.detailsCard}>
            <ThemedText type="smallBold" style={styles.detailsTitle}>
              Datos Extraídos
            </ThemedText>

            <DetailRow label="RUC Emisor" value="20100047218" />
            <DetailRow label="Monto Total" value="S/ 450.50" />
            <DetailRow label="Fecha de Emisión" value={params.issueDate ?? 'Sin definir'} danger />
            <DetailRow label="Tipo de Detracción" value={params.detractionType ?? 'Sin definir'} />
            <DetailRow label="Estado SUNAT" value={params.sunatStatus ?? 'Sin definir'} />
          </ThemedView>

          <View style={styles.reasonList}>
            {reasons.length > 0 ? (
              reasons.map((reason) => (
                <View key={reason} style={styles.reasonPill}>
                  <Ionicons name="alert-circle-outline" size={18} color="#b91c1c" />
                  <ThemedText style={styles.reasonText}>{reason}</ThemedText>
                </View>
              ))
            ) : null}
          </View>

          <ActionButton
            label="Volver a Escanear"
            variant="secondary"
            icon={<Ionicons name="camera-outline" size={18} color="#0f172a" />}
            onPress={() => router.push('/scanner' as never)}
            style={styles.secondaryButton}
          />

          <ActionButton
            label="Editar Manualmente"
            variant="secondary"
            icon={<Ionicons name="create-outline" size={18} color="#0f172a" />}
            onPress={() => router.push('/scanner-form' as never)}
            style={styles.secondaryButton}
          />

          <ActionButton
            label="Re-validar Documento"
            icon={<Ionicons name="refresh-circle-outline" size={18} color="#ffffff" />}
            onPress={() => router.push('/scanner-form' as never)}
            style={styles.primaryButton}
          />
        </ScrollView>
      </SafeAreaView>
    </ThemedView>
  );
}

function DetailRow({
  label,
  value,
  danger = false,
}: {
  label: string;
  value: string;
  danger?: boolean;
}) {
  return (
    <View style={styles.detailRow}>
      <ThemedText themeColor="textSecondary" style={styles.detailLabel}>
        {label}
      </ThemedText>
      <ThemedText style={[styles.detailValue, danger ? styles.detailValueDanger : null]}>{value}</ThemedText>
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
  alertBox: {
    marginTop: 4,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#fca5a5',
    backgroundColor: '#fef2f2',
    padding: 16,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  alertCopy: {
    flex: 1,
    gap: 4,
  },
  alertTitle: {
    fontSize: 18,
    fontWeight: '900',
    color: '#991b1b',
  },
  alertText: {
    fontSize: 13,
    lineHeight: 19,
    color: '#7f1d1d',
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
  detailLabel: {
    fontSize: 12,
  },
  detailValue: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0f172a',
  },
  detailValueDanger: {
    color: '#b91c1c',
  },
  reasonList: {
    marginTop: 16,
    gap: 10,
  },
  reasonPill: {
    borderWidth: 1,
    borderColor: '#fecaca',
    backgroundColor: '#fef2f2',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  reasonText: {
    flex: 1,
    fontSize: 13,
    color: '#991b1b',
    fontWeight: '700',
  },
  secondaryButton: {
    marginTop: 14,
    alignSelf: 'stretch',
  },
  primaryButton: {
    marginTop: 14,
    alignSelf: 'stretch',
  },
});