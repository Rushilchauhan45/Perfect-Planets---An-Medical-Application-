// screens/dashboard/DashboardScreen.js

import React, { useRef, useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Animated,
  Dimensions,
  Modal,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS, SPACING, RADIUS, SHADOW } from '../../theme';

const { width } = Dimensions.get('window');

const SERVICES = [
  {
    id: 1,
    name: 'Make BirthChart',
    icon: 'chart-bubble',
    screen: 'BirthChart',
    color: '#E8F5E9',
  },
  {
    id: 2,
    name: 'Nakshtra Vichar',
    icon: 'star-crescent',
    screen: 'Nakshtra',
    color: '#F3E5F5',
  },
  {
    id: 3,
    name: 'Frequent Miscarriage',
    icon: 'hospital-box-outline',
    screen: 'Miscarriage',
    color: '#E3F2FD',
  },
  {
    id: 4,
    name: 'Svara Vigyan',
    icon: 'waveform',
    screen: 'SvaraVigyan',
    color: '#FFF8E1',
  },
  {
    id: 5,
    name: 'Kashta Prasava Yog',
    icon: 'alert-circle-outline',
    screen: null,
    color: '#FCE4EC',
  },
  {
    id: 6,
    name: 'Garbhasanskar',
    icon: 'baby-face-outline',
    screen: null,
    color: '#E8F5E9',
  },
  {
    id: 7,
    name: 'Tips for Garbhini',
    icon: 'lightbulb-on-outline',
    screen: null,
    color: '#FFF3E0',
  },
];

