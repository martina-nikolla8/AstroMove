import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  StatusBar,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, borderRadius } from '../theme';

const vehicles = [
  {
    id: 1,
    name: 'Smart City Cruiser',
    type: 'Car',
    emoji: '🚗',
    tagline: 'Electric city car for daily commutes',
    gradient: ['#6C63FF', '#4A44CC'],
    badge: 'Electric',
    badgeColor: '#6C63FF',
    specs: [
      { icon: 'flash-outline', label: 'Range', value: '400 km' },
      { icon: 'speedometer-outline', label: 'Top Speed', value: '160 km/h' },
      { icon: 'time-outline', label: 'Charge Time', value: '45 min' },
      { icon: 'leaf-outline', label: 'Emissions', value: 'Zero' },
    ],
    description:
      'The Smart City Cruiser is your perfect daily companion. Equipped with AI-powered navigation, it learns your favorite routes and avoids congestion automatically. The regenerative braking system recharges your battery on every stop, making it the most efficient vehicle for urban environments.',
    bestFor: 'Daily commutes, city errands, family trips',
    tags: ['AI Navigation', 'Zero Emissions', 'Auto-Park', 'Smart Charging'],
  },
  {
    id: 2,
    name: 'Solar Racer',
    type: 'Supercar',
    emoji: '🏎️',
    tagline: 'High-performance solar-powered beast',
    gradient: ['#FFB800', '#FF6B00'],
    badge: 'Solar',
    badgeColor: '#FFB800',
    specs: [
      { icon: 'flash-outline', label: 'Range', value: '800 km' },
      { icon: 'speedometer-outline', label: 'Top Speed', value: '320 km/h' },
      { icon: 'sunny-outline', label: 'Solar Power', value: '100%' },
      { icon: 'rocket-outline', label: '0–100 km/h', value: '2.4 sec' },
    ],
    description:
      'The Solar Racer harnesses photon energy directly from sunlight, meaning the more you drive in the sun, the more you charge. Its aerodynamic shell is embedded with ultra-efficient solar cells. Ideal for high-energy zones where sunlight is abundant — AstroMove will recommend this vehicle when photon levels are high.',
    bestFor: 'High-energy zones, long-distance, speed enthusiasts',
    tags: ['Solar Panels', 'Photon Energy', 'Self-Charging', 'Track Ready'],
  },
  {
    id: 3,
    name: 'Sky Express',
    type: 'Train',
    emoji: '🚄',
    tagline: 'Maglev mass transit for the future city',
    gradient: ['#00D4FF', '#0066CC'],
    badge: 'Maglev',
    badgeColor: '#00D4FF',
    specs: [
      { icon: 'people-outline', label: 'Capacity', value: '800 pax' },
      { icon: 'speedometer-outline', label: 'Top Speed', value: '500 km/h' },
      { icon: 'leaf-outline', label: 'Emissions', value: 'Zero' },
      { icon: 'flash-outline', label: 'Power', value: 'Magnetic' },
    ],
    description:
      'The Sky Express is the backbone of AstroMove\'s mass transit network. Using magnetic levitation, it floats above the track with zero friction, consuming 60% less energy than traditional trains. During peak traffic hours, AstroMove will route you via Sky Express stations to slash your travel time significantly.',
    bestFor: 'Heavy traffic zones, long corridors, group travel',
    tags: ['Maglev', 'High Capacity', 'Traffic Bypass', 'Zero Friction'],
  },
  {
    id: 4,
    name: 'Urban Glider',
    type: 'Scooter',
    emoji: '🛴',
    tagline: 'Lightweight & agile for short urban trips',
    gradient: ['#00FF9C', '#00CC7A'],
    badge: 'Eco',
    badgeColor: '#00FF9C',
    specs: [
      { icon: 'flash-outline', label: 'Range', value: '60 km' },
      { icon: 'speedometer-outline', label: 'Top Speed', value: '45 km/h' },
      { icon: 'time-outline', label: 'Charge Time', value: '20 min' },
      { icon: 'scale-outline', label: 'Weight', value: '12 kg' },
    ],
    description:
      'The Urban Glider is designed for the last mile. Ultra-lightweight and foldable, it fits in any bag or locker. Its quick-swap battery takes just 20 minutes to fully charge. AstroMove recommends the Urban Glider for short hops, green zones, and when traffic is light — the most eco-friendly option in our fleet.',
    bestFor: 'Short trips, last mile, parks, clear routes',
    tags: ['Foldable', 'Quick Charge', 'Featherlight', 'Green Zone'],
  },
];

