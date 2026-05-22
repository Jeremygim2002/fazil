import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ActionButton } from '@/components/action-button';
import { ChoiceModal, FormField, SelectField } from '@/components/form-controls';
import { TabsHeader } from '@/components/tabs-header';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

export default function ScannerFormScreen() {
  const router = useRouter();
  const [currentDateValue] = useState(() => formatDate(new Date()));
  const [issueDate, setIssueDate] = useState(currentDateValue);
  const [detractionType, setDetractionType] = useState('Servicios generales');
  const [sunatStatus, setSunatStatus] = useState('Habido');
  const [isDetractionOpen, setIsDetractionOpen] = useState(false);
  const [isSunatOpen, setIsSunatOpen] = useState(false);

  const handleNext = () => {
    const validation = evaluateValidation({
      issueDate,
      detractionType,
      sunatStatus,
      currentDateValue,
    });

    if (validation.isValid) {
      router.push('/scanner-success' as never);
      return;
    }

    router.push(
      {
        pathname: '/scanner-error',
        params: {
          reasons: validation.reasons.join('|'),
          detractionType,
          sunatStatus,
          issueDate,
        },
      } as never,
    );
  };

  return (
    <ThemedView style={styles.safeArea}>
      <SafeAreaView style={styles.safeAreaInset}>
        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          <TabsHeader />

          <View style={styles.statusRow}>
            <View style={styles.statusChip}>
              <ThemedText style={styles.statusLabel}>SUNAT</ThemedText>
              <ThemedText style={styles.statusValue}>ACTIVO</ThemedText>
            </View>
            <View style={styles.statusChipMuted}>
              <ThemedText style={styles.statusLabel}>CONDICION</ThemedText>
              <ThemedText style={styles.statusValue}>HABIDO</ThemedText>
            </View>
          </View>

          <View style={styles.form}>
            <FormField label="RUC" placeholder="20100047218" />
            <FormField label="Número de Factura" placeholder="E001-4589" />
            <FormField
              label="Fecha"
              placeholder={currentDateValue}
              icon="calendar-outline"
              value={issueDate}
              onChangeText={setIssueDate}
            />

            <View style={styles.gridRow}>
              <View style={styles.gridItem}>
                <FormField label="Subtotal" placeholder="S/ 1,000.00" />
              </View>
              <View style={styles.gridItem}>
                <FormField label="IGV (18%)" placeholder="S/ 180.00" />
              </View>
            </View>

            <FormField label="Categoría de Gasto" placeholder="Producción" icon="chevron-down" />
            <SelectField
              label="Tipo de Detracción"
              value={detractionType}
              placeholder="Selecciona un tipo"
              onPress={() => setIsDetractionOpen(true)}
            />
            <SelectField
              label="Estado SUNAT"
              value={sunatStatus}
              placeholder="Selecciona el estado"
              onPress={() => setIsSunatOpen(true)}
            />

            <ThemedView type="backgroundElement" style={styles.summaryCard}>
              <View style={styles.summaryRow}>
                <ThemedText themeColor="textSecondary" style={styles.summaryLabel}>
                  Total de Factura:
                </ThemedText>
                <ThemedText style={styles.summaryValue}>S/ 1,180.00</ThemedText>
              </View>
              <View style={styles.summaryRow}>
                <ThemedText themeColor="textSecondary" style={styles.summaryLabel}>
                  Tasa de Detracción:
                </ThemedText>
                <ThemedText style={styles.summaryValue}>10%</ThemedText>
              </View>
              <View style={styles.summaryRowStrong}>
                <ThemedText themeColor="textSecondary" style={styles.summaryLabel}>
                  Monto de Detracción:
                </ThemedText>
                <ThemedText style={styles.summaryStrong}>S/ 100.00</ThemedText>
              </View>
            </ThemedView>

            <ActionButton
              label="Siguiente"
              icon={<Ionicons name="arrow-forward" size={18} color="#ffffff" />}
              onPress={handleNext}
              style={styles.primaryButton}
            />
          </View>

          <ChoiceModal
            title="Tipo de Detracción"
            visible={isDetractionOpen}
            options={['Servicios generales', 'Transporte', 'Bienes', 'Alquiler']}
            selectedValue={detractionType}
            onClose={() => setIsDetractionOpen(false)}
            onSelect={(value) => {
              setDetractionType(value);
              setIsDetractionOpen(false);
            }}
          />

          <ChoiceModal
            title="Estado SUNAT"
            visible={isSunatOpen}
            options={['Habido', 'No habido']}
            selectedValue={sunatStatus}
            onClose={() => setIsSunatOpen(false)}
            onSelect={(value) => {
              setSunatStatus(value);
              setIsSunatOpen(false);
            }}
          />
        </ScrollView>
      </SafeAreaView>
    </ThemedView>
  );
}

