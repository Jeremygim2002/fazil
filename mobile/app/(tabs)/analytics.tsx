import Ionicons from '@expo/vector-icons/Ionicons';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { TabsHeader } from '@/components/tabs-header';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

const distributionItems = [
  { id: '1', label: 'Nómina', value: '45%', color: '#0b3b78' },
  { id: '2', label: 'Operaciones', value: '30%', color: '#2563eb' },
  { id: '3', label: 'Marketing', value: '15%', color: '#60a5fa' },
  { id: '4', label: 'Otros', value: '10%', color: '#94a3b8' },
];

const topProviders = [
  {
    id: '1',
    name: 'Amazon Web Services',
    subtitle: 'Infraestructura',
    amount: 'S/ 4,200.50',
    count: '12 transacciones',
  },
  {
    id: '2',
    name: 'Global Ad Group',
    subtitle: 'Marketing',
    amount: 'S/ 2,850.00',
    count: '3 transacciones',
  },
  {
    id: '3',
    name: 'Seguros Pacifico',
    subtitle: 'Operaciones',
    amount: 'S/ 1,120.00',
    count: '1 transacción',
  },
];

export default function AnalyticsScreen() {
  return (
    <ThemedView style={styles.safeArea}>
      <SafeAreaView style={styles.safeAreaInset}>
        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          <TabsHeader />

          <View style={styles.hero}>
            <ThemedText type="title" style={styles.title}>
              Analítica
            </ThemedText>
            <ThemedText themeColor="textSecondary" style={styles.subtitle}>
              Indicadores clave y tendencias de tus comprobantes.
            </ThemedText>
          </View>

          <View style={styles.kpiRow}>
            <ThemedView type="backgroundElement" style={styles.kpiCard}>
              <ThemedText themeColor="textSecondary" style={styles.kpiLabel}>
                TOTAL MES
              </ThemedText>
              <ThemedText type="subtitle" style={styles.kpiValue}>
                S/ 45,820
              </ThemedText>
              <View style={styles.kpiTrend}>
                <Ionicons name="arrow-up" size={14} color="#16a34a" />
                <ThemedText style={styles.kpiTrendText}>+12.4%</ThemedText>
              </View>
            </ThemedView>

            <ThemedView type="backgroundElement" style={styles.kpiCard}>
              <ThemedText themeColor="textSecondary" style={styles.kpiLabel}>
                PROMEDIO
              </ThemedText>
              <ThemedText type="subtitle" style={styles.kpiValue}>
                S/ 382
              </ThemedText>
              <View style={styles.kpiTrend}>
                <Ionicons name="arrow-down" size={14} color="#f97316" />
                <ThemedText style={styles.kpiTrendWarn}>-3.1%</ThemedText>
              </View>
            </ThemedView>
          </View>

          <ThemedView type="backgroundElement" style={styles.chartCard}>
            <View style={styles.chartHeader}>
              <ThemedText type="smallBold" style={styles.sectionTitle}>
                Flujo de comprobantes
              </ThemedText>
              <View style={styles.chartPill}>
                <ThemedText style={styles.chartPillText}>Últimos 30 días</ThemedText>
              </View>
            </View>
            <View style={styles.chartPlaceholder}>
              <View style={[styles.chartBar, styles.chartBarTall]} />
              <View style={[styles.chartBar, styles.chartBarMid]} />
              <View style={[styles.chartBar, styles.chartBarShort]} />
              <View style={[styles.chartBar, styles.chartBarHigh]} />
              <View style={[styles.chartBar, styles.chartBarMid]} />
              <View style={[styles.chartBar, styles.chartBarTall]} />
            </View>
          </ThemedView>

          <View style={styles.sectionHeader}>
            <ThemedText type="smallBold" style={styles.sectionTitle}>
              Distribución
            </ThemedText>
          </View>

          <ThemedView type="backgroundElement" style={styles.splitCard}>
            <View style={styles.splitRow}>
              <View style={styles.splitLabel}>
                <View style={[styles.dot, styles.dotPrimary]} />
                <ThemedText style={styles.splitText}>Validados</ThemedText>
              </View>
              <ThemedText style={styles.splitValue}>72%</ThemedText>
            </View>
            <View style={styles.splitRow}>
              <View style={styles.splitLabel}>
                <View style={[styles.dot, styles.dotWarning]} />
                <ThemedText style={styles.splitText}>Pendientes</ThemedText>
              </View>
              <ThemedText style={styles.splitValue}>18%</ThemedText>
            </View>
            <View style={styles.splitRow}>
              <View style={styles.splitLabel}>
                <View style={[styles.dot, styles.dotMuted]} />
                <ThemedText style={styles.splitText}>Observados</ThemedText>
              </View>
              <ThemedText style={styles.splitValue}>10%</ThemedText>
            </View>
          </ThemedView>

          <ThemedView type="backgroundElement" style={styles.distributionCard}>
            <View style={styles.distributionLeft}>
              <View style={styles.distributionCube}>
                <ThemedText style={styles.distributionCubeText}>100%</ThemedText>
              </View>
            </View>
            <View style={styles.distributionLegend}>
              {distributionItems.map((item) => (
                <View key={item.id} style={styles.legendRow}>
                  <View style={[styles.legendDot, { backgroundColor: item.color }]} />
                  <ThemedText style={styles.legendLabel}>{item.label}</ThemedText>
                  <ThemedText style={styles.legendValue}>{item.value}</ThemedText>
                </View>
              ))}
            </View>
          </ThemedView>

          <View style={styles.sectionHeaderRow}>
            <ThemedText type="smallBold" style={styles.sectionTitle}>
              Principales Proveedores
            </ThemedText>
            <ThemedText style={styles.sectionLink}>Ver todos</ThemedText>
          </View>

          <ThemedView type="backgroundElement" style={styles.providersCard}>
            {topProviders.map((provider) => (
              <View key={provider.id} style={styles.providerRow}>
                <View style={styles.providerIcon}>
                  <Ionicons name="briefcase-outline" size={18} color="#0b3b78" />
                </View>
                <View style={styles.providerBody}>
                  <ThemedText style={styles.providerName}>{provider.name}</ThemedText>
                  <ThemedText themeColor="textSecondary" style={styles.providerSubtitle}>
                    {provider.subtitle}
                  </ThemedText>
                </View>
                <View style={styles.providerMeta}>
                  <ThemedText style={styles.providerAmount}>{provider.amount}</ThemedText>
                  <ThemedText themeColor="textSecondary" style={styles.providerCount}>
                    {provider.count}
                  </ThemedText>
                </View>
              </View>
            ))}
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
  hero: {
    marginTop: 8,
  },
  title: {
    fontSize: 28,
    lineHeight: 34,
    fontWeight: '800',
    color: '#111827',
  },
  subtitle: {
    marginTop: 6,
    fontSize: 16,
    lineHeight: 22,
  },
  kpiRow: {
    marginTop: 18,
    flexDirection: 'row',
    gap: 12,
  },
  kpiCard: {
    flex: 1,
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: '#eef2f7',
  },
  kpiLabel: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.6,
  },
  kpiValue: {
    marginTop: 10,
    color: '#111827',
  },
  kpiTrend: {
    marginTop: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  kpiTrendText: {
    color: '#16a34a',
    fontSize: 12,
    fontWeight: '700',
  },
  kpiTrendWarn: {
    color: '#f97316',
    fontSize: 12,
    fontWeight: '700',
  },
  chartCard: {
    marginTop: 18,
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: '#eef2f7',
  },
  chartHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sectionTitle: {
    fontSize: 14,
    color: '#111827',
  },
  chartPill: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
    backgroundColor: '#eaf2ff',
  },
  chartPillText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#0b3b78',
  },
  chartPlaceholder: {
    marginTop: 16,
    height: 120,
    borderRadius: 14,
    backgroundColor: '#f8fafc',
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingBottom: 12,
  },
  chartBar: {
    width: 16,
    borderRadius: 8,
    backgroundColor: '#0b3b78',
    opacity: 0.15,
  },
  chartBarShort: { height: 32 },
  chartBarMid: { height: 56 },
  chartBarTall: { height: 82 },
  chartBarHigh: { height: 96 },
  sectionHeader: {
    marginTop: 18,
    marginBottom: 8,
  },
  splitCard: {
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#eef2f7',
    gap: 12,
  },
  splitRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  splitLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  splitText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#111827',
  },
  splitValue: {
    fontSize: 14,
    fontWeight: '800',
    color: '#0b3b78',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  dotPrimary: {
    backgroundColor: '#0b3b78',
  },
  dotWarning: {
    backgroundColor: '#f97316',
  },
  dotMuted: {
    backgroundColor: '#94a3b8',
  },
  distributionCard: {
    marginTop: 12,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#eef2f7',
    flexDirection: 'row',
    gap: 16,
    alignItems: 'center',
  },
  distributionLeft: {
    width: 84,
    height: 84,
    borderRadius: 14,
    backgroundColor: '#f8fafc',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  distributionCube: {
    width: 56,
    height: 56,
    borderRadius: 10,
    backgroundColor: '#111827',
    alignItems: 'center',
    justifyContent: 'center',
  },
  distributionCubeText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#ffffff',
  },
  distributionLegend: {
    flex: 1,
    gap: 6,
  },
  legendRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  legendDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  legendLabel: {
    flex: 1,
    fontSize: 13,
    color: '#111827',
  },
  legendValue: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0b3b78',
  },
  sectionHeaderRow: {
    marginTop: 18,
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sectionLink: {
    fontSize: 12,
    color: '#2563eb',
    fontWeight: '700',
  },
  providersCard: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#eef2f7',
    overflow: 'hidden',
  },
  providerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#eef2f7',
  },
  providerIcon: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: '#eaf2ff',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  providerBody: {
    flex: 1,
  },
  providerName: {
    fontSize: 14,
    fontWeight: '700',
    color: '#111827',
  },
  providerSubtitle: {
    marginTop: 2,
    fontSize: 12,
  },
  providerMeta: {
    alignItems: 'flex-end',
  },
  providerAmount: {
    fontSize: 13,
    fontWeight: '800',
    color: '#0b3b78',
  },
  providerCount: {
    marginTop: 2,
    fontSize: 11,
  },
});