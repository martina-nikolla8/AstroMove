import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  ScrollView,
  StatusBar,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, borderRadius } from '../theme';

const { width } = Dimensions.get('window');

const trafficZones = [
  {
    id: 1,
    name: 'Downtown Core',
    type: 'HIGH_TRAFFIC',
    label: 'High Traffic',
    color: '#FF4D6D',
    icon: 'warning-outline',
    gridCol: 1,
    gridRow: 1,
    suggestion: {
      vehicle: 'Sky Express',
      type: 'Train',
      emoji: '🚄',
      reason: 'Heavy congestion detected. The Sky Express Maglev Train will bypass all traffic and get you there 3x faster.',
      saving: '28 min saved',
      gradient: ['#00D4FF', '#0066CC'],
    },
  },
  {
    id: 2,
    name: 'Solar Energy District',
    type: 'HIGH_PHOTON',
    label: 'High Photon Energy',
    color: '#FFB800',
    icon: 'sunny-outline',
    gridCol: 2,
    gridRow: 0,
    suggestion: {
      vehicle: 'Solar Racer',
      type: 'Supercar',
      emoji: '🏎️',
      reason: 'Maximum photon energy detected in this zone! The Solar Racer will charge itself as you drive — free fuel and maximum performance.',
      saving: 'Free energy zone',
      gradient: ['#FFB800', '#FF6B00'],
    },
  },
  {
    id: 3,
    name: 'Green Zone — Park Ave',
    type: 'CLEAR',
    label: 'Clear Route',
    color: '#00FF9C',
    icon: 'leaf-outline',
    gridCol: 0,
    gridRow: 2,
    suggestion: {
      vehicle: 'Urban Glider',
      type: 'Scooter',
      emoji: '🛴',
      reason: 'Clear roads and bike-friendly paths ahead! The Urban Glider is perfect for this green zone — fast, fun, and zero emissions.',
      saving: '10 min · Zero emissions',
      gradient: ['#00FF9C', '#00CC7A'],
    },
  },
  {
    id: 4,
    name: 'Midtown — Moderate Traffic',
    type: 'MODERATE',
    label: 'Moderate Traffic',
    color: '#6C63FF',
    icon: 'trending-up-outline',
    gridCol: 2,
    gridRow: 2,
    suggestion: {
      vehicle: 'Smart City Cruiser',
      type: 'Car',
      emoji: '🚗',
      reason: "Light to moderate traffic. The Smart City Cruiser's AI navigation will find the optimal path through these streets efficiently.",
      saving: '8 min saved',
      gradient: ['#6C63FF', '#4A44CC'],
    },
  },
  {
    id: 5,
    name: 'Bridge Bottleneck',
    type: 'HIGH_TRAFFIC',
    label: 'High Traffic',
    color: '#FF4D6D',
    icon: 'warning-outline',
    gridCol: 1,
    gridRow: 2,
    suggestion: {
      vehicle: 'Sky Express',
      type: 'Train',
      emoji: '🚄',
      reason: 'Bridge bottleneck with heavy congestion. The Sky Express has a dedicated express lane — skip the jam entirely.',
      saving: '35 min saved',
      gradient: ['#00D4FF', '#0066CC'],
    },
  },
];

const legendItems = [
  { color: '#FF4D6D', label: 'High Traffic' },
  { color: '#FFB800', label: 'High Photon Energy' },
  { color: '#00FF9C', label: 'Clear Route' },
  { color: '#6C63FF', label: 'Moderate Traffic' },
];

