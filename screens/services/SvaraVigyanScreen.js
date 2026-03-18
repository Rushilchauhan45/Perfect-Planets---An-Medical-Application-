// screens/services/SvaraVigyanScreen.js

import React, { useState, useRef } from 'react';
import { Audio } from 'expo-av';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Animated,
  Modal,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS, SPACING, RADIUS } from '../../theme';

// ─── Data ────────────────────────────────────────────────────────────────────
const MONTH_DATA = [
  {
    id: 1,
    month: '1st Month',
    emoji: '🌱',
    color: '#E8F5E9',
    available: true,
    grah: 'Shukra',
    devta: 'Parshuram',
    grahStrotams: [
      { id: 'g1', title: 'Svastik Vanchan',             audio: require('../../assets/audio/g1_svastik_vanchan.mp3') },
      { id: 'g2', title: 'Shukra Kavach',               audio: require('../../assets/audio/g2_shukra_kavach.mp3') },
      { id: 'g3', title: 'Shukra Satvaraj Strotam',     audio: require('../../assets/audio/g3_shukra_satvaraj_strotam.mp3') },
      { id: 'g4', title: 'Shukra Astotar Nama Strotam', audio: require('../../assets/audio/g4_shukra_astotar_nama_strotam.mp3') },
    ],
    devtaStrotams: [
      { id: 'd1', title: 'Parshuram Strotam',               audio: require('../../assets/audio/d1_parshuram_strotam.m4a') },
      { id: 'd2', title: 'Parshuram Stuti',                 audio: require('../../assets/audio/d2_parshuram_stuti.mp3') },
      { id: 'd3', title: 'Parshuram Astotar Nama Strotam',  audio: require('../../assets/audio/d3_parshuram_astotar_nama_strotam.mp3') },
      { id: 'd4', title: 'Santan Gopal Strotam',            audio: require('../../assets/audio/d4_santan_gopal_strotam.m4a') },
      { id: 'd5', title: 'Amrit Sanjivani Strotam',         audio: require('../../assets/audio/d5_amrit_sanjivani_strotam.m4a') },
    ],
  },
  { id: 2, month: '2nd Month', emoji: '🌿', color: '#F3E5F5', available: false },
  { id: 3, month: '3rd Month', emoji: '🍀', color: '#E3F2FD', available: false },
  { id: 4, month: '4th Month', emoji: '🌸', color: '#FCE4EC', available: false },
  { id: 5, month: '5th Month', emoji: '🌺', color: '#FFF8E1', available: false },
  { id: 6, month: '6th Month', emoji: '🌻', color: '#E8F5E9', available: false },
  { id: 7, month: '7th Month', emoji: '🍁', color: '#FFF3E0', available: false },
  { id: 8, month: '8th Month', emoji: '🌙', color: '#E1F5FE', available: false },
  { id: 9, month: '9th Month', emoji: '⭐', color: '#F9FBE7', available: false },
];

