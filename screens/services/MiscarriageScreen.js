// screens/services/MiscarriageScreen.js

import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    TextInput,
    Modal,
    Alert,
    Platform,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { COLORS, SPACING, RADIUS } from '../../theme';

const MISCARRIAGE_TYPES = [
    'Threatened',
    'Inevitable',
    'Complete',
    'Incomplete',
    'Missed',
    'Recurrent Miscarriages',
];

const IDENTIFIED_CAUSES = [
    'Genetic Factors',
    'Incompetence',
    'Hormonal Issues',
    'Thyroid / PCOS',
    'APS / Hughes Syndrome',
    'Pathology',
    'Accidental',
    'Cervical Incompetence',
    'Uterine Anomalies',
    'Infections',
    'Placental',
];

// Multi Select Modal
function MultiSelectModal({ visible, title, options, selected, onConfirm, onClose }) {
    const [tempSelected, setTempSelected] = useState(selected);

    const toggleOption = (option) => {
        if (tempSelected.includes(option)) {
            setTempSelected(tempSelected.filter((o) => o !== option));
        } else {
            setTempSelected([...tempSelected, option]);
        }
    };

    return (
        <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
            <View style={modalStyles.overlay}>
                <View style={modalStyles.container}>
                    <View style={modalStyles.header}>
                        <Text style={modalStyles.title}>{title}</Text>
                        <Text style={modalStyles.subtitle}>Select all that apply</Text>
                    </View>

                    <ScrollView style={modalStyles.optionsList}>
                        {options.map((option) => {
                            const isSelected = tempSelected.includes(option);
                            return (
                                <TouchableOpacity
                                    key={option}
                                    style={[
                                        modalStyles.optionItem,
                                        isSelected && modalStyles.optionItemActive,
                                    ]}
                                    onPress={() => toggleOption(option)}
                                >
                                    <View style={[
                                        modalStyles.checkbox,
                                        isSelected && modalStyles.checkboxActive,
                                    ]}>
                                        {isSelected && (
                                            <Ionicons name="checkmark" size={14} color="#fff" />
                                        )}
                                    </View>
                                    <Text style={[
                                        modalStyles.optionText,
                                        isSelected && modalStyles.optionTextActive,
                                    ]}>
                                        {option}
                                    </Text>
                                </TouchableOpacity>
                            );
                        })}
                    </ScrollView>

                    <View style={modalStyles.footer}>
                        <TouchableOpacity style={modalStyles.cancelBtn} onPress={onClose}>
                            <Text style={modalStyles.cancelText}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={modalStyles.okBtn}
                            onPress={() => {
                                onConfirm(tempSelected);
                                onClose();
                            }}
                        >
                            <Text style={modalStyles.okText}>OK ({tempSelected.length})</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
}

export default function MiscarriageScreen({ navigation }) {
    const [gravida, setGravida] = useState('');
    const [parous, setParous] = useState('');
    const [abortion, setAbortion] = useState('');
    const [liveChild, setLiveChild] = useState('');
    const [deadChild, setDeadChild] = useState('');
    const [lastMiscarriage, setLastMiscarriage] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [miscarriageCount, setMiscarriageCount] = useState(null);
    const [selectedTypes, setSelectedTypes] = useState([]);
    const [selectedCauses, setSelectedCauses] = useState([]);
    const [miscarriageTiming, setMiscarriageTiming] = useState(null);
    const [uploadedFile, setUploadedFile] = useState(null);
    const [showTypesModal, setShowTypesModal] = useState(false);
    const [showCausesModal, setShowCausesModal] = useState(false);

    const formatDate = (date) => {
        return date.toLocaleDateString('en-IN', {
            day: '2-digit',
            month: 'long',
            year: 'numeric',
        });
    };

    const handleUpload = () => {
        setUploadedFile('patient_report.pdf');
        Alert.alert('Success', 'Document uploaded successfully!');
    };

    const handleSubmit = () => {
        if (!gravida || !parous || !miscarriageCount || !miscarriageTiming) {
            Alert.alert('Incomplete', 'Please fill all required fields.');
            return;
        }
        Alert.alert(
            'Submitted Successfully! ✅',
            'Patient miscarriage details have been recorded.',
            [{ text: 'OK', onPress: () => navigation.goBack() }]
        );
    };

    const NumericInput = ({ label, value, onChange, placeholder, emoji }) => (
        <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>{emoji} {label}</Text>
            <View style={styles.inputWrapper}>
                <TextInput
                    style={styles.input}
                    placeholder={placeholder}
                    placeholderTextColor={COLORS.placeholder}
                    value={value}
                    onChangeText={onChange}
                    keyboardType="numeric"
                />
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={22} color={COLORS.primaryText} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Frequent Miscarriage</Text>
                <View style={styles.headerIcon}>
                    <MaterialCommunityIcons name="hospital-box-outline" size={22} color={COLORS.primaryText} />
                </View>
            </View>

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
                keyboardShouldPersistTaps="handled"
            >
                {/* Form Title Banner */}
                <View style={styles.formTitleCard}>
                    <View style={styles.formTitleIcon}>
                        <Text style={{ fontSize: 28 }}>🏥</Text>
                    </View>
                    <View style={{ flex: 1 }}>
                        <Text style={styles.formTitle}>Patient with History</Text>
                        <Text style={styles.formTitle}>of Miscarriage</Text>
                        <Text style={styles.formSubtitle}>Fill complete obstetric history</Text>
                    </View>
                </View>

                {/* Obstetric History Card */}
                <View style={styles.sectionCard}>
                    <Text style={styles.sectionTitle}>📋 Obstetric History</Text>

                    <NumericInput
                        label="Gravida"
                        emoji="1️⃣"
                        value={gravida}
                        onChange={setGravida}
                        placeholder="How many times conceived?"
                    />
                    <NumericInput
                        label="Parous"
                        emoji="2️⃣"
                        value={parous}
                        onChange={setParous}
                        placeholder="Pregnancies reaching 24 weeks?"
                    />
                    <NumericInput
                        label="Abortion"
                        emoji="3️⃣"
                        value={abortion}
                        onChange={setAbortion}
                        placeholder="Number of abortions"
                    />
                    <NumericInput
                        label="Live Child"
                        emoji="4️⃣"
                        value={liveChild}
                        onChange={setLiveChild}
                        placeholder="Number of live children"
                    />
                    <NumericInput
                        label="Dead Child"
                        emoji="5️⃣"
                        value={deadChild}
                        onChange={setDeadChild}
                        placeholder="Number of deceased children"
                    />

                    {/* Last Miscarriage Date */}
                    <View style={styles.inputGroup}>
                        <Text style={styles.inputLabel}>6️⃣ Last Miscarriage Date</Text>
                        <TouchableOpacity
                            style={styles.inputWrapper}
                            onPress={() => setShowDatePicker(true)}
                        >
                            <Ionicons name="calendar-outline" size={18} color={COLORS.placeholder} style={{ marginRight: 8 }} />
                            <Text style={[styles.input, { color: COLORS.bodyText, paddingVertical: 13 }]}>
                                {formatDate(lastMiscarriage)}
                            </Text>
                            <View style={styles.pickerIconBtn}>
                                <Ionicons name="calendar" size={18} color="#fff" />
                            </View>
                        </TouchableOpacity>
                        {showDatePicker && (
                            <DateTimePicker
                                value={lastMiscarriage}
                                mode="date"
                                display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                                onChange={(event, selectedDate) => {
                                    setShowDatePicker(false);
                                    if (selectedDate) setLastMiscarriage(selectedDate);
                                }}
                                maximumDate={new Date()}
                            />
                        )}
                    </View>

                    {/* Miscarriage Count */}
                    <View style={styles.inputGroup}>
                        <Text style={styles.inputLabel}>7️⃣ How many Miscarriages?</Text>
                        <View style={styles.toggleRow}>
                            <TouchableOpacity
                                style={[styles.toggleBtn, miscarriageCount === 'less' && styles.toggleBtnActive]}
                                onPress={() => setMiscarriageCount('less')}
                            >
                                <Text style={[styles.toggleText, miscarriageCount === 'less' && styles.toggleTextActive]}>
                                    {'< 2 Miscarriages'}
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.toggleBtn, miscarriageCount === 'more' && styles.toggleBtnActive]}
                                onPress={() => setMiscarriageCount('more')}
                            >
                                <Text style={[styles.toggleText, miscarriageCount === 'more' && styles.toggleTextActive]}>
                                    {'≥ 2 Miscarriages'}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Type of Miscarriages */}
                    <View style={styles.inputGroup}>
                        <Text style={styles.inputLabel}>8️⃣ Type of Miscarriages</Text>
                        <TouchableOpacity
                            style={styles.multiSelectBtn}
                            onPress={() => {
                                setShowTypesModal(true);
                            }}
                        >
                            <Ionicons name="list-outline" size={18} color={COLORS.placeholder} />
                            <Text style={[
                                styles.multiSelectText,
                                selectedTypes.length > 0 && { color: COLORS.bodyText },
                            ]}>
                                {selectedTypes.length > 0
                                    ? selectedTypes.join(', ')
                                    : 'Tap to select types'}
                            </Text>
                            <Ionicons name="chevron-down" size={16} color={COLORS.placeholder} />
                        </TouchableOpacity>
                    </View>

                    {/* Identified Causes */}
                    <View style={styles.inputGroup}>
                        <Text style={styles.inputLabel}>9️⃣ Any Identified Cause?</Text>
                        <TouchableOpacity
                            style={styles.multiSelectBtn}
                            onPress={() => setShowCausesModal(true)}
                        >
                            <Ionicons name="medical-outline" size={18} color={COLORS.placeholder} />
                            <Text style={[
                                styles.multiSelectText,
                                selectedCauses.length > 0 && { color: COLORS.bodyText },
                            ]}>
                                {selectedCauses.length > 0
                                    ? selectedCauses.join(', ')
                                    : 'Tap to select causes'}
                            </Text>
                            <Ionicons name="chevron-down" size={16} color={COLORS.placeholder} />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Miscarriage Timing Card */}
                <View style={styles.sectionCard}>
                    <Text style={styles.sectionTitle}>⏱️ Miscarriage Timing</Text>
                    <View style={styles.timingRow}>
                        <TouchableOpacity
                            style={[styles.timingBtn, miscarriageTiming === 'early' && styles.timingBtnActive]}
                            onPress={() => setMiscarriageTiming('early')}
                        >
                            <Text style={styles.timingEmoji}>🌱</Text>
                            <Text style={[styles.timingTitle, miscarriageTiming === 'early' && styles.timingTitleActive]}>
                                Early Loss
                            </Text>
                            <Text style={styles.timingSubtitle}>{'< 12 Weeks'}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.timingBtn, miscarriageTiming === 'late' && styles.timingBtnActive]}
                            onPress={() => setMiscarriageTiming('late')}
                        >
                            <Text style={styles.timingEmoji}>🌿</Text>
                            <Text style={[styles.timingTitle, miscarriageTiming === 'late' && styles.timingTitleActive]}>
                                Late Loss
                            </Text>
                            <Text style={styles.timingSubtitle}>{'≥ 12 Weeks'}</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Upload Reports Card */}
                <View style={styles.sectionCard}>
                    <Text style={styles.sectionTitle}>📎 Upload Reports</Text>
                    <TouchableOpacity style={styles.uploadBtn} onPress={handleUpload}>
                        <View style={styles.uploadIconContainer}>
                            <Ionicons
                                name={uploadedFile ? 'document-text' : 'cloud-upload-outline'}
                                size={32}
                                color={uploadedFile ? COLORS.buttonBg : COLORS.placeholder}
                            />
                        </View>
                        <Text style={styles.uploadTitle}>
                            {uploadedFile ? '✅ Document Uploaded' : 'Upload Document'}
                        </Text>
                        <Text style={styles.uploadSubtitle}>
                            {uploadedFile ? uploadedFile : 'PDF, JPG, PNG supported'}
                        </Text>
                    </TouchableOpacity>
                </View>

                {/* Submit Button */}
                <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
                    <Ionicons name="checkmark-circle" size={22} color="#fff" />
                    <Text style={styles.submitBtnText}>Submit Details</Text>
                </TouchableOpacity>

                <Text style={styles.noteText}>
                    * All information is kept strictly confidential
                </Text>
            </ScrollView>

            {/* Modals */}
            <MultiSelectModal
                visible={showTypesModal}
                title="Type of Miscarriages"
                options={MISCARRIAGE_TYPES}
                selected={selectedTypes}
                onConfirm={setSelectedTypes}
                onClose={() => setShowTypesModal(false)}
            />
            <MultiSelectModal
                visible={showCausesModal}
                title="Identified Causes"
                options={IDENTIFIED_CAUSES}
                selected={selectedCauses}
                onConfirm={setSelectedCauses}
                onClose={() => setShowCausesModal(false)}
            />
        </View>
    );
}

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
    scrollContent: {
        paddingHorizontal: SPACING.md,
        paddingBottom: SPACING.xxl,
    },
    pickerIconBtn: {
        backgroundColor: COLORS.buttonBg,
        width: 32,
        height: 32,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 4,
    },
    formTitleCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FCE4EC',
        borderRadius: RADIUS.lg,
        padding: SPACING.md,
        marginBottom: SPACING.md,
        gap: SPACING.sm,
    },
    formTitleIcon: {
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: 'rgba(255,255,255,0.7)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    formTitle: {
        fontSize: 16,
        fontWeight: '800',
        color: COLORS.primaryText,
        lineHeight: 22,
    },
    formSubtitle: {
        fontSize: 12,
        color: COLORS.bodyText,
        opacity: 0.6,
        marginTop: 4,
    },
    sectionCard: {
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
    sectionTitle: {
        fontSize: 16,
        fontWeight: '800',
        color: COLORS.primaryText,
        marginBottom: SPACING.md,
        paddingBottom: SPACING.sm,
        borderBottomWidth: 1.5,
        borderBottomColor: COLORS.divider,
    },
    inputGroup: {
        marginBottom: SPACING.md,
    },
    inputLabel: {
        fontSize: 13,
        fontWeight: '700',
        color: COLORS.bodyText,
        marginBottom: 6,
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
        alignItems: 'center',
        justifyContent: 'center',
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
        fontSize: 13,
        fontWeight: '700',
        color: COLORS.primaryText,
        textAlign: 'center',
    },
    toggleTextActive: {
        color: '#fff',
    },
    multiSelectBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        backgroundColor: COLORS.inputBg,
        borderRadius: RADIUS.md,
        borderWidth: 1.5,
        borderColor: COLORS.border,
        padding: SPACING.sm,
        minHeight: 50,
    },
    multiSelectText: {
        flex: 1,
        fontSize: 13,
        color: COLORS.placeholder,
        lineHeight: 20,
    },
    timingRow: {
        flexDirection: 'row',
        gap: SPACING.sm,
    },
    timingBtn: {
        flex: 1,
        alignItems: 'center',
        padding: SPACING.md,
        borderRadius: RADIUS.lg,
        borderWidth: 2,
        borderColor: COLORS.border,
        backgroundColor: COLORS.background,
    },
    timingBtnActive: {
        borderColor: COLORS.buttonBg,
        backgroundColor: '#E8F5E9',
    },
    timingEmoji: {
        fontSize: 28,
        marginBottom: 6,
    },
    timingTitle: {
        fontSize: 14,
        fontWeight: '700',
        color: COLORS.bodyText,
    },
    timingTitleActive: {
        color: COLORS.primaryText,
    },
    timingSubtitle: {
        fontSize: 11,
        color: COLORS.bodyText,
        opacity: 0.5,
        marginTop: 2,
    },
    uploadBtn: {
        alignItems: 'center',
        padding: SPACING.lg,
        borderRadius: RADIUS.lg,
        borderWidth: 2,
        borderColor: COLORS.border,
        borderStyle: 'dashed',
        backgroundColor: COLORS.background,
    },
    uploadIconContainer: {
        width: 64,
        height: 64,
        borderRadius: 32,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: SPACING.sm,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.06,
        shadowRadius: 4,
        elevation: 3,
    },
    uploadTitle: {
        fontSize: 15,
        fontWeight: '700',
        color: COLORS.primaryText,
        marginBottom: 4,
    },
    uploadSubtitle: {
        fontSize: 12,
        color: COLORS.bodyText,
        opacity: 0.5,
    },
    submitBtn: {
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
    submitBtnText: {
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
    },
});

