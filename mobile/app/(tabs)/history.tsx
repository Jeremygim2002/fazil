import { TabsHeader } from '@/components/tabs-header';
import Ionicons from '@expo/vector-icons/Ionicons';
import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const historyRows = [
  { id: '1', name: 'REDONDOS', date: 'Oct 24, 2023', amount: 'S/ 1,240.00', status: 'cloud' },
  { id: '2', name: 'SAN FERNANDO', date: 'Oct 20, 2023', amount: 'S/ 450.50', status: 'alert' },
  { id: '3', name: 'SAN JOSE', date: 'Oct 18, 2023', amount: 'S/ 2,100.00', status: 'cloud' },
  { id: '4', name: 'REDONDOS', date: 'Oct 18, 2023', amount: 'S/ 54.99', status: 'clock' },
  { id: '5', name: 'SAN FERNANDO', date: 'Oct 15, 2023', amount: 'S/ 72.00', status: 'cloud' },
];

export default function HistoryScreen() {
	return (
		<SafeAreaView style={styles.safeArea}>
			<ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
				<TabsHeader />
				<Text style={styles.pageTitle}>Registros Internos</Text>

				<View style={styles.searchRow}>
					<View style={styles.searchBox}>
						<Ionicons name="search" size={22} color="#94a3b8" />
						<TextInput placeholder="Buscar registros..." placeholderTextColor="#94a3b8" style={styles.searchInput} />
					</View>
					<View style={styles.filterButton}>
						<Ionicons name="options-outline" size={22} color="#0b3b78" />
					</View>
				</View>

				<ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chipsRow}>
					<View style={[styles.chip, styles.chipActive]}><Text style={styles.chipActiveText}>Todos</Text></View>
					<View style={styles.chip}><Text style={styles.chipText}>Listo para Impuestos</Text></View>
					<View style={styles.chip}><Text style={styles.chipText}>Acción Requerida</Text></View>
				</ScrollView>

				<View style={styles.listCard}>
					{historyRows.map((row) => (
						<View key={row.id} style={styles.row}>
							<View style={styles.rowIcon}>
								<Ionicons
									name={row.status === 'alert' ? 'warning-outline' : row.status === 'clock' ? 'hourglass-outline' : 'receipt-outline'}
									size={18}
									color={row.status === 'alert' ? '#dc2626' : '#0b3b78'}
								/>
							</View>
							<View style={styles.rowBody}>
								<Text style={styles.rowTitle}>{row.name}</Text>
								<Text style={styles.rowDate}>{row.date}</Text>
							</View>
							<View style={styles.rowMeta}>
								<Text style={styles.rowAmount}>{row.amount}</Text>
								<Ionicons
									name={row.status === 'alert' ? 'cloud-offline-outline' : 'cloud-outline'}
									size={16}
									color="#0b3b78"
								/>
							</View>
						</View>
					))}
				</View>
			</ScrollView>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	safeArea: {
		flex: 1,
		backgroundColor: '#f5f7fb',
	},
	content: {
		paddingHorizontal: 18,
		paddingTop: 8,
		paddingBottom: 24,
	},
	pageTitle: { fontSize: 28, fontWeight: '800', color: '#111827', marginTop: 8 },
	searchRow: {
		flexDirection: 'row',
		gap: 12,
		alignItems: 'center',
		marginTop: 18,
	},
	searchBox: {
		flex: 1,
		minHeight: 56,
		borderRadius: 12,
		backgroundColor: '#ffffff',
		borderWidth: 1,
		borderColor: '#e5e7eb',
		flexDirection: 'row',
		alignItems: 'center',
		paddingHorizontal: 14,
		gap: 10,
	},
	searchInput: {
		flex: 1,
		fontSize: 16,
		color: '#0f172a',
	},
	filterButton: {
		width: 56,
		height: 56,
		borderRadius: 12,
		backgroundColor: '#ffffff',
		borderWidth: 1,
		borderColor: '#e5e7eb',
		alignItems: 'center',
		justifyContent: 'center',
	},
	chipsRow: {
		gap: 10,
		paddingTop: 16,
		paddingBottom: 16,
	},
	chip: {
		paddingHorizontal: 14,
		paddingVertical: 10,
		borderRadius: 8,
		backgroundColor: '#e5e7eb',
	},
	chipActive: { backgroundColor: '#0b3b78' },
	chipText: { fontSize: 13, fontWeight: '700', color: '#475569' },
	chipActiveText: { fontSize: 13, fontWeight: '700', color: '#ffffff' },
	listCard: {
		backgroundColor: '#ffffff',
		borderRadius: 16,
		borderWidth: 1,
		borderColor: '#eef2f7',
		overflow: 'hidden',
	},
	row: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingHorizontal: 16,
		paddingVertical: 16,
		borderBottomWidth: 1,
		borderBottomColor: '#eef2f7',
	},
	rowIcon: {
		width: 42,
		height: 42,
		borderRadius: 12,
		backgroundColor: '#f1f5ff',
		alignItems: 'center',
		justifyContent: 'center',
		marginRight: 12,
	},
	rowBody: { flex: 1 },
	rowTitle: { fontSize: 15, fontWeight: '800', color: '#111827' },
	rowDate: { marginTop: 3, fontSize: 13, color: '#64748b' },
	rowMeta: { alignItems: 'flex-end', gap: 6 },
	rowAmount: { fontSize: 15, fontWeight: '800', color: '#0b3b78' },
});