const VehicleCard = ({ vehicle, onPress }) => (
  <TouchableOpacity style={styles.card} onPress={() => onPress(vehicle)} activeOpacity={0.85}>
    <LinearGradient
      colors={[vehicle.gradient[0] + '22', vehicle.gradient[1] + '11']}
      style={styles.cardGradient}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <View style={styles.cardHeader}>
        <Text style={styles.emoji}>{vehicle.emoji}</Text>
        <View style={styles.cardHeaderText}>
          <View style={styles.typeRow}>
            <View style={[styles.typeBadge, { backgroundColor: vehicle.badgeColor + '33', borderColor: vehicle.badgeColor + '66' }]}>
              <Text style={[styles.typeBadgeText, { color: vehicle.badgeColor }]}>{vehicle.badge}</Text>
            </View>
            <Text style={styles.vehicleType}>{vehicle.type}</Text>
          </View>
          <Text style={styles.vehicleName}>{vehicle.name}</Text>
          <Text style={styles.vehicleTagline}>{vehicle.tagline}</Text>
        </View>
      </View>

      <View style={styles.specsRow}>
        {vehicle.specs.slice(0, 2).map((spec, i) => (
          <View key={i} style={styles.specItem}>
            <Ionicons name={spec.icon} size={14} color={vehicle.gradient[0]} />
            <Text style={[styles.specValue, { color: vehicle.gradient[0] }]}>{spec.value}</Text>
            <Text style={styles.specLabel}>{spec.label}</Text>
          </View>
        ))}
      </View>

      <View style={styles.cardFooter}>
        <View style={styles.tagsRow}>
          {vehicle.tags.slice(0, 2).map((tag, i) => (
            <View key={i} style={styles.tag}>
              <Text style={styles.tagText}>{tag}</Text>
            </View>
          ))}
        </View>
        <View style={[styles.detailsButton, { backgroundColor: vehicle.gradient[0] + '22' }]}>
          <Text style={[styles.detailsButtonText, { color: vehicle.gradient[0] }]}>Details</Text>
          <Ionicons name="chevron-forward" size={14} color={vehicle.gradient[0]} />
        </View>
      </View>
    </LinearGradient>
  </TouchableOpacity>
);