function evaluateValidation({
  issueDate,
  detractionType,
  sunatStatus,
  currentDateValue,
}: {
  issueDate: string;
  detractionType: string;
  sunatStatus: string;
  currentDateValue: string;
}) {
  const reasons: string[] = [];

  if (detractionType !== 'Servicios generales') {
    reasons.push('Tipo de detracción incorrecto');
  }

  if (sunatStatus !== 'Habido') {
    reasons.push('Empresa no habida en SUNAT');
  }

  if (!isCurrentMonth(issueDate, currentDateValue)) {
    reasons.push('Fecha de factura fuera del mes actual');
  }

  return {
    isValid: reasons.length === 0,
    reasons,
  };
}

function isCurrentMonth(value: string, currentValue: string) {
  const currentDate = parseDate(currentValue);
  const selectedDate = parseDate(value);

  if (!currentDate || !selectedDate) {
    return false;
  }

  return currentDate.getFullYear() === selectedDate.getFullYear() && currentDate.getMonth() === selectedDate.getMonth();
}

function parseDate(value: string) {
  const parts = value.split('/').map((part) => Number(part));

  if (parts.length !== 3 || parts.some((part) => Number.isNaN(part))) {
    return null;
  }

  const [day, month, year] = parts;
  return new Date(year, month - 1, day);
}

function formatDate(date: Date) {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
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
  statusRow: {
    marginTop: 8,
    flexDirection: 'row',
    gap: 12,
  },
  statusChip: {
    flex: 1,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#86efac',
    backgroundColor: '#f0fdf4',
    paddingVertical: 10,
    alignItems: 'center',
    gap: 4,
  },
  statusChipMuted: {
    flex: 1,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#bbf7d0',
    backgroundColor: '#f0fdf4',
    paddingVertical: 10,
    alignItems: 'center',
    gap: 4,
  },
  statusLabel: {
    fontSize: 11,
    letterSpacing: 1,
    color: '#16a34a',
    fontWeight: '700',
  },
  statusValue: {
    fontSize: 13,
    fontWeight: '800',
    color: '#166534',
  },
  form: {
    marginTop: 18,
    gap: 14,
  },
  field: {
    gap: 6,
  },
  fieldLabel: {
    fontSize: 12,
    fontWeight: '700',
  },
  fieldInput: {
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#ffffff',
  },
  inputText: {
    flex: 1,
    fontSize: 15,
    color: '#0f172a',
  },
  selectValue: {
    flex: 1,
    fontSize: 15,
    color: '#0f172a',
  },
  selectPlaceholder: {
    color: '#94a3b8',
  },
  gridRow: {
    flexDirection: 'row',
    gap: 12,
  },
  gridItem: {
    flex: 1,
  },
  summaryCard: {
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    padding: 14,
    gap: 8,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  summaryRowStrong: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 6,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
  },
  summaryLabel: {
    fontSize: 13,
  },
  summaryValue: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0b3b78',
  },
  summaryStrong: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0b3b78',
  },
  primaryButton: {
    marginTop: 6,
  },
});