export default function DashboardScreen({ navigation, route }) {
  const name = route?.params?.name || 'User';
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

  // Card animations
  const cardAnims = SERVICES.map(() => useRef(new Animated.Value(0)).current);

  useEffect(() => {
    // Header animation
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();

    // Stagger card animations
    const staggered = cardAnims.map((anim, i) =>
      Animated.timing(anim, {
        toValue: 1,
        duration: 400,
        delay: i * 100,
        useNativeDriver: true,
      })
    );
    Animated.stagger(100, staggered).start();
  }, []);

  const handleServicePress = (service) => {
    if (service.screen) {
      navigation.navigate(service.screen);
    } else {
      setModalMessage(`🚧 ${service.name}\n\nWe Will Release Soon..`);
      setModalVisible(true);
    }
  };

  return (
    <View style={styles.container}>
      {/* Background Decorations */}
      <View style={styles.bgCircle1} />
      <View style={styles.bgCircle2} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header */}
        <Animated.View
          style={[
            styles.header,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <View>
            <Text style={styles.welcomeText}>Welcome back,</Text>
            <Text style={styles.nameText}>{name} 👋</Text>
            <Text style={styles.subtitleText}>
              What would you like to explore today?
            </Text>
          </View>
          <View style={styles.avatarCircle}>
            <Text style={styles.avatarText}>
              {name.charAt(0).toUpperCase()}
            </Text>
          </View>
        </Animated.View>

        {/* Services Label */}
        <Animated.View style={{ opacity: fadeAnim }}>
          <Text style={styles.sectionTitle}>✨ Available Services</Text>
        </Animated.View>

        {/* Services Grid */}
        <View style={styles.grid}>
          {SERVICES.map((service, index) => (
            <Animated.View
              key={service.id}
              style={{
                opacity: cardAnims[index],
                transform: [
                  {
                    translateY: cardAnims[index].interpolate({
                      inputRange: [0, 1],
                      outputRange: [30, 0],
                    }),
                  },
                ],
                width: '48%',
              }}
            >
              <TouchableOpacity
                style={[styles.serviceCard, { backgroundColor: service.color }]}
                onPress={() => handleServicePress(service)}
                activeOpacity={0.8}
              >
                <View style={styles.iconContainer}>
                  <MaterialCommunityIcons
                    name={service.icon}
                    size={38}
                    color={COLORS.primaryText}
                  />
                </View>
                <Text style={styles.serviceName}>{service.name}</Text>
                <View style={styles.arrowContainer}>
                  <Ionicons
                    name="arrow-forward-circle"
                    size={20}
                    color={COLORS.buttonBg}
                  />
                </View>
              </TouchableOpacity>
            </Animated.View>
          ))}
        </View>

        {/* Bottom Buttons */}
        <Animated.View style={[styles.bottomBtns, { opacity: fadeAnim }]}>
          <TouchableOpacity
            style={styles.bottomBtn}
            onPress={() => {
              setModalMessage('🔬 Research Paper\n\nWe Will Release Soon..');
              setModalVisible(true);
            }}
          >
            <Ionicons name="document-text-outline" size={20} color={COLORS.buttonBg} />
            <Text style={styles.bottomBtnText}>Research Paper</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.bottomBtn}
            onPress={() => navigation.navigate('Contact')}
          >
            <Ionicons name="call-outline" size={20} color={COLORS.buttonBg} />
            <Text style={styles.bottomBtnText}>Contact Us</Text>
          </TouchableOpacity>
        </Animated.View>
      </ScrollView>

      {/* Coming Soon Modal */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <Text style={styles.modalEmoji}>🚀</Text>
            <Text style={styles.modalTitle}>Coming Soon!</Text>
            <Text style={styles.modalMessage}>{modalMessage}</Text>
            <TouchableOpacity
              style={styles.modalBtn}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.modalBtnText}>OK, Got it!</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
  scrollContent: {
    paddingHorizontal: SPACING.md,
    paddingBottom: SPACING.xxl,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 60,
    paddingBottom: SPACING.lg,
  },
  welcomeText: {
    fontSize: 14,
    color: COLORS.bodyText,
    opacity: 0.7,
  },
  nameText: {
    fontSize: 26,
    fontWeight: '800',
    color: COLORS.primaryText,
    marginVertical: 2,
  },
  subtitleText: {
    fontSize: 13,
    color: COLORS.bodyText,
    opacity: 0.6,
  },
  avatarCircle: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: COLORS.buttonBg,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: COLORS.buttonBg,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  avatarText: {
    fontSize: 22,
    fontWeight: '800',
    color: '#fff',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.primaryText,
    marginBottom: SPACING.md,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: SPACING.sm,
  },
  serviceCard: {
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
    marginBottom: SPACING.sm,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
    minHeight: 130,
    justifyContent: 'center',
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'rgba(255,255,255,0.7)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.sm,
  },
  serviceName: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.primaryText,
    textAlign: 'center',
    lineHeight: 17,
  },
  arrowContainer: {
    marginTop: 6,
  },
  bottomBtns: {
    flexDirection: 'row',
    gap: SPACING.sm,
    marginTop: SPACING.md,
  },
  bottomBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderWidth: 2,
    borderColor: COLORS.buttonBg,
    borderRadius: RADIUS.md,
    paddingVertical: 13,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 3,
  },
  bottomBtnText: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.buttonBg,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: SPACING.lg,
  },
  modalCard: {
    backgroundColor: '#fff',
    borderRadius: RADIUS.xxl,
    padding: SPACING.xl,
    alignItems: 'center',
    width: '85%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
    elevation: 15,
  },
  modalEmoji: {
    fontSize: 48,
    marginBottom: SPACING.sm,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: COLORS.primaryText,
    marginBottom: SPACING.sm,
  },
  modalMessage: {
    fontSize: 14,
    color: COLORS.bodyText,
    textAlign: 'center',
    opacity: 0.7,
    lineHeight: 22,
    marginBottom: SPACING.lg,
  },
  modalBtn: {
    backgroundColor: COLORS.buttonBg,
    borderRadius: RADIUS.md,
    paddingVertical: 12,
    paddingHorizontal: SPACING.xl,
    shadowColor: COLORS.buttonBg,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  modalBtnText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '700',
  },
});