const VehicleModal = ({ vehicle, onClose }) => {
  if (!vehicle) return null;
  return (
    <Modal visible={!!vehicle} animationType="slide" transparent>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <LinearGradient
            colors={[vehicle.gradient[0] + '33', colors.surface]}
            style={styles.modalGradientHeader}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <TouchableOpacity style={styles.modalCloseBtn} onPress={onClose}>
              <Ionicons name="close" size={22} color={colors.textPrimary} />
            </TouchableOpacity>
            <Text style={styles.modalEmoji}>{vehicle.emoji}</Text>
            <Text style={styles.modalName}>{vehicle.name}</Text>
            <Text style={styles.modalType}>{vehicle.type}</Text>
          </LinearGradient>

          <ScrollView style={styles.modalBody} showsVerticalScrollIndicator={false}>
            {/* All Specs */}
            <Text style={styles.modalSectionTitle}>Specifications</Text>
            <View style={styles.allSpecsGrid}>
              {vehicle.specs.map((spec, i) => (
                <View key={i} style={styles.specCard}>
                  <Ionicons name={spec.icon} size={20} color={vehicle.gradient[0]} />
                  <Text style={[styles.specCardValue, { color: vehicle.gradient[0] }]}>{spec.value}</Text>
                  <Text style={styles.specCardLabel}>{spec.label}</Text>
                </View>
              ))}
            </View>

            {/* Description */}
            <Text style={styles.modalSectionTitle}>About</Text>
            <Text style={styles.modalDescription}>{vehicle.description}</Text>

            {/* Best For */}
            <Text style={styles.modalSectionTitle}>Best For</Text>
            <View style={styles.bestForRow}>
              <Ionicons name="checkmark-circle" size={16} color={vehicle.gradient[0]} />
              <Text style={styles.bestForText}>{vehicle.bestFor}</Text>
            </View>

            {/* All Tags */}
            <Text style={styles.modalSectionTitle}>Features</Text>
            <View style={styles.allTagsRow}>
              {vehicle.tags.map((tag, i) => (
                <View key={i} style={[styles.fullTag, { backgroundColor: vehicle.gradient[0] + '22', borderColor: vehicle.gradient[0] + '44' }]}>
                  <Text style={[styles.fullTagText, { color: vehicle.gradient[0] }]}>{tag}</Text>
                </View>
              ))}
            </View>

            <View style={{ height: 32 }} />
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

export default function VehiclesScreen() {
  const [selected, setSelected] = useState(null);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={colors.background} />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>

        <LinearGradient colors={['#1C2235', '#0A0E1A']} style={styles.header}>
          <Text style={styles.screenTitle}>Cars of the Future</Text>
          <Text style={styles.screenSubtitle}>
            Choose your vehicle — each optimized for a different journey
          </Text>
        </LinearGradient>

        <View style={styles.vehiclesList}>
          {vehicles.map((v) => (
            <VehicleCard key={v.id} vehicle={v} onPress={setSelected} />
          ))}
        </View>
      </ScrollView>

      <VehicleModal vehicle={selected} onClose={() => setSelected(null)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  scrollContent: { paddingBottom: 32 },
  header: {
    padding: spacing.lg,
    paddingTop: spacing.xl,
    paddingBottom: spacing.xl,
  },
  screenTitle: {
    color: colors.textPrimary,
    fontSize: 28,
    fontWeight: '800',
    marginBottom: 6,
  },
  screenSubtitle: {
    color: colors.textSecondary,
    fontSize: 14,
    lineHeight: 20,
  },
  vehiclesList: {
    paddingHorizontal: spacing.md,
    gap: spacing.md,
  },
  card: {
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
  },
  cardGradient: {
    padding: spacing.md,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: spacing.md,
    gap: spacing.md,
  },
  emoji: {
    fontSize: 48,
  },
  cardHeaderText: {
    flex: 1,
  },
  typeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    marginBottom: 4,
  },
  typeBadge: {
    borderWidth: 1,
    borderRadius: borderRadius.full,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  typeBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  vehicleType: {
    color: colors.textMuted,
    fontSize: 12,
    fontWeight: '500',
  },
  vehicleName: {
    color: colors.textPrimary,
    fontSize: 20,
    fontWeight: '800',
    marginBottom: 2,
  },
  vehicleTagline: {
    color: colors.textSecondary,
    fontSize: 13,
  },
  specsRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  specItem: {
    flex: 1,
    backgroundColor: colors.background + '88',
    borderRadius: borderRadius.sm,
    padding: spacing.sm,
    alignItems: 'center',
    gap: 2,
  },
  specValue: {
    fontSize: 15,
    fontWeight: '700',
  },
  specLabel: {
    color: colors.textMuted,
    fontSize: 11,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  tagsRow: {
    flexDirection: 'row',
    gap: spacing.xs,
    flex: 1,
  },
  tag: {
    backgroundColor: colors.border,
    borderRadius: borderRadius.full,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  tagText: {
    color: colors.textMuted,
    fontSize: 11,
  },
  detailsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: borderRadius.full,
    paddingHorizontal: 12,
    paddingVertical: 6,
    gap: 2,
  },
  detailsButtonText: {
    fontSize: 12,
    fontWeight: '600',
  },

  // Modal
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: colors.surface,
    borderTopLeftRadius: borderRadius.xl,
    borderTopRightRadius: borderRadius.xl,
    maxHeight: '90%',
    overflow: 'hidden',
  },
  modalGradientHeader: {
    padding: spacing.lg,
    paddingTop: spacing.xl,
    alignItems: 'center',
    position: 'relative',
  },
  modalCloseBtn: {
    position: 'absolute',
    top: spacing.md,
    right: spacing.md,
    backgroundColor: colors.border,
    borderRadius: borderRadius.full,
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalEmoji: {
    fontSize: 56,
    marginBottom: spacing.sm,
  },
  modalName: {
    color: colors.textPrimary,
    fontSize: 24,
    fontWeight: '800',
    textAlign: 'center',
  },
  modalType: {
    color: colors.textSecondary,
    fontSize: 14,
    marginTop: 4,
  },
  modalBody: {
    padding: spacing.md,
  },
  modalSectionTitle: {
    color: colors.textPrimary,
    fontSize: 14,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: spacing.sm,
    marginTop: spacing.md,
  },
  allSpecsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  specCard: {
    width: '47%',
    backgroundColor: colors.surfaceAlt,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    alignItems: 'center',
    gap: 4,
    borderWidth: 1,
    borderColor: colors.border,
  },
  specCardValue: {
    fontSize: 18,
    fontWeight: '700',
  },
  specCardLabel: {
    color: colors.textMuted,
    fontSize: 12,
  },
  modalDescription: {
    color: colors.textSecondary,
    fontSize: 14,
    lineHeight: 22,
  },
  bestForRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 6,
  },
  bestForText: {
    color: colors.textSecondary,
    fontSize: 14,
    flex: 1,
  },
  allTagsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.xs,
  },
  fullTag: {
    borderWidth: 1,
    borderRadius: borderRadius.full,
    paddingHorizontal: 12,
    paddingVertical: 5,
  },
  fullTagText: {
    fontSize: 12,
    fontWeight: '600',
  },
});
