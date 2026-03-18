// screens/services/BirthChartScreen.js

import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    TextInput,
    Alert,
    Platform,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { COLORS, SPACING, RADIUS, SHADOW } from '../../theme';

export default function BirthChartScreen({ navigation }) {
    const [name, setName] = useState('');
    const [dob, setDob] = useState(new Date());
    const [showDobPicker, setShowDobPicker] = useState(false);
    const [birthTime, setBirthTime] = useState(new Date());
    const [showTimePicker, setShowTimePicker] = useState(false);
    const [birthPlace, setBirthPlace] = useState('');
    const [gender, setGender] = useState(null);
    const [infertilityType, setInfertilityType] = useState(null);

    const formatDate = (date) => {
        return date.toLocaleDateString('en-IN', {
            day: '2-digit',
            month: 'long',
            year: 'numeric',
        });
    };

    const formatTime = (time) => {
        return time.toLocaleTimeString('en-IN', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
        });
    };

    const handleNext = () => {
        if (!name || !birthPlace || !gender || !infertilityType) {
            Alert.alert('Incomplete Form', 'Please fill all the required fields to continue.');
            return;
        }
        Alert.alert(
            'Details Saved! ✅',
            `Name: ${name}\nDOB: ${formatDate(dob)}\nTime: ${formatTime(birthTime)}\nPlace: ${birthPlace}\nGender: ${gender}`,
            [{ text: 'OK' }]
        );
    };

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity
                    style={styles.backBtn}
                    onPress={() => navigation.goBack()}
                >
                    <Ionicons name="arrow-back" size={22} color={COLORS.primaryText} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Make BirthChart</Text>
                <View style={styles.headerIcon}>
                    <MaterialCommunityIcons
                        name="chart-bubble"
                        size={24}
                        color={COLORS.primaryText}
                    />
                </View>
            </View>

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
                keyboardShouldPersistTaps="handled"
            >
                {/* Top Banner */}
                <View style={styles.banner}>
                    <Text style={styles.bannerEmoji}>🌟</Text>
                    <View style={{ flex: 1 }}>
                        <Text style={styles.bannerTitle}>Birth Details</Text>
                        <Text style={styles.bannerSubtitle}>
                            Fill in accurate details for precise birth chart analysis
                        </Text>
                    </View>
                </View>

                {/* Form Card */}
                <View style={styles.formCard}>

                    {/* Name */}
                    <View style={styles.inputGroup}>
                        <Text style={styles.inputLabel}>
                            <Ionicons name="person-outline" size={14} color={COLORS.bodyText} /> Full Name
                        </Text>
                        <View style={styles.inputWrapper}>
                            <Ionicons name="person-outline" size={18} color={COLORS.placeholder} style={styles.inputIcon} />
                            <TextInput
                                style={styles.input}
                                placeholder="Enter patient's full name"
                                placeholderTextColor={COLORS.placeholder}
                                value={name}
                                onChangeText={setName}
                            />
                        </View>
                    </View>

                    {/* Date of Birth */}
                    <View style={styles.inputGroup}>
                        <Text style={styles.inputLabel}>
                            📅 Date of Birth
                        </Text>
                        <TouchableOpacity
                            style={styles.inputWrapper}
                            onPress={() => setShowDobPicker(true)}
                        >
                            <Ionicons name="calendar-outline" size={18} color={COLORS.placeholder} style={styles.inputIcon} />
                            <Text style={[styles.input, { color: dob ? COLORS.bodyText : COLORS.placeholder, paddingVertical: 13 }]}>
                                {formatDate(dob)}
                            </Text>
                            <View style={styles.pickerIconBtn}>
                                <Ionicons name="calendar" size={18} color="#fff" />
                            </View>
                        </TouchableOpacity>
                        {showDobPicker && (
                            <DateTimePicker
                                value={dob}
                                mode="date"
                                display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                                onChange={(event, selectedDate) => {
                                    setShowDobPicker(false);
                                    if (selectedDate) setDob(selectedDate);
                                }}
                                maximumDate={new Date()}
                            />
                        )}
                    </View>

                    {/* Birth Time */}
                    <View style={styles.inputGroup}>
                        <Text style={styles.inputLabel}>
                            ⏰ Select Birth Time
                        </Text>
                        <TouchableOpacity
                            style={styles.inputWrapper}
                            onPress={() => setShowTimePicker(true)}
                        >
                            <Ionicons name="time-outline" size={18} color={COLORS.placeholder} style={styles.inputIcon} />
                            <Text style={[styles.input, { color: COLORS.bodyText, paddingVertical: 13 }]}>
                                {formatTime(birthTime)}
                            </Text>
                            <View style={styles.pickerIconBtn}>
                                <Ionicons name="watch" size={18} color="#fff" />
                            </View>
                        </TouchableOpacity>
                        {showTimePicker && (
                            <DateTimePicker
                                value={birthTime}
                                mode="time"
                                display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                                onChange={(event, selectedTime) => {
                                    setShowTimePicker(false);
                                    if (selectedTime) setBirthTime(selectedTime);
                                }}
                            />
                        )}
                    </View>

                    {/* Birth Place */}
                    <View style={styles.inputGroup}>
                        <Text style={styles.inputLabel}>
                            📍 Birth Place
                        </Text>
                        <View style={styles.inputWrapper}>
                            <Ionicons name="location-outline" size={18} color={COLORS.placeholder} style={styles.inputIcon} />
                            <TextInput
                                style={styles.input}
                                placeholder="Enter birth city / place"
                                placeholderTextColor={COLORS.placeholder}
                                value={birthPlace}
                                onChangeText={setBirthPlace}
                            />
                        </View>
                    </View>

                    {/* Gender */}
                    <View style={styles.inputGroup}>
                        <Text style={styles.inputLabel}>⚧ Gender</Text>
                        <View style={styles.toggleRow}>
                            <TouchableOpacity
                                style={[
                                    styles.toggleBtn,
                                    gender === 'Male' && styles.toggleBtnActive,
                                ]}
                                onPress={() => setGender('Male')}
                            >
                                <Ionicons
                                    name="male"
                                    size={18}
                                    color={gender === 'Male' ? '#fff' : COLORS.primaryText}
                                />
                                <Text style={[
                                    styles.toggleText,
                                    gender === 'Male' && styles.toggleTextActive,
                                ]}>Male</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[
                                    styles.toggleBtn,
                                    gender === 'Female' && styles.toggleBtnActive,
                                ]}
                                onPress={() => setGender('Female')}
                            >
                                <Ionicons
                                    name="female"
                                    size={18}
                                    color={gender === 'Female' ? '#fff' : COLORS.primaryText}
                                />
                                <Text style={[
                                    styles.toggleText,
                                    gender === 'Female' && styles.toggleTextActive,
                                ]}>Female</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Infertility Type */}
                    <View style={styles.inputGroup}>
                        <Text style={styles.inputLabel}>🔬 Cause of Infertility</Text>
                        <Text style={styles.inputSubLabel}>Select one option below</Text>
                        <TouchableOpacity
                            style={[
                                styles.radioCard,
                                infertilityType === 'Known' && styles.radioCardActive,
                            ]}
                            onPress={() => setInfertilityType('Known')}
                        >
                            <View style={[
                                styles.radioCircle,
                                infertilityType === 'Known' && styles.radioCircleActive,
                            ]}>
                                {infertilityType === 'Known' && (
                                    <View style={styles.radioInner} />
                                )}
                            </View>
                            <View style={{ flex: 1 }}>
                                <Text style={[
                                    styles.radioTitle,
                                    infertilityType === 'Known' && styles.radioTitleActive,
                                ]}>
                                    Known Cause for Infertility
                                </Text>
                                <Text style={styles.radioSubtitle}>
                                    Identified medical reason for infertility
                                </Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[
                                styles.radioCard,
                                infertilityType === 'Unexplained' && styles.radioCardActive,
                            ]}
                            onPress={() => setInfertilityType('Unexplained')}
                        >
                            <View style={[
                                styles.radioCircle,
                                infertilityType === 'Unexplained' && styles.radioCircleActive,
                            ]}>
                                {infertilityType === 'Unexplained' && (
                                    <View style={styles.radioInner} />
                                )}
                            </View>
                            <View style={{ flex: 1 }}>
                                <Text style={[
                                    styles.radioTitle,
                                    infertilityType === 'Unexplained' && styles.radioTitleActive,
                                ]}>
                                    Unexplained Infertility
                                </Text>
                                <Text style={styles.radioSubtitle}>
                                    No identified cause found
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Next Button */}
                <TouchableOpacity style={styles.nextBtn} onPress={handleNext}>
                    <Text style={styles.nextBtnText}>Next</Text>
                    <Ionicons name="arrow-forward-circle" size={22} color="#fff" />
                </TouchableOpacity>

                <Text style={styles.noteText}>
                    * All fields are required for accurate birth chart analysis
                </Text>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    pickerIconBtn: {
  backgroundColor: COLORS.buttonBg,
  width: 32,
  height: 32,
  borderRadius: 8,
  alignItems: 'center',
  justifyContent: 'center',
  marginRight: 4,
},
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
        backgroundColor: COLORS.background,
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
    banner: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#E8F5E9',
        borderRadius: RADIUS.lg,
        padding: SPACING.md,
        marginBottom: SPACING.md,
        gap: SPACING.sm,
    },
    bannerEmoji: {
        fontSize: 32,
    },
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
    formCard: {
        backgroundColor: COLORS.cardBg,
        borderRadius: RADIUS.xl,
        padding: SPACING.lg,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.08,
        shadowRadius: 12,
        elevation: 6,
        marginBottom: SPACING.md,
    },
    inputGroup: {
        marginBottom: SPACING.md,
    },
    inputLabel: {
        fontSize: 13,
        fontWeight: '700',
        color: COLORS.bodyText,
        marginBottom: 4,
    },
    inputSubLabel: {
        fontSize: 11,
        color: COLORS.bodyText,
        opacity: 0.5,
        marginBottom: 8,
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.inputBg,
        borderRadius: RADIUS.md,
        borderWidth: 1.5,
        borderColor: COLORS.border,
        paddingHorizontal: SPACING.sm,
    },
    inputIcon: {
        marginRight: 8,
    },
    input: {
        flex: 1,
        paddingVertical: 13,
        fontSize: 14,
        color: COLORS.bodyText,
    },
    toggleRow: {
        flexDirection: 'row',
        gap: SPACING.sm,
    },
    toggleBtn: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 6,
        paddingVertical: 12,
        borderRadius: RADIUS.md,
        borderWidth: 2,
        borderColor: COLORS.border,
        backgroundColor: '#fff',
    },
    toggleBtnActive: {
        backgroundColor: COLORS.buttonBg,
        borderColor: COLORS.buttonBg,
    },
    toggleText: {
        fontSize: 14,
        fontWeight: '700',
        color: COLORS.primaryText,
    },
    toggleTextActive: {
        color: '#fff',
    },
    radioCard: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: SPACING.sm,
        padding: SPACING.md,
        borderRadius: RADIUS.md,
        borderWidth: 2,
        borderColor: COLORS.border,
        backgroundColor: '#fff',
        marginBottom: SPACING.sm,
    },
    radioCardActive: {
        borderColor: COLORS.buttonBg,
        backgroundColor: '#E8F5E9',
    },
    radioCircle: {
        width: 22,
        height: 22,
        borderRadius: 11,
        borderWidth: 2,
        borderColor: COLORS.border,
        alignItems: 'center',
        justifyContent: 'center',
    },
    radioCircleActive: {
        borderColor: COLORS.buttonBg,
    },
    radioInner: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: COLORS.buttonBg,
    },
    radioTitle: {
        fontSize: 14,
        fontWeight: '700',
        color: COLORS.bodyText,
    },
    radioTitleActive: {
        color: COLORS.primaryText,
    },
    radioSubtitle: {
        fontSize: 11,
        color: COLORS.bodyText,
        opacity: 0.5,
        marginTop: 2,
    },
    nextBtn: {
        backgroundColor: COLORS.buttonBg,
        borderRadius: RADIUS.md,
        paddingVertical: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        shadowColor: COLORS.buttonBg,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.35,
        shadowRadius: 10,
        elevation: 8,
        marginBottom: SPACING.sm,
    },
    nextBtnText: {
        color: '#fff',
        fontSize: 17,
        fontWeight: '800',
        letterSpacing: 0.5,
    },
    noteText: {
        fontSize: 11,
        color: COLORS.bodyText,
        opacity: 0.4,
        textAlign: 'center',
        marginTop: 4,
    },
});