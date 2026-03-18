// screens/services/ContactScreen.js

import React, { useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Animated,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS, SPACING, RADIUS } from '../../theme';

export default function ContactScreen({ navigation }) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(40)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        tension: 50,
        friction: 6,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 50,
        friction: 6,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <View style={styles.container}>
      {/* Background Decorations */}
      <View style={styles.bgCircle1} />
      <View style={styles.bgCircle2} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={22} color={COLORS.primaryText} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Contact Us</Text>
        <View style={styles.headerIcon}>
          <Ionicons name="call-outline" size={22} color={COLORS.primaryText} />
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Hero Section */}
        <Animated.View
          style={[
            styles.heroSection,
            {
              opacity: fadeAnim,
              transform: [{ scale: scaleAnim }],
            },
          ]}
        >
          <View style={styles.iconOuter}>
            <View style={styles.iconMiddle}>
              <View style={styles.iconInner}>
                <Ionicons name="mail" size={48} color="#fff" />
              </View>
            </View>
          </View>
          <Text style={styles.heroTitle}>Get In Touch</Text>
          <Text style={styles.heroSubtitle}>
            We are here to help you on your cosmic wellness journey
          </Text>
        </Animated.View>

        {/* Contact Info Card */}
        <Animated.View
          style={[
            styles.contactCard,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          {/* Card Header */}
          <View style={styles.cardHeader}>
            <MaterialCommunityIcons
              name="information-outline"
              size={22}
              color={COLORS.primaryText}
            />
            <Text style={styles.cardHeaderTitle}>Contact Information</Text>
          </View>

          {/* Divider */}
          <View style={styles.divider} />

          {/* Not Available Notice */}
          <View style={styles.noticeContainer}>
            <View style={styles.noticeIconContainer}>
              <Text style={styles.noticeEmoji}>📋</Text>
            </View>
            <Text style={styles.noticeTitle}>
              Currently Not Available
            </Text>
            <Text style={styles.noticeText}>
              Contact details are currently not available.
              Please check back later — we will update our
              contact information very soon!
            </Text>
          </View>

          {/* Info Items Placeholder */}
          {[
            { icon: 'call-outline', label: 'Phone', value: 'Coming Soon...' },
            { icon: 'mail-outline', label: 'Email', value: 'Coming Soon...' },
            { icon: 'location-outline', label: 'Address', value: 'Coming Soon...' },
            { icon: 'time-outline', label: 'Working Hours', value: 'Coming Soon...' },
          ].map((item, index) => (
            <View key={index} style={styles.infoItem}>
              <View style={styles.infoIconContainer}>
                <Ionicons
                  name={item.icon}
                  size={20}
                  color={COLORS.primaryText}
                />
              </View>
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>{item.label}</Text>
                <Text style={styles.infoValue}>{item.value}</Text>
              </View>
              <View style={styles.comingSoonBadge}>
                <Text style={styles.comingSoonText}>Soon</Text>
              </View>
            </View>
          ))}
        </Animated.View>

        {/* Social Media Card */}
        <Animated.View
          style={[
            styles.socialCard,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <Text style={styles.socialTitle}>🌐 Follow Us</Text>
          <Text style={styles.socialSubtitle}>
            Stay connected — social links coming soon!
          </Text>

          <View style={styles.socialRow}>
            {[
              { icon: 'logo-instagram', color: '#E1306C', label: 'Instagram' },
              { icon: 'logo-facebook', color: '#1877F2', label: 'Facebook' },
              { icon: 'logo-youtube', color: '#FF0000', label: 'YouTube' },
              { icon: 'logo-whatsapp', color: '#25D366', label: 'WhatsApp' },
            ].map((social, index) => (
              <TouchableOpacity
                key={index}
                style={styles.socialBtn}
              >
                <View style={[styles.socialIconBg, { backgroundColor: social.color + '15' }]}>
                  <Ionicons name={social.icon} size={24} color={social.color} />
                </View>
                <Text style={styles.socialLabel}>{social.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </Animated.View>

        {/* Back to Dashboard Button */}
        <Animated.View style={{ opacity: fadeAnim }}>
          <TouchableOpacity
            style={styles.dashboardBtn}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="home-outline" size={20} color="#fff" />
            <Text style={styles.dashboardBtnText}>Back to Dashboard</Text>
          </TouchableOpacity>
        </Animated.View>

        <Text style={styles.footerText}>
          Perfect Planets © 2025 • All Rights Reserved
        </Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  bgCircle1: {
    position: 'absolute',
    width: 250,
    height: 250,
    borderRadius: 125,
    backgroundColor: '#FFD6E7',
    opacity: 0.4,
    top: -60,
    right: -60,
  },
  bgCircle2: {
    position: 'absolute',
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: '#C8E6C9',
    opacity: 0.25,
    bottom: 100,
    left: -60,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 55,
    paddingBottom: SPACING.md,
    paddingHorizontal: SPACING.md,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  headerTitle: {
    flex: 1,
    fontSize: 20,
    fontWeight: '800',
    color: COLORS.primaryText,
    textAlign: 'center',
  },
  headerIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  scrollContent: {
    paddingHorizontal: SPACING.md,
    paddingBottom: SPACING.xxl,
  },
  heroSection: {
    alignItems: 'center',
    paddingVertical: SPACING.xl,
  },
  iconOuter: {
    width: 130,
    height: 130,
    borderRadius: 65,
    backgroundColor: '#E8F5E9',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.lg,
  },
  iconMiddle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#C8E6C9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconInner: {
    width: 75,
    height: 75,
    borderRadius: 37.5,
    backgroundColor: COLORS.buttonBg,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: COLORS.buttonBg,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 12,
    elevation: 10,
  },
  heroTitle: {
    fontSize: 26,
    fontWeight: '800',
    color: COLORS.primaryText,
    marginBottom: 8,
  },
  heroSubtitle: {
    fontSize: 14,
    color: COLORS.bodyText,
    opacity: 0.6,
    textAlign: 'center',
    lineHeight: 22,
    paddingHorizontal: SPACING.lg,
  },
  contactCard: {
    backgroundColor: COLORS.cardBg,
    borderRadius: RADIUS.xl,
    padding: SPACING.lg,
    marginBottom: SPACING.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 6,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
    marginBottom: SPACING.sm,
  },
  cardHeaderTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.primaryText,
  },
  divider: {
    height: 1.5,
    backgroundColor: COLORS.divider,
    marginBottom: SPACING.md,
  },
  noticeContainer: {
    backgroundColor: '#FFF8E1',
    borderRadius: RADIUS.lg,
    padding: SPACING.lg,
    alignItems: 'center',
    marginBottom: SPACING.lg,
    borderWidth: 1.5,
    borderColor: '#FFE082',
  },
  noticeIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.sm,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  noticeEmoji: {
    fontSize: 28,
  },
  noticeTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: COLORS.primaryText,
    marginBottom: SPACING.sm,
  },
  noticeText: {
    fontSize: 13,
    color: COLORS.bodyText,
    opacity: 0.7,
    textAlign: 'center',
    lineHeight: 20,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
    paddingVertical: SPACING.sm,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.divider,
  },
  infoIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E8F5E9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoContent: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 11,
    color: COLORS.bodyText,
    opacity: 0.5,
    fontWeight: '600',
  },
  infoValue: {
    fontSize: 14,
    color: COLORS.bodyText,
    fontWeight: '600',
    marginTop: 2,
    opacity: 0.4,
  },
  comingSoonBadge: {
    backgroundColor: '#E8F5E9',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: RADIUS.full,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  comingSoonText: {
    fontSize: 10,
    fontWeight: '700',
    color: COLORS.primaryText,
  },
  socialCard: {
    backgroundColor: COLORS.cardBg,
    borderRadius: RADIUS.xl,
    padding: SPACING.lg,
    marginBottom: SPACING.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 6,
  },
  socialTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: COLORS.primaryText,
    marginBottom: 4,
  },
  socialSubtitle: {
    fontSize: 12,
    color: COLORS.bodyText,
    opacity: 0.5,
    marginBottom: SPACING.md,
  },
  socialRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  socialBtn: {
    alignItems: 'center',
    gap: 6,
  },
  socialIconBg: {
    width: 52,
    height: 52,
    borderRadius: 26,
    alignItems: 'center',
    justifyContent: 'center',
  },
  socialLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: COLORS.bodyText,
    opacity: 0.7,
  },
  dashboardBtn: {
    backgroundColor: COLORS.buttonBg,
    borderRadius: RADIUS.md,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginBottom: SPACING.md,
    shadowColor: COLORS.buttonBg,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 8,
  },
  dashboardBtnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  footerText: {
    fontSize: 11,
    color: COLORS.bodyText,
    opacity: 0.3,
    textAlign: 'center',
    marginTop: SPACING.sm,
  },
});