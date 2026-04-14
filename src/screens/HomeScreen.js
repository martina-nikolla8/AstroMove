import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, borderRadius } from '../theme';

const StatCard = ({ icon, value, label, color }) => (
  <View style={styles.statCard}>
    <Ionicons name={icon} size={22} color={color} />
    <Text style={[styles.statValue, { color }]}>{value}</Text>
    <Text style={styles.statLabel}>{label}</Text>
  </View>
);

const QuickAction = ({ icon, label, onPress, gradient }) => (
  <TouchableOpacity style={styles.quickAction} onPress={onPress} activeOpacity={0.8}>
    <LinearGradient colors={gradient} style={styles.quickActionIcon} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
      <Ionicons name={icon} size={24} color="#fff" />
    </LinearGradient>
    <Text style={styles.quickActionLabel}>{label}</Text>
  </TouchableOpacity>
);

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={colors.background} />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>

        {/* Header */}
        <LinearGradient
          colors={['#1C2235', '#0A0E1A']}
          style={styles.header}
        >
          <View style={styles.headerTop}>
            <View>
              <Text style={styles.greeting}>Good morning 🌌</Text>
              <Text style={styles.appTitle}>AstroMove</Text>
            </View>
            <View style={styles.headerBadge}>
              <Ionicons name="flash" size={16} color={colors.accent} />
              <Text style={styles.headerBadgeText}>Live</Text>
            </View>
          </View>
          <Text style={styles.headerSubtitle}>
            Navigate smarter. Travel lighter. Move like the future.
          </Text>
        </LinearGradient>

        {/* Stats Row */}
        <View style={styles.statsRow}>
          <StatCard icon="time-outline" value="18 min" label="Saved Today" color={colors.success} />
          <StatCard icon="car-outline" value="3" label="Active Routes" color={colors.accent} />
          <StatCard icon="leaf-outline" value="2.4 kg" label="CO₂ Saved" color="#00FF9C" />
        </View>

        {/* Quick Actions */}
        <Text style={styles.sectionTitle}>Quick Access</Text>
        <View style={styles.quickActionsGrid}>
          <QuickAction
            icon="map-outline"
            label="Live Map"
            gradient={['#6C63FF', '#4A44CC']}
            onPress={() => navigation.navigate('Map')}
          />
          <QuickAction
            icon="car-sport-outline"
            label="Vehicles"
            gradient={['#00D4FF', '#0099CC']}
            onPress={() => navigation.navigate('Vehicles')}
          />
          <QuickAction
            icon="chatbubble-ellipses-outline"
            label="Feedback"
            gradient={['#FF4D6D', '#CC3355']}
            onPress={() => navigation.navigate('Feedback')}
          />
          <QuickAction
            icon="information-circle-outline"
            label="About Us"
            gradient={['#FFB800', '#CC9200']}
            onPress={() => navigation.navigate('About')}
          />
        </View>

        {/* Tip Banner */}
        <LinearGradient
          colors={['#1C2235', '#242A42']}
          style={styles.tipBanner}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <Ionicons name="bulb-outline" size={20} color={colors.warning} style={{ marginRight: 10 }} />
          <View style={{ flex: 1 }}>
            <Text style={styles.tipTitle}>Route Tip</Text>
            <Text style={styles.tipText}>
              High traffic detected downtown. Consider the Train or Scooter for a 20% faster commute right now.
            </Text>
          </View>
        </LinearGradient>

        {/* Recent Activity */}
        <Text style={styles.sectionTitle}>Recent Activity</Text>
        <View style={styles.activityList}>
          <ActivityItem icon="train-outline" color={colors.primary} text="Took Sky Express — saved 14 min" time="2h ago" />
          <ActivityItem icon="bicycle-outline" color={colors.success} text="Urban Glider route via Park Ave" time="Yesterday" />
          <ActivityItem icon="car-outline" color={colors.accent} text="Smart City Cruiser — downtown loop" time="2 days ago" />
        </View>

      </ScrollView>
    </View>
  );
}

const ActivityItem = ({ icon, color, text, time }) => (
  <View style={styles.activityItem}>
    <View style={[styles.activityIcon, { backgroundColor: color + '22' }]}>
      <Ionicons name={icon} size={18} color={color} />
    </View>
    <Text style={styles.activityText} numberOfLines={1}>{text}</Text>
    <Text style={styles.activityTime}>{time}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    paddingBottom: 32,
  },
  header: {
    padding: spacing.lg,
    paddingTop: spacing.xl,
    paddingBottom: spacing.xl,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.sm,
  },
  greeting: {
    color: colors.textSecondary,
    fontSize: 14,
    marginBottom: 4,
  },
  appTitle: {
    color: colors.textPrimary,
    fontSize: 32,
    fontWeight: '800',
    letterSpacing: 1,
  },
  headerBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.accent + '22',
    borderColor: colors.accent + '44',
    borderWidth: 1,
    borderRadius: borderRadius.full,
    paddingHorizontal: 10,
    paddingVertical: 4,
    gap: 4,
  },
  headerBadgeText: {
    color: colors.accent,
    fontSize: 12,
    fontWeight: '600',
  },
  headerSubtitle: {
    color: colors.textSecondary,
    fontSize: 14,
    lineHeight: 20,
  },
  statsRow: {
    flexDirection: 'row',
    marginHorizontal: spacing.md,
    marginBottom: spacing.lg,
    gap: spacing.sm,
  },
  statCard: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    gap: 4,
  },
  statValue: {
    fontSize: 18,
    fontWeight: '700',
  },
  statLabel: {
    color: colors.textMuted,
    fontSize: 11,
    textAlign: 'center',
  },
  sectionTitle: {
    color: colors.textPrimary,
    fontSize: 18,
    fontWeight: '700',
    marginHorizontal: spacing.md,
    marginBottom: spacing.md,
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: spacing.md,
    gap: spacing.sm,
    marginBottom: spacing.lg,
  },
  quickAction: {
    width: '47.5%',
    backgroundColor: colors.surface,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    gap: spacing.sm,
  },
  quickActionIcon: {
    width: 48,
    height: 48,
    borderRadius: borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quickActionLabel: {
    color: colors.textPrimary,
    fontSize: 14,
    fontWeight: '600',
  },
  tipBanner: {
    marginHorizontal: spacing.md,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    flexDirection: 'row',
    alignItems: 'flex-start',
    borderWidth: 1,
    borderColor: colors.warning + '33',
    marginBottom: spacing.lg,
  },
  tipTitle: {
    color: colors.warning,
    fontSize: 13,
    fontWeight: '700',
    marginBottom: 2,
  },
  tipText: {
    color: colors.textSecondary,
    fontSize: 13,
    lineHeight: 18,
  },
  activityList: {
    marginHorizontal: spacing.md,
    backgroundColor: colors.surface,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    gap: spacing.sm,
  },
  activityIcon: {
    width: 36,
    height: 36,
    borderRadius: borderRadius.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activityText: {
    flex: 1,
    color: colors.textSecondary,
    fontSize: 13,
  },
  activityTime: {
    color: colors.textMuted,
    fontSize: 11,
  },
});
