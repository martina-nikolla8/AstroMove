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
import MapView, { Marker, Polygon, Callout } from 'react-native-maps';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, borderRadius } from '../theme';

const { width } = Dimensions.get('window');

// Mock traffic zones centered around a city
const trafficZones = [
  {
    id: 1,
    name: 'Downtown Core',
    type: 'HIGH_TRAFFIC',
    label: 'High Traffic',
    color: '#FF4D6D',
    fillColor: 'rgba(255,77,109,0.25)',
    strokeColor: 'rgba(255,77,109,0.8)',
    coordinates: [
      { latitude: 40.7128, longitude: -74.006 },
      { latitude: 40.7178, longitude: -74.006 },
      { latitude: 40.7178, longitude: -73.999 },
      { latitude: 40.7128, longitude: -73.999 },
    ],
    center: { latitude: 40.7153, longitude: -74.0025 },
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
    fillColor: 'rgba(255,184,0,0.2)',
    strokeColor: 'rgba(255,184,0,0.8)',
    coordinates: [
      { latitude: 40.72, longitude: -74.015 },
      { latitude: 40.726, longitude: -74.015 },
      { latitude: 40.726, longitude: -74.007 },
      { latitude: 40.72, longitude: -74.007 },
    ],
    center: { latitude: 40.723, longitude: -74.011 },
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
    fillColor: 'rgba(0,255,156,0.15)',
    strokeColor: 'rgba(0,255,156,0.8)',
    coordinates: [
      { latitude: 40.705, longitude: -74.01 },
      { latitude: 40.711, longitude: -74.01 },
      { latitude: 40.711, longitude: -74.003 },
      { latitude: 40.705, longitude: -74.003 },
    ],
    center: { latitude: 40.708, longitude: -74.0065 },
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
    fillColor: 'rgba(108,99,255,0.2)',
    strokeColor: 'rgba(108,99,255,0.8)',
    coordinates: [
      { latitude: 40.717, longitude: -73.995 },
      { latitude: 40.723, longitude: -73.995 },
      { latitude: 40.723, longitude: -73.988 },
      { latitude: 40.717, longitude: -73.988 },
    ],
    center: { latitude: 40.72, longitude: -73.9915 },
    suggestion: {
      vehicle: 'Smart City Cruiser',
      type: 'Car',
      emoji: '🚗',
      reason: 'Light to moderate traffic. The Smart City Cruiser\'s AI navigation will find the optimal path through these streets efficiently.',
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
    fillColor: 'rgba(255,77,109,0.25)',
    strokeColor: 'rgba(255,77,109,0.8)',
    coordinates: [
      { latitude: 40.706, longitude: -73.998 },
      { latitude: 40.71, longitude: -73.998 },
      { latitude: 40.71, longitude: -73.991 },
      { latitude: 40.706, longitude: -73.991 },
    ],
    center: { latitude: 40.708, longitude: -73.9945 },
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
    <Modal visible={!!zone} animationType="slide" transparent>
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

export default function MapScreen() {
  const [selectedZone, setSelectedZone] = useState(null);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={colors.background} />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Live Traffic Map</Text>
        <View style={styles.liveIndicator}>
          <View style={styles.liveDot} />
          <Text style={styles.liveText}>Live</Text>
        </View>
      </View>

      {/* Map */}
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 40.7153,
          longitude: -74.001,
          latitudeDelta: 0.04,
          longitudeDelta: 0.04,
        }}
        userInterfaceStyle="dark"
        showsTraffic={false}
        showsUserLocation={true}
      >
        {trafficZones.map((zone) => (
          <React.Fragment key={zone.id}>
            <Polygon
              coordinates={zone.coordinates}
              fillColor={zone.fillColor}
              strokeColor={zone.strokeColor}
              strokeWidth={2}
            />
            <Marker
              coordinate={zone.center}
              onPress={() => setSelectedZone(zone)}
            >
              <View style={[styles.zoneMarker, { backgroundColor: zone.color + 'EE', borderColor: zone.color }]}>
                <Text style={styles.zoneMarkerText}>{zone.label}</Text>
              </View>
            </Marker>
          </React.Fragment>
        ))}
      </MapView>

      {/* Legend */}
      <View style={styles.legend}>
        <Text style={styles.legendTitle}>Tap a zone for vehicle suggestion</Text>
        <View style={styles.legendItems}>
          {legendItems.map((item, i) => (
            <View key={i} style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: item.color }]} />
              <Text style={styles.legendLabel}>{item.label}</Text>
            </View>
          ))}
        </View>
      </View>

      <SuggestionModal zone={selectedZone} onClose={() => setSelectedZone(null)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
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
  headerTitle: {
    color: colors.textPrimary,
    fontSize: 18,
    fontWeight: '700',
  },
  liveIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: colors.success + '22',
    borderRadius: borderRadius.full,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  liveDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.success,
  },
  liveText: {
    color: colors.success,
    fontSize: 12,
    fontWeight: '600',
  },
  map: {
    flex: 1,
  },
  zoneMarker: {
    borderRadius: borderRadius.full,
    borderWidth: 1.5,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  zoneMarkerText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: '700',
  },
  legend: {
    backgroundColor: colors.surface,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    padding: spacing.md,
  },
  legendTitle: {
    color: colors.textSecondary,
    fontSize: 12,
    marginBottom: spacing.sm,
    textAlign: 'center',
  },
  legendItems: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    justifyContent: 'center',
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  legendDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  legendLabel: {
    color: colors.textSecondary,
    fontSize: 11,
  },

  // Modal
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalSheet: {
    backgroundColor: colors.surface,
    borderTopLeftRadius: borderRadius.xl,
    borderTopRightRadius: borderRadius.xl,
    padding: spacing.lg,
    paddingBottom: 34,
    borderTopWidth: 1,
    borderTopColor: colors.border,
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
  zoneTypeDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  zoneTypeText: {
    fontSize: 12,
    fontWeight: '600',
  },
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
  suggestionEmoji: {
    fontSize: 40,
  },
  suggestionTextBlock: {
    flex: 1,
  },
  suggestionLabel: {
    color: colors.textMuted,
    fontSize: 11,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 2,
  },
  suggestionVehicle: {
    color: colors.textPrimary,
    fontSize: 18,
    fontWeight: '800',
  },
  suggestionType: {
    fontSize: 13,
    fontWeight: '600',
  },
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
  savingText: {
    fontSize: 12,
    fontWeight: '700',
  },
  navigateBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderRadius: borderRadius.md,
    padding: spacing.md,
  },
  navigateBtnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
});