const modalStyles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'flex-end',
    },
    container: {
        backgroundColor: '#fff',
        borderTopLeftRadius: RADIUS.xxl,
        borderTopRightRadius: RADIUS.xxl,
        maxHeight: '75%',
        paddingBottom: SPACING.xl,
    },
    header: {
        padding: SPACING.lg,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.divider,
    },
    title: {
        fontSize: 18,
        fontWeight: '800',
        color: COLORS.primaryText,
    },
    subtitle: {
        fontSize: 12,
        color: COLORS.bodyText,
        opacity: 0.5,
        marginTop: 4,
    },
    optionsList: {
        padding: SPACING.md,
    },
    optionItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: SPACING.sm,
        padding: SPACING.md,
        borderRadius: RADIUS.md,
        marginBottom: SPACING.xs,
        backgroundColor: COLORS.background,
    },
    optionItemActive: {
        backgroundColor: '#E8F5E9',
    },
    checkbox: {
        width: 24,
        height: 24,
        borderRadius: 6,
        borderWidth: 2,
        borderColor: COLORS.border,
        alignItems: 'center',
        justifyContent: 'center',
    },
    checkboxActive: {
        backgroundColor: COLORS.buttonBg,
        borderColor: COLORS.buttonBg,
    },
    optionText: {
        fontSize: 14,
        color: COLORS.bodyText,
        fontWeight: '500',
    },
    optionTextActive: {
        color: COLORS.primaryText,
        fontWeight: '700',
    },
    footer: {
        flexDirection: 'row',
        gap: SPACING.sm,
        paddingHorizontal: SPACING.lg,
        paddingTop: SPACING.md,
    },
    cancelBtn: {
        flex: 1,
        paddingVertical: 13,
        borderRadius: RADIUS.md,
        borderWidth: 2,
        borderColor: COLORS.border,
        alignItems: 'center',
    },
    cancelText: {
        fontSize: 15,
        fontWeight: '700',
        color: COLORS.bodyText,
    },
    okBtn: {
        flex: 1,
        paddingVertical: 13,
        borderRadius: RADIUS.md,
        backgroundColor: COLORS.buttonBg,
        alignItems: 'center',
    },
    okText: {
        fontSize: 15,
        fontWeight: '700',
        color: '#fff',
    },
});