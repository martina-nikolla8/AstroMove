import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, borderRadius } from '../theme';

const team = [
  { name: 'Emi Gishto', role: 'Transportation Analyst', emoji: '👩‍💻', color: '#6C63FF' },
  { name: 'Martina Nikolla', role: 'Urban Mobility Designer', emoji: '👩‍🔬', color: '#00D4FF' },
  { name: 'Athina Qirici', role: 'Systems Engineer', emoji: '👩‍🏫', color: '#FF4D6D' },
  { name: 'Maria Peçi', role: 'Data & Route Analyst', emoji: '👩‍🎨', color: '#FFB800' },
];

const values = [
  {
    icon: 'leaf-outline',
    title: 'Sustainability',
    description: 'Every route recommendation prioritizes lower emissions and greener travel choices.',
    color: '#00FF9C',
  },
  {
    icon: 'flash-outline',
    title: 'Innovation',
    description: 'Leveraging solar energy, maglev transit, and AI routing to reimagine how cities move.',
    color: '#6C63FF',
  },
  {
    icon: 'people-outline',
    title: 'Accessibility',
    description: 'Smart transportation should be available to everyone, everywhere, all the time.',
    color: '#00D4FF',
  },
  {
    icon: 'shield-checkmark-outline',
    title: 'Safety',
    description: 'Real-time hazard detection and route optimization to keep every journey safe.',
    color: '#FFB800',
  },
];

