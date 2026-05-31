import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { TabsHeader } from '@/components/tabs-header';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { getCurrentUserProfile, getFirstName } from '@/services/auth';

const recentActivities = [
  { id: '1', invoice: 'INV-2023-089', client: 'TechCorp Supplies', amount: 'S/ 1,200.00', status: 'VALIDADO' },
  { id: '2', invoice: 'INV-2023-090', client: 'Office Depot', amount: 'S/ 45.50', status: 'PENDIENTE' },
  { id: '3', invoice: 'INV-2023-088', client: 'Marketing Agency', amount: 'S/ 3,500.00', status: 'VALIDADO' },
];

export default function HomeTabScreen() {
  const router = useRouter();
  const [firstName, setFirstName] = useState('Usuario');

  useEffect(() => {
    let isMounted = true;

    const loadProfile = async () => {
      try {
        const profile = await getCurrentUserProfile();
        if (isMounted) {
          setFirstName(getFirstName(profile?.name));
        }
      } catch {
        if (isMounted) {
          setFirstName('Usuario');
        }
      }
    };

    void loadProfile();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <ThemedView style={styles.safeArea}>
      <SafeAreaView style={styles.safeAreaInset}>
        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          <TabsHeader />
          <View style={styles.hero}>
            <ThemedText type="title" style={styles.greeting}>
              Bienvenido, {firstName}
            </ThemedText>
            <ThemedText themeColor="textSecondary" style={styles.subtitle}>
              Aquí está el resumen de tu negocio hoy.
            </ThemedText>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.cardsRow}>
              <ThemedView type="backgroundElement" style={styles.statCard}>
                <ThemedText themeColor="textSecondary" style={styles.statLabel}>
                  GASTOS MENSUALES
                </ThemedText>
                <ThemedText type="subtitle" style={styles.statValue}>
                  S/ 1,450.00
                </ThemedText>
                <ThemedText themeColor="textSecondary" style={styles.statHint}>
                  ↑ 4.2% vs el mes pasado
                </ThemedText>
              </ThemedView>

              <ThemedView type="backgroundElement" style={styles.statCardMuted}>
                <ThemedText themeColor="textSecondary" style={styles.statLabel}>
                  DETRACCIÓN PENDIENTE
                </ThemedText>
                <ThemedText type="subtitle" style={styles.statValueSmall}>
                  S/ 1,280.00
                </ThemedText>
                <ThemedText style={styles.statHintDanger}>⏰ Vence hoy</ThemedText>
              </ThemedView>
            </ScrollView>
          </View>

          <View style={styles.captureRow}>
            <Pressable style={styles.captureCard} onPress={() => router.push('/scanner')}>
              <View style={styles.captureButton}>
                <Ionicons name="camera" size={35} color="#ffffff" />
                <ThemedText style={styles.captureText}>CAPTURAR</ThemedText>
              </View>
            </Pressable>
            <Pressable style={styles.captureCard} onPress={() => router.push('/(tabs)/upload')}>
              <View style={styles.captureButton}>
                <Ionicons name="cloud-upload-outline" size={35} color="#ffffff" />
                <ThemedText style={styles.captureText}>SUBIR</ThemedText>
              </View>
            </Pressable>
          </View>

          <View style={styles.sectionHeader}>
            <ThemedText type="smallBold" style={styles.sectionTitle}>
              Actividades Recientes
            </ThemedText>
          </View>

          <View style={styles.activityList}>
            {recentActivities.map((item) => (
              <ThemedView key={item.id} type="backgroundElement" style={styles.activityRow}>
                <View style={styles.activityIcon}>
                  <Ionicons name="receipt-outline" size={18} color="#0b3b78" />
                </View>
                <View style={styles.activityBody}>
                  <ThemedText type="smallBold" style={styles.activityInvoice}>
                    {item.invoice}
                  </ThemedText>
                  <ThemedText themeColor="textSecondary" style={styles.activityClient}>
                    {item.client}
                  </ThemedText>
                </View>
                <View style={styles.activityMeta}>
                  <ThemedText type="smallBold" style={styles.activityAmount}>
                    {item.amount}
                  </ThemedText>
                  <ThemedText
                    style={[
                      styles.activityStatus,
                      item.status === 'VALIDADO' ? styles.statusValidado : styles.statusPendiente,
                    ]}>
                    {item.status}
                  </ThemedText>
                </View>
              </ThemedView>
            ))}
          </View>
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
    paddingTop: 8,
    paddingBottom: 24,
  },
  hero: { marginTop: 8 },
  greeting: {
    fontSize: 28,
    lineHeight: 34,
    fontWeight: '800',
    color: '#111827',
  },
  subtitle: { marginTop: 4, fontSize: 16, lineHeight: 22 },
  cardsRow: { gap: 12, paddingTop: 20, paddingBottom: 16 },
  statCard: {
    width: 176,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  statCardMuted: {
    width: 176,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#eef2f7',
  },
  statLabel: { fontSize: 11, fontWeight: '700', letterSpacing: 0.6 },
  statValue: { marginTop: 14, color: '#111827' },
  statValueSmall: { marginTop: 14, color: '#111827' },
  statHint: { marginTop: 10, fontSize: 12 },
  statHintDanger: { marginTop: 10, fontSize: 12, color: '#dc2626', fontWeight: '600' },
  captureRow: {
    marginTop: 18,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16,
  },
  captureCard: {
    alignItems: 'center',
  },
  captureButton: {
    width: 104,
    height: 104,
    borderRadius: 16,
    backgroundColor: '#0b3b78',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    shadowColor: '#0b3b78',
    shadowOpacity: 0.2,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 8 },
    elevation: 4,
  },
  captureText: { color: '#ffffff', fontWeight: '900', fontSize: 14, letterSpacing: 1 },
  captureLabel: { marginTop: 12, fontSize: 11, letterSpacing: 1.6, fontWeight: '700' },
  sectionHeader: { marginTop: 28, marginBottom: 12 },
  sectionTitle: { fontSize: 18, color: '#111827' },
  activityList: { gap: 12, paddingBottom: 8 },
  activityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: '#eef2f7',
  },
  activityIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#eaf2ff',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  activityBody: { flex: 1 },
  activityInvoice: { fontSize: 15, color: '#111827' },
  activityClient: { marginTop: 2, fontSize: 12 },
  activityMeta: { alignItems: 'flex-end' },
  activityAmount: { fontSize: 14, color: '#0b3b78' },
  activityStatus: { marginTop: 4, fontSize: 11, fontWeight: '700' },
  statusValidado: { color: '#2563eb' },
  statusPendiente: { color: '#f59e0b' },
});