const SuggestionModal = ({ zone, onClose }) => {
  if (!zone) return null;
  const s = zone.suggestion;
  return (
    <Modal visible={!!zone} animationType="fade" transparent>
      <View style={styles.modalOverlay}>
        <View style={styles.modalSheet}>
          <View style={styles.modalHandle} />
          <View style={styles.modalZoneHeader}>
            <View style={[styles.zoneTypeBadge, { backgroundColor: zone.color + '22', borderColor: zone.color + '55' }]}>
              <View style={[styles.zoneTypeDot, { backgroundColor: zone.color }]} />
              <Text style={[styles.zoneTypeText, { color: zone.color }]}>{zone.label}</Text>
            </View>
            <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
              <Ionicons name="close" size={20} color={colors.textSecondary} />
            </TouchableOpacity>
          </View>
          <Text style={styles.zoneName}>{zone.name}</Text>
          <LinearGradient
            colors={[s.gradient[0] + '22', s.gradient[1] + '11']}
            style={styles.suggestionCard}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <View style={styles.suggestionHeader}>
              <Text style={styles.suggestionEmoji}>{s.emoji}</Text>
              <View style={styles.suggestionTextBlock}>
                <Text style={styles.suggestionLabel}>AstroMove Recommends</Text>
                <Text style={styles.suggestionVehicle}>{s.vehicle}</Text>
                <Text style={[styles.suggestionType, { color: s.gradient[0] }]}>{s.type}</Text>
              </View>
            </View>
            <Text style={styles.suggestionReason}>{s.reason}</Text>
            <View style={[styles.savingBadge, { backgroundColor: s.gradient[0] + '33' }]}>
              <Ionicons name="trending-down-outline" size={14} color={s.gradient[0]} />
              <Text style={[styles.savingText, { color: s.gradient[0] }]}>{s.saving}</Text>
            </View>
          </LinearGradient>
          <TouchableOpacity style={[styles.navigateBtn, { backgroundColor: s.gradient[0] }]} onPress={onClose}>
            <Ionicons name="navigate-outline" size={18} color="#fff" />
            <Text style={styles.navigateBtnText}>Navigate with {s.vehicle}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

// Build a 3x3 grid layout for zones
const GRID_ROWS = 3;
const GRID_COLS = 3;

const roadLabels = [
  { top: '33%', left: 0, right: 0, label: '— Main Ave —', horizontal: true },
  { top: '66%', left: 0, right: 0, label: '— South Blvd —', horizontal: true },
  { left: '33%', top: 0, bottom: 0, label: 'Park St', horizontal: false },
  { left: '66%', top: 0, bottom: 0, label: 'East Rd', horizontal: false },
];

export default function MapScreen() {
  const [selectedZone, setSelectedZone] = useState(null);
  const cellSize = Math.floor((Math.min(width, 600) - spacing.md * 2) / GRID_COLS);

  // Build grid
  const grid = Array.from({ length: GRID_ROWS }, () => Array(GRID_COLS).fill(null));
  trafficZones.forEach((z) => {
    if (z.gridRow < GRID_ROWS && z.gridCol < GRID_COLS) {
      grid[z.gridRow][z.gridCol] = z;
    }
  });

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={colors.background} />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Live Traffic Map</Text>
        <View style={styles.liveIndicator}>
          <View style={styles.liveDot} />
          <Text style={styles.liveText}>Live</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Text style={styles.tapHint}>Tap a zone to get a vehicle suggestion</Text>

        {/* City Grid Map */}
        <View style={[styles.mapGrid, { width: cellSize * GRID_COLS }]}>
          {grid.map((row, rowIdx) =>
            row.map((zone, colIdx) => {
              const isEmpty = !zone;
              return (
                <TouchableOpacity
                  key={`${rowIdx}-${colIdx}`}
                  style={[
                    styles.cell,
                    { width: cellSize, height: cellSize },
                    isEmpty && styles.emptyCell,
                    zone && { backgroundColor: zone.color + '22', borderColor: zone.color + '66' },
                  ]}
                  onPress={() => zone && setSelectedZone(zone)}
                  activeOpacity={zone ? 0.75 : 1}
                  disabled={isEmpty}
                >
                  {zone ? (
                    <>
                      <View style={[styles.cellIconBg, { backgroundColor: zone.color + '33' }]}>
                        <Ionicons name={zone.icon} size={22} color={zone.color} />
                      </View>
                      <Text style={[styles.cellLabel, { color: zone.color }]} numberOfLines={2}>
                        {zone.label}
                      </Text>
                      <Text style={styles.cellName} numberOfLines={2}>{zone.name}</Text>
                      <View style={[styles.tapBadge, { backgroundColor: zone.color + '33' }]}>
                        <Text style={[styles.tapBadgeText, { color: zone.color }]}>Tap</Text>
                      </View>
                    </>
                  ) : (
                    <View style={styles.emptyIntersection}>
                      <View style={styles.roadH} />
                      <View style={styles.roadV} />
                    </View>
                  )}
                </TouchableOpacity>
              );
            })
          )}
        </View>

        {/* Legend */}
        <View style={styles.legend}>
          <Text style={styles.legendTitle}>Zone Legend</Text>
          <View style={styles.legendItems}>
            {legendItems.map((item, i) => (
              <View key={i} style={styles.legendItem}>
                <View style={[styles.legendDot, { backgroundColor: item.color }]} />
                <Text style={styles.legendLabel}>{item.label}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Zone List */}
        <Text style={styles.sectionTitle}>All Zones</Text>
        <View style={styles.zoneList}>
          {trafficZones.map((zone) => (
            <TouchableOpacity
              key={zone.id}
              style={styles.zoneListItem}
              onPress={() => setSelectedZone(zone)}
              activeOpacity={0.8}
            >
              <View style={[styles.zoneListDot, { backgroundColor: zone.color + '33', borderColor: zone.color + '66' }]}>
                <Ionicons name={zone.icon} size={16} color={zone.color} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.zoneListName}>{zone.name}</Text>
                <Text style={[styles.zoneListType, { color: zone.color }]}>{zone.label}</Text>
              </View>
              <Text style={styles.zoneListEmoji}>{zone.suggestion.emoji}</Text>
              <Ionicons name="chevron-forward" size={16} color={colors.textMuted} />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <SuggestionModal zone={selectedZone} onClose={() => setSelectedZone(null)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    backgroundColor: colors.background,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  headerTitle: { color: colors.textPrimary, fontSize: 18, fontWeight: '700' },
  liveIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: colors.success + '22',
    borderRadius: borderRadius.full,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  liveDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: colors.success },
  liveText: { color: colors.success, fontSize: 12, fontWeight: '600' },
  scrollContent: {
    padding: spacing.md,
    alignItems: 'center',
    paddingBottom: 40,
  },
  tapHint: {
    color: colors.textMuted,
    fontSize: 12,
    marginBottom: spacing.md,
    textAlign: 'center',
  },
  mapGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.border,
  },
  cell: {
    borderWidth: 0.5,
    borderColor: colors.border,
    padding: spacing.sm,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  emptyCell: {
    backgroundColor: colors.surfaceAlt,
  },
  emptyIntersection: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  roadH: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: colors.border,
  },
  roadV: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: 2,
    backgroundColor: colors.border,
  },
  cellIconBg: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cellLabel: {
    fontSize: 10,
    fontWeight: '700',
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: 0.3,
  },
  cellName: {
    color: colors.textSecondary,
    fontSize: 10,
    textAlign: 'center',
  },
  tapBadge: {
    borderRadius: borderRadius.full,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  tapBadgeText: {
    fontSize: 10,
    fontWeight: '700',
  },
  legend: {
    width: '100%',
    backgroundColor: colors.surface,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
    marginTop: spacing.md,
  },
  legendTitle: {
    color: colors.textPrimary,
    fontSize: 13,
    fontWeight: '700',
    marginBottom: spacing.sm,
  },
  legendItems: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  legendItem: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  legendDot: { width: 10, height: 10, borderRadius: 5 },
  legendLabel: { color: colors.textSecondary, fontSize: 12 },
  sectionTitle: {
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: '700',
    alignSelf: 'flex-start',
    marginTop: spacing.lg,
    marginBottom: spacing.sm,
  },
  zoneList: {
    width: '100%',
    backgroundColor: colors.surface,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
  },
  zoneListItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    gap: spacing.sm,
  },
  zoneListDot: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  zoneListName: { color: colors.textPrimary, fontSize: 14, fontWeight: '600' },
  zoneListType: { fontSize: 12, fontWeight: '500', marginTop: 2 },
  zoneListEmoji: { fontSize: 20 },

  // Modal
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.md,
  },
  modalSheet: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.xl,
    padding: spacing.lg,
    width: '100%',
    maxWidth: 480,
    borderWidth: 1,
    borderColor: colors.border,
  },
  modalHandle: {
    width: 36,
    height: 4,
    backgroundColor: colors.border,
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: spacing.md,
  },
  modalZoneHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  zoneTypeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    borderWidth: 1,
    borderRadius: borderRadius.full,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  zoneTypeDot: { width: 6, height: 6, borderRadius: 3 },
  zoneTypeText: { fontSize: 12, fontWeight: '600' },
  closeBtn: {
    backgroundColor: colors.surfaceAlt,
    borderRadius: borderRadius.full,
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  zoneName: {
    color: colors.textPrimary,
    fontSize: 20,
    fontWeight: '800',
    marginBottom: spacing.md,
  },
  suggestionCard: {
    borderRadius: borderRadius.md,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.md,
  },
  suggestionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    marginBottom: spacing.sm,
  },
  suggestionEmoji: { fontSize: 40 },
  suggestionTextBlock: { flex: 1 },
  suggestionLabel: {
    color: colors.textMuted,
    fontSize: 11,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 2,
  },
  suggestionVehicle: { color: colors.textPrimary, fontSize: 18, fontWeight: '800' },
  suggestionType: { fontSize: 13, fontWeight: '600' },
  suggestionReason: {
    color: colors.textSecondary,
    fontSize: 13,
    lineHeight: 20,
    marginBottom: spacing.sm,
  },
  savingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    borderRadius: borderRadius.full,
    paddingHorizontal: 10,
    paddingVertical: 4,
    alignSelf: 'flex-start',
  },
  savingText: { fontSize: 12, fontWeight: '700' },
  navigateBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderRadius: borderRadius.md,
    padding: spacing.md,
  },
  navigateBtnText: { color: '#fff', fontSize: 16, fontWeight: '700' },
});