// ─── Strotam Item Component ───────────────────────────────────────────────────
function StrotamItem({ item, isPlaying, onToggle }) {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePress = () => {
    Animated.sequence([
      Animated.timing(scaleAnim, { toValue: 0.95, duration: 100, useNativeDriver: true }),
      Animated.timing(scaleAnim, { toValue: 1, duration: 100, useNativeDriver: true }),
    ]).start();
    onToggle(item.id, item.audio);
  };

  return (
    <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
      <View style={[styles.strotamItem, isPlaying && styles.strotamItemActive]}>
        <View style={styles.strotamLeft}>
          <View style={[styles.musicIconContainer, isPlaying && styles.musicIconContainerActive]}>
            <MaterialCommunityIcons
              name={isPlaying ? 'music-note' : 'music-note-outline'}
              size={18}
              color={isPlaying ? '#fff' : COLORS.primaryText}
            />
          </View>
          <Text style={[styles.strotamTitle, isPlaying && styles.strotamTitleActive]}>
            {item.title}
          </Text>
        </View>
        <TouchableOpacity
          style={[styles.playBtn, isPlaying && styles.pauseBtn]}
          onPress={handlePress}
          activeOpacity={0.8}
        >
          <Ionicons
            name={isPlaying ? 'pause' : 'play'}
            size={18}
            color="#fff"
          />
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
}

// ─── Month Detail Modal ───────────────────────────────────────────────────────
function MonthDetailModal({ visible, monthData, onClose }) {
  const [playingId, setPlayingId] = useState(null);
  const soundRef = useRef(null);

  const stopCurrentSound = async () => {
    if (soundRef.current) {
      await soundRef.current.stopAsync();
      await soundRef.current.unloadAsync();
      soundRef.current = null;
    }
  };

  const handleToggle = async (id, audioFile) => {
    if (playingId === id) {
      await stopCurrentSound();
      setPlayingId(null);
    } else {
      await stopCurrentSound();
      try {
        await Audio.setAudioModeAsync({
          playsInSilentModeIOS: true,
          staysActiveInBackground: true,
        });
        const { sound } = await Audio.Sound.createAsync(audioFile);
        soundRef.current = sound;
        await sound.playAsync();
        setPlayingId(id);
        sound.setOnPlaybackStatusUpdate((status) => {
          if (status.didJustFinish) {
            setPlayingId(null);
            soundRef.current = null;
          }
        });
      } catch (error) {
        console.log('Audio error:', error);
        setPlayingId(null);
      }
    }
  };

  React.useEffect(() => {
    if (!visible) {
      stopCurrentSound();
      setPlayingId(null);
    }
  }, [visible]);

  React.useEffect(() => {
    return () => {
      stopCurrentSound();
    };
  }, []);

  if (!monthData) return null;

  return (
    <Modal visible={visible} animationType="slide" onRequestClose={onClose}>
      <View style={styles.modalContainer}>

        {/* Modal Header */}
        <View style={[styles.modalHeader, { backgroundColor: monthData.color }]}>
          <TouchableOpacity style={styles.modalBackBtn} onPress={onClose}>
            <Ionicons name="arrow-back" size={22} color={COLORS.primaryText} />
          </TouchableOpacity>
          <View style={styles.modalHeaderContent}>
            <Text style={styles.modalHeaderEmoji}>{monthData.emoji}</Text>
            <View>
              <Text style={styles.modalHeaderTitle}>{monthData.month}</Text>
              <Text style={styles.modalHeaderSubtitle}>Svara Vigyan</Text>
            </View>
          </View>
          {playingId && (
            <View style={styles.nowPlayingBadge}>
              <MaterialCommunityIcons name="music-note" size={12} color="#fff" />
              <Text style={styles.nowPlayingText}>Playing</Text>
            </View>
          )}
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.modalScrollContent}
        >
          {/* Grah Section */}
          <View style={styles.sectionContainer}>
            <View style={styles.sectionTitleRow}>
              <View style={styles.sectionTitleIcon}>
                <MaterialCommunityIcons name="orbit" size={20} color="#fff" />
              </View>
              <View>
                <Text style={styles.sectionLabel}>Grah</Text>
                <Text style={styles.sectionTitle}>{monthData.grah}</Text>
              </View>
            </View>
            <View style={styles.strotamsList}>
              {monthData.grahStrotams?.map((item) => (
                <StrotamItem
                  key={item.id}
                  item={item}
                  isPlaying={playingId === item.id}
                  onToggle={handleToggle}
                />
              ))}
            </View>
          </View>

          {/* Devta Section */}
          <View style={styles.sectionContainer}>
            <View style={[styles.sectionTitleRow, styles.devtaTitleRow]}>
              <View style={[styles.sectionTitleIcon, styles.devtaIcon]}>
                <MaterialCommunityIcons name="star-four-points" size={20} color="#fff" />
              </View>
              <View>
                <Text style={styles.sectionLabel}>Devta</Text>
                <Text style={styles.sectionTitle}>{monthData.devta}</Text>
              </View>
            </View>
            <View style={styles.strotamsList}>
              {monthData.devtaStrotams?.map((item) => (
                <StrotamItem
                  key={item.id}
                  item={item}
                  isPlaying={playingId === item.id}
                  onToggle={handleToggle}
                />
              ))}
            </View>
          </View>

          {/* Info Note */}
          <View style={styles.infoNote}>
            <Ionicons name="information-circle-outline" size={16} color={COLORS.primaryText} />
            <Text style={styles.infoNoteText}>
              Tap ▶ to play • Tap ⏸ to pause • Only one plays at a time
            </Text>
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
}

// ─── Main Screen ──────────────────────────────────────────────────────────────
export default function SvaraVigyanScreen({ navigation }) {
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [detailVisible, setDetailVisible] = useState(false);
  const [notAvailableVisible, setNotAvailableVisible] = useState(false);

  const handleMonthPress = (month) => {
    if (month.available) {
      setSelectedMonth(month);
      setDetailVisible(true);
    } else {
      setNotAvailableVisible(true);
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={22} color={COLORS.primaryText} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Svara Vigyan</Text>
        <View style={styles.headerIcon}>
          <MaterialCommunityIcons name="waveform" size={22} color={COLORS.primaryText} />
        </View>
      </View>

      {/* Banner */}
      <View style={styles.banner}>
        <Text style={styles.bannerEmoji}>🌬️</Text>
        <View style={{ flex: 1 }}>
          <Text style={styles.bannerTitle}>Svara Vigyan</Text>
          <Text style={styles.bannerSubtitle}>
            Ancient science of breath — month by month guidance
          </Text>
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <Text style={styles.selectLabel}>Select a month to explore 👇</Text>

        {/* 3x3 Grid */}
        <View style={styles.grid}>
          {MONTH_DATA.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={[styles.monthCard, { backgroundColor: item.color }]}
              onPress={() => handleMonthPress(item)}
              activeOpacity={0.8}
            >
              {item.available && (
                <View style={styles.availableBadge}>
                  <MaterialCommunityIcons name="music" size={10} color="#fff" />
                </View>
              )}
              <Text style={styles.monthEmoji}>{item.emoji}</Text>
              <Text style={styles.monthText}>{item.month}</Text>
              {item.available ? (
                <View style={styles.availableRow}>
                  <Ionicons name="musical-notes" size={12} color={COLORS.buttonBg} />
                  <Text style={styles.availableText}>Available</Text>
                </View>
              ) : (
                <Text style={styles.comingSoonText}>Coming Soon</Text>
              )}
              <View style={styles.monthArrow}>
                <Ionicons name="arrow-forward-circle" size={20} color={COLORS.buttonBg} />
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Month Detail Modal */}
      <MonthDetailModal
        visible={detailVisible}
        monthData={selectedMonth}
        onClose={() => {
          setDetailVisible(false);
          setSelectedMonth(null);
        }}
      />

      {/* Not Available Modal */}
      <Modal
        visible={notAvailableVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setNotAvailableVisible(false)}
      >
        <View style={styles.notAvailableOverlay}>
          <View style={styles.notAvailableCard}>
            <Text style={styles.notAvailableEmoji}>🎵</Text>
            <Text style={styles.notAvailableTitle}>Music Not Available</Text>
            <Text style={styles.notAvailableText}>
              This month's Svara Vigyan music will be available soon.
              Stay tuned! 🙏
            </Text>
            <TouchableOpacity
              style={styles.notAvailableBtn}
              onPress={() => setNotAvailableVisible(false)}
            >
              <Text style={styles.notAvailableBtnText}>OK, Got it!</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
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
  banner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8F5E9',
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
    marginHorizontal: SPACING.md,
    marginBottom: SPACING.sm,
    gap: SPACING.sm,
  },
  bannerEmoji: { fontSize: 32 },
  bannerTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.primaryText,
  },
  bannerSubtitle: {
    fontSize: 12,
    color: COLORS.bodyText,
    opacity: 0.7,
    marginTop: 2,
  },
  scrollContent: {
    paddingHorizontal: SPACING.md,
    paddingBottom: SPACING.xxl,
  },
  selectLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.bodyText,
    opacity: 0.7,
    marginVertical: SPACING.sm,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: SPACING.sm,
  },
  monthCard: {
    width: '31%',
    borderRadius: RADIUS.lg,
    padding: SPACING.sm,
    alignItems: 'center',
    marginBottom: SPACING.xs,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 4,
    minHeight: 120,
    justifyContent: 'center',
  },
  availableBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: COLORS.buttonBg,
    width: 18,
    height: 18,
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
  },
  monthEmoji: { fontSize: 28, marginBottom: 4 },
  monthText: {
    fontSize: 12,
    fontWeight: '800',
    color: COLORS.primaryText,
    textAlign: 'center',
  },
  availableRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    marginTop: 3,
  },
  availableText: {
    fontSize: 9,
    color: COLORS.buttonBg,
    fontWeight: '700',
  },
  comingSoonText: {
    fontSize: 9,
    color: COLORS.bodyText,
    opacity: 0.5,
    marginTop: 3,
  },
  monthArrow: { marginTop: 6 },
  modalContainer: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 55,
    paddingBottom: SPACING.md,
    paddingHorizontal: SPACING.md,
    gap: SPACING.sm,
  },
  modalBackBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.8)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalHeaderContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
  },
  modalHeaderEmoji: { fontSize: 32 },
  modalHeaderTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: COLORS.primaryText,
  },
  modalHeaderSubtitle: {
    fontSize: 12,
    color: COLORS.bodyText,
    opacity: 0.6,
  },
  nowPlayingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: COLORS.buttonBg,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: RADIUS.full,
  },
  nowPlayingText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: '700',
  },
  modalScrollContent: {
    paddingHorizontal: SPACING.md,
    paddingBottom: SPACING.xxl,
    gap: SPACING.md,
  },
  sectionContainer: {
    backgroundColor: COLORS.cardBg,
    borderRadius: RADIUS.xl,
    padding: SPACING.md,
    marginBottom: SPACING.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 6,
  },
  sectionTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
    marginBottom: SPACING.md,
    paddingBottom: SPACING.sm,
    borderBottomWidth: 1.5,
    borderBottomColor: COLORS.divider,
  },
  devtaTitleRow: {
    borderBottomColor: '#F3E5F5',
  },
  sectionTitleIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.buttonBg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  devtaIcon: {
    backgroundColor: '#7B1FA2',
  },
  sectionLabel: {
    fontSize: 11,
    color: COLORS.bodyText,
    opacity: 0.5,
    fontWeight: '600',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.primaryText,
  },
  strotamsList: {
    gap: SPACING.sm,
  },
  strotamItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.background,
    borderRadius: RADIUS.md,
    padding: SPACING.sm,
    borderWidth: 1.5,
    borderColor: COLORS.border,
  },
  strotamItemActive: {
    backgroundColor: '#E8F5E9',
    borderColor: COLORS.buttonBg,
  },
  strotamLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
    flex: 1,
  },
  musicIconContainer: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: COLORS.border,
  },
  musicIconContainerActive: {
    backgroundColor: COLORS.buttonBg,
    borderColor: COLORS.buttonBg,
  },
  strotamTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.bodyText,
    flex: 1,
  },
  strotamTitleActive: {
    color: COLORS.primaryText,
    fontWeight: '700',
  },
  playBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.buttonBg,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: COLORS.buttonBg,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
  },
  pauseBtn: {
    backgroundColor: '#E53935',
    shadowColor: '#E53935',
  },
  infoNote: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#E8F5E9',
    borderRadius: RADIUS.md,
    padding: SPACING.md,
  },
  infoNoteText: {
    fontSize: 12,
    color: COLORS.bodyText,
    opacity: 0.7,
    flex: 1,
  },
  notAvailableOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: SPACING.lg,
  },
  notAvailableCard: {
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
  notAvailableEmoji: {
    fontSize: 48,
    marginBottom: SPACING.sm,
  },
  notAvailableTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: COLORS.primaryText,
    marginBottom: SPACING.sm,
  },
  notAvailableText: {
    fontSize: 14,
    color: COLORS.bodyText,
    textAlign: 'center',
    opacity: 0.7,
    lineHeight: 22,
    marginBottom: SPACING.lg,
  },
  notAvailableBtn: {
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
  notAvailableBtnText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '700',
  },
});