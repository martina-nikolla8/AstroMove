import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  StatusBar,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, borderRadius } from '../theme';

const TOPICS = [
  { id: 'routes', label: 'Routes', icon: 'map-outline' },
  { id: 'vehicles', label: 'Vehicles', icon: 'car-outline' },
  { id: 'app', label: 'App Experience', icon: 'phone-portrait-outline' },
  { id: 'safety', label: 'Safety', icon: 'shield-outline' },
  { id: 'other', label: 'Other', icon: 'chatbubble-outline' },
];

const StarRating = ({ value, onChange }) => (
  <View style={styles.starsRow}>
    {[1, 2, 3, 4, 5].map((star) => (
      <TouchableOpacity key={star} onPress={() => onChange(star)} activeOpacity={0.7}>
        <Ionicons
          name={star <= value ? 'star' : 'star-outline'}
          size={32}
          color={star <= value ? colors.warning : colors.textMuted}
        />
      </TouchableOpacity>
    ))}
  </View>
);

export default function FeedbackScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [rating, setRating] = useState(0);
  const [topic, setTopic] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (!name.trim()) {
      Alert.alert('Missing Info', 'Please enter your name.');
      return;
    }
    if (!rating) {
      Alert.alert('Missing Info', 'Please give us a star rating.');
      return;
    }
    if (!message.trim()) {
      Alert.alert('Missing Info', 'Please write your feedback message.');
      return;
    }
    setSubmitted(true);
  };

  const handleReset = () => {
    setName('');
    setEmail('');
    setRating(0);
    setTopic('');
    setMessage('');
    setSubmitted(false);
  };

  if (submitted) {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <View style={styles.successContainer}>
          <LinearGradient
            colors={['#00FF9C33', '#00FF9C11']}
            style={styles.successIconContainer}
          >
            <Ionicons name="checkmark-circle" size={64} color={colors.success} />
          </LinearGradient>
          <Text style={styles.successTitle}>Thank You, {name}!</Text>
          <Text style={styles.successSubtitle}>
            Your feedback helps us shape the future of transportation.
            We read every message.
          </Text>
          <View style={styles.ratingDisplay}>
            {[1, 2, 3, 4, 5].map((s) => (
              <Ionicons
                key={s}
                name={s <= rating ? 'star' : 'star-outline'}
                size={20}
                color={s <= rating ? colors.warning : colors.textMuted}
              />
            ))}
          </View>
          <TouchableOpacity style={styles.newFeedbackBtn} onPress={handleReset}>
            <Text style={styles.newFeedbackBtnText}>Submit Another</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={colors.background} />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
          <LinearGradient colors={['#1C2235', '#0A0E1A']} style={styles.header}>
            <Text style={styles.screenTitle}>Feedback</Text>
            <Text style={styles.screenSubtitle}>
              Help us improve AstroMove — your voice matters
            </Text>
          </LinearGradient>

          <View style={styles.form}>
            {/* Name */}
            <View style={styles.fieldGroup}>
              <Text style={styles.fieldLabel}>Your Name *</Text>
              <View style={styles.inputWrapper}>
                <Ionicons name="person-outline" size={18} color={colors.textMuted} style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Enter your name"
                  placeholderTextColor={colors.textMuted}
                  value={name}
                  onChangeText={setName}
                  autoCapitalize="words"
                />
              </View>
            </View>

            {/* Email */}
            <View style={styles.fieldGroup}>
              <Text style={styles.fieldLabel}>Email Address (optional)</Text>
              <View style={styles.inputWrapper}>
                <Ionicons name="mail-outline" size={18} color={colors.textMuted} style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="your@email.com"
                  placeholderTextColor={colors.textMuted}
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>
            </View>

            {/* Star Rating */}
            <View style={styles.fieldGroup}>
              <Text style={styles.fieldLabel}>Overall Rating *</Text>
              <View style={styles.ratingCard}>
                <StarRating value={rating} onChange={setRating} />
                <Text style={styles.ratingDescription}>
                  {rating === 0 && 'Tap to rate'}
                  {rating === 1 && 'Needs a lot of work'}
                  {rating === 2 && 'Could be better'}
                  {rating === 3 && 'Pretty good'}
                  {rating === 4 && 'Really great!'}
                  {rating === 5 && 'Absolutely love it! ⭐'}
                </Text>
              </View>
            </View>

            {/* Topic */}
            <View style={styles.fieldGroup}>
              <Text style={styles.fieldLabel}>Topic</Text>
              <View style={styles.topicsGrid}>
                {TOPICS.map((t) => (
                  <TouchableOpacity
                    key={t.id}
                    style={[
                      styles.topicChip,
                      topic === t.id && styles.topicChipSelected,
                    ]}
                    onPress={() => setTopic(topic === t.id ? '' : t.id)}
                    activeOpacity={0.8}
                  >
                    <Ionicons
                      name={t.icon}
                      size={14}
                      color={topic === t.id ? colors.primary : colors.textMuted}
                    />
                    <Text style={[
                      styles.topicChipText,
                      topic === t.id && styles.topicChipTextSelected,
                    ]}>
                      {t.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Message */}
            <View style={styles.fieldGroup}>
              <Text style={styles.fieldLabel}>Your Message *</Text>
              <TextInput
                style={styles.textarea}
                placeholder="Tell us about your experience, suggestions, or anything you'd like us to know..."
                placeholderTextColor={colors.textMuted}
                value={message}
                onChangeText={setMessage}
                multiline
                numberOfLines={5}
                textAlignVertical="top"
              />
            </View>

            {/* Submit */}
            <TouchableOpacity activeOpacity={0.85} onPress={handleSubmit}>
              <LinearGradient
                colors={['#6C63FF', '#4A44CC']}
                style={styles.submitBtn}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <Ionicons name="send-outline" size={18} color="#fff" />
                <Text style={styles.submitBtnText}>Submit Feedback</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    paddingBottom: 48,
  },
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
  form: {
    padding: spacing.md,
    gap: spacing.lg,
  },
  fieldGroup: {
    gap: spacing.sm,
  },
  fieldLabel: {
    color: colors.textPrimary,
    fontSize: 14,
    fontWeight: '600',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: spacing.md,
  },
  inputIcon: {
    marginRight: spacing.sm,
  },
  input: {
    flex: 1,
    color: colors.textPrimary,
    fontSize: 15,
    paddingVertical: 14,
  },
  ratingCard: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
    alignItems: 'center',
    gap: spacing.sm,
  },
  starsRow: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  ratingDescription: {
    color: colors.textSecondary,
    fontSize: 13,
  },
  topicsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  topicChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    borderRadius: borderRadius.full,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: colors.surface,
  },
  topicChipSelected: {
    borderColor: colors.primary,
    backgroundColor: colors.primary + '22',
  },
  topicChipText: {
    color: colors.textMuted,
    fontSize: 13,
  },
  topicChipTextSelected: {
    color: colors.primary,
    fontWeight: '600',
  },
  textarea: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
    color: colors.textPrimary,
    fontSize: 15,
    minHeight: 120,
  },
  submitBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: borderRadius.md,
    padding: 16,
    gap: spacing.sm,
  },
  submitBtnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },

  // Success state
  successContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xl,
    gap: spacing.lg,
  },
  successIconContainer: {
    width: 110,
    height: 110,
    borderRadius: 55,
    alignItems: 'center',
    justifyContent: 'center',
  },
  successTitle: {
    color: colors.textPrimary,
    fontSize: 26,
    fontWeight: '800',
    textAlign: 'center',
  },
  successSubtitle: {
    color: colors.textSecondary,
    fontSize: 14,
    lineHeight: 22,
    textAlign: 'center',
  },
  ratingDisplay: {
    flexDirection: 'row',
    gap: 4,
  },
  newFeedbackBtn: {
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: borderRadius.md,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
  },
  newFeedbackBtnText: {
    color: colors.primary,
    fontSize: 15,
    fontWeight: '600',
  },
});