export default function AboutScreen() {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={colors.background} />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>

        {/* Hero Header */}
        <LinearGradient
          colors={['#1C2235', '#0A0E1A']}
          style={styles.hero}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <LinearGradient
            colors={['#6C63FF33', '#00D4FF11']}
            style={styles.heroBadge}
          >
            <Text style={styles.heroBadgeText}>🌌 AstroMove</Text>
          </LinearGradient>
          <Text style={styles.heroTitle}>About Us</Text>
          <Text style={styles.heroSubtitle}>
            Four women on a mission to revolutionize how cities move.
          </Text>
        </LinearGradient>

        {/* Main Description */}
        <View style={styles.section}>
          <LinearGradient
            colors={['#1C2235', '#141829']}
            style={styles.missionCard}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <View style={styles.missionIconRow}>
              <LinearGradient
                colors={['#6C63FF', '#4A44CC']}
                style={styles.missionIcon}
              >
                <Ionicons name="rocket-outline" size={22} color="#fff" />
              </LinearGradient>
              <Text style={styles.missionLabel}>Our Mission</Text>
            </View>
            <Text style={styles.missionText}>
              We are a group of four girls at CFA working together to explore and address the challenges
              of today's transportation systems. Our goal is to analyze current issues and develop
              innovative ideas that can help improve and shape the future of transportation.
            </Text>
          </LinearGradient>
        </View>

        {/* Values */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Our Values</Text>
          <View style={styles.valuesGrid}>
            {values.map((v, i) => (
              <View key={i} style={styles.valueCard}>
                <View style={[styles.valueIconContainer, { backgroundColor: v.color + '22' }]}>
                  <Ionicons name={v.icon} size={22} color={v.color} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.valueTitle}>{v.title}</Text>
                  <Text style={styles.valueDescription}>{v.description}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Team */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Our Team</Text>
          <Text style={styles.sectionSubtitle}>Four girls from CFA, building the future together</Text>
          <View style={styles.teamGrid}>
            {team.map((member, i) => (
              <View key={i} style={styles.teamCard}>
                <LinearGradient
                  colors={[member.color + '33', member.color + '11']}
                  style={styles.teamAvatarGradient}
                >
                  <Text style={styles.teamEmoji}>{member.emoji}</Text>
                </LinearGradient>
                <Text style={styles.teamName}>{member.name}</Text>
                <Text style={[styles.teamRole, { color: member.color }]}>{member.role}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Problem We're Solving */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>The Problem We Solve</Text>
          <View style={styles.problemsList}>
            {[
              { icon: 'time-outline', color: '#FF4D6D', text: 'Millions of hours wasted in traffic every day' },
              { icon: 'cloud-outline', color: '#FFB800', text: 'Transportation accounts for 29% of global CO₂ emissions' },
              { icon: 'alert-circle-outline', color: '#FF4D6D', text: 'Outdated infrastructure unable to meet demand' },
              { icon: 'bulb-outline', color: '#00D4FF', text: 'Lack of smart, data-driven routing solutions' },
            ].map((item, i) => (
              <View key={i} style={styles.problemItem}>
                <View style={[styles.problemIcon, { backgroundColor: item.color + '22' }]}>
                  <Ionicons name={item.icon} size={18} color={item.color} />
                </View>
                <Text style={styles.problemText}>{item.text}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Footer */}
        <LinearGradient
          colors={['#1C2235', '#0A0E1A']}
          style={styles.footer}
        >
          <Text style={styles.footerTitle}>AstroMove</Text>
          <Text style={styles.footerTagline}>Less waiting. Less pollution. Move like the future.</Text>
          <Text style={styles.footerCredit}>Made with care by 4 girls at CFA</Text>
        </LinearGradient>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    paddingBottom: 32,
  },
  hero: {
    padding: spacing.lg,
    paddingTop: spacing.xl,
    paddingBottom: spacing.xl,
    alignItems: 'flex-start',
  },
  heroBadge: {
    borderRadius: borderRadius.full,
    paddingHorizontal: 14,
    paddingVertical: 6,
    marginBottom: spacing.md,
  },
  heroBadgeText: {
    color: colors.primaryLight,
    fontSize: 14,
    fontWeight: '600',
  },
  heroTitle: {
    color: colors.textPrimary,
    fontSize: 32,
    fontWeight: '800',
    marginBottom: spacing.sm,
  },
  heroSubtitle: {
    color: colors.textSecondary,
    fontSize: 15,
    lineHeight: 22,
  },
  section: {
    padding: spacing.md,
    paddingTop: spacing.lg,
  },
  sectionTitle: {
    color: colors.textPrimary,
    fontSize: 20,
    fontWeight: '800',
    marginBottom: 4,
  },
  sectionSubtitle: {
    color: colors.textMuted,
    fontSize: 13,
    marginBottom: spacing.md,
  },
  missionCard: {
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
  },
  missionIconRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  missionIcon: {
    width: 38,
    height: 38,
    borderRadius: borderRadius.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  missionLabel: {
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: '700',
  },
  missionText: {
    color: colors.textSecondary,
    fontSize: 15,
    lineHeight: 24,
  },
  valuesGrid: {
    marginTop: spacing.md,
    gap: spacing.sm,
  },
  valueCard: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.md,
  },
  valueIconContainer: {
    width: 44,
    height: 44,
    borderRadius: borderRadius.sm,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    marginTop: 2,
  },
  valueTitle: {
    color: colors.textPrimary,
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 4,
  },
  valueDescription: {
    color: colors.textSecondary,
    fontSize: 13,
    lineHeight: 18,
  },
  teamGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    marginTop: spacing.md,
  },
  teamCard: {
    width: '47.5%',
    backgroundColor: colors.surface,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    gap: spacing.sm,
  },
  teamAvatarGradient: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  teamEmoji: {
    fontSize: 28,
  },
  teamName: {
    color: colors.textPrimary,
    fontSize: 14,
    fontWeight: '700',
    textAlign: 'center',
  },
  teamRole: {
    fontSize: 11,
    fontWeight: '600',
    textAlign: 'center',
  },
  problemsList: {
    marginTop: spacing.md,
    gap: spacing.sm,
  },
  problemItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    backgroundColor: colors.surface,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  problemIcon: {
    width: 38,
    height: 38,
    borderRadius: borderRadius.sm,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  problemText: {
    color: colors.textSecondary,
    fontSize: 14,
    flex: 1,
    lineHeight: 20,
  },
  footer: {
    margin: spacing.md,
    borderRadius: borderRadius.lg,
    padding: spacing.xl,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    gap: spacing.sm,
  },
  footerTitle: {
    color: colors.textPrimary,
    fontSize: 22,
    fontWeight: '800',
    letterSpacing: 1,
  },
  footerTagline: {
    color: colors.textSecondary,
    fontSize: 14,
    textAlign: 'center',
  },
  footerCredit: {
    color: colors.textMuted,
    fontSize: 12,
    marginTop: spacing.xs,
  },
});
