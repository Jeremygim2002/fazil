import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { TabsHeader } from '@/components/tabs-header';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { getCurrentUserProfile, getFirstName, logout } from '@/services/auth';

export default function ProfileScreen() {
  const router = useRouter();
  const [profile, setProfile] = useState({
    email: '',
    name: 'Usuario',
  });

  useEffect(() => {
    let isMounted = true;

    const loadProfile = async () => {
      try {
        const userProfile = await getCurrentUserProfile();
        if (isMounted && userProfile) {
          setProfile({
            email: userProfile.email,
            name: getFirstName(userProfile.name),
          });
        }
      } catch {
        if (isMounted) {
          setProfile({
            email: '',
            name: 'Usuario',
          });
        }
      }
    };

    void loadProfile();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleLogout = async () => {
    await logout();
    router.replace('/(auth)/login' as never);
  };

  return (
    <ThemedView style={styles.safeArea}>
      <SafeAreaView style={styles.safeAreaInset}>
        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          <TabsHeader />

          <ThemedView type="backgroundElement" style={styles.profileCard}>
            <View style={styles.avatarWrap}>
              <View style={styles.avatar}>
                <Ionicons name="person" size={40} color="#0b3b78" />
              </View>
              <View style={styles.editBadge}>
                <Ionicons name="create-outline" size={12} color="#ffffff" />
              </View>
            </View>
            <ThemedText type="subtitle" style={styles.name}>
              {profile.name}
            </ThemedText>
            <ThemedText themeColor="textSecondary" style={styles.email}>
              {profile.email}
            </ThemedText>
          </ThemedView>

          <View style={styles.statsRow}>
            <ThemedView type="backgroundElement" style={styles.statCard}>
              <ThemedText style={styles.statValue}>128</ThemedText>
              <ThemedText themeColor="textSecondary" style={styles.statLabel}>
                Comprobantes
              </ThemedText>
            </ThemedView>
            <ThemedView type="backgroundElement" style={styles.statCard}>
              <ThemedText style={styles.statValue}>94%</ThemedText>
              <ThemedText themeColor="textSecondary" style={styles.statLabel}>
                Validados
              </ThemedText>
            </ThemedView>
            <ThemedView type="backgroundElement" style={styles.statCard}>
              <ThemedText style={styles.statValue}>6</ThemedText>
              <ThemedText themeColor="textSecondary" style={styles.statLabel}>
                Pendientes
              </ThemedText>
            </ThemedView>
          </View>

          <View style={styles.sectionHeader}>
            <ThemedText type="smallBold" style={styles.sectionTitle}>
              Cuenta y Preferencias
            </ThemedText>
          </View>

          <ThemedView type="backgroundElement" style={styles.listCard}>
            {profileItems.map((item) => (
              <Pressable key={item.title} style={styles.listRow}>
                <View style={styles.rowIcon}>
                  <Ionicons name={item.icon} size={18} color="#0b3b78" />
                </View>
                <View style={styles.rowBody}>
                  <ThemedText style={styles.rowTitle}>{item.title}</ThemedText>
                  <ThemedText themeColor="textSecondary" style={styles.rowSubtitle}>
                    {item.subtitle}
                  </ThemedText>
                </View>
                <Ionicons name="chevron-forward" size={16} color="#94a3b8" />
              </Pressable>
            ))}
          </ThemedView>

          <Pressable style={styles.logoutButton} onPress={() => void handleLogout()}>
            <Ionicons name="log-out-outline" size={18} color="#0b3b78" />
            <ThemedText style={styles.logoutText}>Cerrar sesión</ThemedText>
          </Pressable>
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
  profileCard: {
    marginTop: 12,
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#eef2f7',
  },
  avatarWrap: {
    position: 'relative',
    marginBottom: 12,
  },
  avatar: {
    width: 86,
    height: 86,
    borderRadius: 43,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  editBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#0b3b78',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#ffffff',
  },
  name: {
    fontSize: 22,
    fontWeight: '800',
    color: '#111827',
  },
  email: {
    marginTop: 4,
    fontSize: 14,
  },
  statsRow: {
    marginTop: 16,
    flexDirection: 'row',
    gap: 10,
  },
  statCard: {
    flex: 1,
    borderRadius: 16,
    paddingVertical: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#eef2f7',
  },
  statValue: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0b3b78',
  },
  statLabel: {
    marginTop: 4,
    fontSize: 12,
  },
  sectionHeader: {
    marginTop: 22,
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 14,
    color: '#111827',
  },
  listCard: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#eef2f7',
    overflow: 'hidden',
  },
  listRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#eef2f7',
  },
  rowIcon: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: '#eaf2ff',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  rowBody: {
    flex: 1,
  },
  rowTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#111827',
  },
  rowSubtitle: {
    marginTop: 2,
    fontSize: 12,
  },
  logoutButton: {
    marginTop: 18,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 999,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  logoutText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0b3b78',
  },
});

const profileItems = [
  {
    title: 'Empresa',
    subtitle: 'RUC, actividad y direccion',
    icon: 'briefcase-outline' as const,
  }
];
