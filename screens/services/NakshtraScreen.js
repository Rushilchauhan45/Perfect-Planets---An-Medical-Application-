// screens/services/NakshtraScreen.js

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Modal,
  Dimensions,
  ActivityIndicator,
  Platform,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS, SPACING, RADIUS } from '../../theme';

const Pdf = null; // PDF works on device only

const { width, height } = Dimensions.get('window');

const NAKSHTRAS = [
    { id: 1, name: 'Ashwini', emoji: '🐴', color: '#E8F5E9', pdf: require('../../assets/pdfs/ashwini.pdf') },
    { id: 2, name: 'Bharani', emoji: '🌸', color: '#FCE4EC', pdf: require('../../assets/pdfs/bharani.pdf') },
    { id: 3, name: 'Krittika', emoji: '🔥', color: '#FFF3E0', pdf: require('../../assets/pdfs/krittika.pdf') },
    { id: 4, name: 'Rohini', emoji: '🌙', color: '#E3F2FD', pdf: require('../../assets/pdfs/rohini.pdf') },
    { id: 5, name: 'Mrigashira', emoji: '🦌', color: '#E8F5E9', pdf: require('../../assets/pdfs/mrigashira.pdf') },
    { id: 6, name: 'Ardra', emoji: '💧', color: '#E1F5FE', pdf: require('../../assets/pdfs/ardra.pdf') },
    { id: 7, name: 'Punarvasu', emoji: '⭐', color: '#FFF8E1', pdf: require('../../assets/pdfs/punarvasu.pdf') },
    { id: 8, name: 'Pushya', emoji: '🌺', color: '#FCE4EC', pdf: require('../../assets/pdfs/pushya.pdf') },
    { id: 9, name: 'Ashlesha', emoji: '🐍', color: '#F3E5F5', pdf: require('../../assets/pdfs/ashlesha.pdf') },
    { id: 10, name: 'Magha', emoji: '👑', color: '#FFF3E0', pdf: require('../../assets/pdfs/magha.pdf') },
    { id: 11, name: 'Purva Phalguni', emoji: '🌹', color: '#FCE4EC', pdf: require('../../assets/pdfs/purva_phalguni.pdf') },
    { id: 12, name: 'Uttara Phalguni', emoji: '☀️', color: '#FFFDE7', pdf: require('../../assets/pdfs/uttara_phalguni.pdf') },
    { id: 13, name: 'Hasta', emoji: '🤚', color: '#E8F5E9', pdf: require('../../assets/pdfs/hasta.pdf') },
    { id: 14, name: 'Chitra', emoji: '💎', color: '#E3F2FD', pdf: require('../../assets/pdfs/chitra.pdf') },
    { id: 15, name: 'Swati', emoji: '🌬️', color: '#E1F5FE', pdf: require('../../assets/pdfs/swati.pdf') },
    { id: 16, name: 'Vishakha', emoji: '⚡', color: '#FFF8E1', pdf: require('../../assets/pdfs/vishakha.pdf') },
    { id: 17, name: 'Anuradha', emoji: '🌟', color: '#E8F5E9', pdf: require('../../assets/pdfs/anuradha.pdf') },
    { id: 18, name: 'Jyeshtha', emoji: '🏆', color: '#FFF3E0', pdf: require('../../assets/pdfs/jyeshtha.pdf') },
    { id: 19, name: 'Mula', emoji: '🌿', color: '#E8F5E9', pdf: require('../../assets/pdfs/mula.pdf') },
    { id: 20, name: 'Purva Ashadha', emoji: '🌊', color: '#E3F2FD', pdf: require('../../assets/pdfs/purva_ashadha.pdf') },
    { id: 21, name: 'Uttara Ashadha', emoji: '🦅', color: '#FFF8E1', pdf: require('../../assets/pdfs/uttara_ashadha.pdf') },
    { id: 22, name: 'Shravana', emoji: '👂', color: '#E1F5FE', pdf: require('../../assets/pdfs/shravana.pdf') },
    { id: 23, name: 'Dhanishta', emoji: '🥁', color: '#FCE4EC', pdf: require('../../assets/pdfs/dhanishta.pdf') },
    { id: 24, name: 'Shatabhisha', emoji: '💫', color: '#F3E5F5', pdf: require('../../assets/pdfs/shatabhisha.pdf') },
    { id: 25, name: 'Purva Bhadrapada', emoji: '⚔️', color: '#FFF3E0', pdf: require('../../assets/pdfs/purva_bhadrapada.pdf') },
    { id: 26, name: 'Uttara Bhadrapada', emoji: '🐉', color: '#E8F5E9', pdf: require('../../assets/pdfs/uttara_bhadrapada.pdf') },
    { id: 27, name: 'Revati', emoji: '🐟', color: '#E3F2FD', pdf: require('../../assets/pdfs/revati.pdf') },
];

// ─── PDF Viewer Modal ───────────────────────────────────────────────────────
function PdfViewerModal({ visible, nakshtra, onClose }) {
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const pdfRef = React.useRef(null);

    // Reset state when new nakshtra opens
    React.useEffect(() => {
        if (visible) {
            setCurrentPage(1);
            setTotalPages(0);
            setLoading(true);
            setError(false);
        }
    }, [visible, nakshtra]);

    const goToPrevPage = () => {
        if (currentPage > 1) {
            const newPage = currentPage - 1;
            setCurrentPage(newPage);
            pdfRef.current?.setPage(newPage);
        }
    };

    const goToNextPage = () => {
        if (currentPage < totalPages) {
            const newPage = currentPage + 1;
            setCurrentPage(newPage);
            pdfRef.current?.setPage(newPage);
        }
    };

    if (!nakshtra) return null;

    return (
        <Modal
            visible={visible}
            animationType="slide"
            onRequestClose={onClose}
        >
            <View style={pdfStyles.container}>

                {/* Header */}
                <View style={pdfStyles.header}>
                    <TouchableOpacity style={pdfStyles.closeBtn} onPress={onClose}>
                        <Ionicons name="arrow-back" size={22} color={COLORS.primaryText} />
                    </TouchableOpacity>
                    <View style={{ flex: 1 }}>
                        <Text style={pdfStyles.headerTitle}>
                            {nakshtra.emoji}  {nakshtra.name}
                        </Text>
                        <Text style={pdfStyles.headerSubtitle}>Nakshtra Vichar</Text>
                    </View>
                    {/* Page Counter */}
                    {totalPages > 0 && (
                        <View style={pdfStyles.pageCounter}>
                            <Text style={pdfStyles.pageCounterText}>
                                {currentPage} / {totalPages}
                            </Text>
                        </View>
                    )}
                </View>

                {/* PDF Viewer */}
                <View style={pdfStyles.pdfContainer}>
                    {loading && (
                        <View style={pdfStyles.loadingContainer}>
                            <ActivityIndicator size="large" color={COLORS.buttonBg} />
                            <Text style={pdfStyles.loadingText}>Loading PDF...</Text>
                        </View>
                    )}

                    {error && (
                        <View style={pdfStyles.errorContainer}>
                            <Text style={pdfStyles.errorEmoji}>📄</Text>
                            <Text style={pdfStyles.errorTitle}>PDF Load Error</Text>
                            <Text style={pdfStyles.errorText}>
                                Could not load {nakshtra.name} PDF.{'\n'}
                                Please check the file in assets/pdfs/
                            </Text>
                            <TouchableOpacity style={pdfStyles.retryBtn} onPress={onClose}>
                                <Text style={pdfStyles.retryBtnText}>Go Back</Text>
                            </TouchableOpacity>
                        </View>
                    )}

                    {Platform.OS === 'web' ? (
                        <View style={pdfStyles.webNotice}>
                            <Text style={pdfStyles.webNoticeEmoji}>📱</Text>
                            <Text style={pdfStyles.webNoticeTitle}>Mobile Only Feature</Text>
                            <Text style={pdfStyles.webNoticeText}>
                                PDF viewer works on Android & iOS only.{'\n'}
                                Please test on real device or emulator.
                            </Text>
                        </View>
                    ) : (
                        <Pdf
                            ref={pdfRef}
                            source={nakshtra.pdf}
                            style={[pdfStyles.pdf, (loading || error) && { opacity: 0 }]}
                            page={currentPage}
                            horizontal={false}
                            enablePaging={true}
                            onLoadComplete={(numberOfPages) => {
                                setTotalPages(numberOfPages);
                                setLoading(false);
                                setError(false);
                            }}
                            onPageChanged={(page) => {
                                setCurrentPage(page);
                            }}
                            onError={() => {
                                setLoading(false);
                                setError(true);
                            }}
                            trustAllCerts={false}
                        />
                    )}
                </View>

                {/* Bottom Navigation */}
                {!loading && !error && totalPages > 0 && (
                    <View style={pdfStyles.navigation}>

                        {/* Previous Button */}
                        <TouchableOpacity
                            style={[
                                pdfStyles.navBtn,
                                currentPage === 1 && pdfStyles.navBtnDisabled,
                            ]}
                            onPress={goToPrevPage}
                            disabled={currentPage === 1}
                        >
                            <Ionicons
                                name="chevron-back"
                                size={20}
                                color={currentPage === 1 ? '#bbb' : '#fff'}
                            />
                            <Text style={[
                                pdfStyles.navBtnText,
                                currentPage === 1 && pdfStyles.navBtnTextDisabled,
                            ]}>
                                Previous
                            </Text>
                        </TouchableOpacity>

                        {/* Page Progress Bar */}
                        <View style={pdfStyles.progressContainer}>
                            <View style={pdfStyles.progressBar}>
                                <View
                                    style={[
                                        pdfStyles.progressFill,
                                        { width: `${(currentPage / totalPages) * 100}%` },
                                    ]}
                                />
                            </View>
                            <Text style={pdfStyles.progressText}>
                                Page {currentPage} of {totalPages}
                            </Text>
                        </View>

                        {/* Next Button */}
                        <TouchableOpacity
                            style={[
                                pdfStyles.navBtn,
                                currentPage === totalPages && pdfStyles.navBtnDisabled,
                            ]}
                            onPress={goToNextPage}
                            disabled={currentPage === totalPages}
                        >
                            <Text style={[
                                pdfStyles.navBtnText,
                                currentPage === totalPages && pdfStyles.navBtnTextDisabled,
                            ]}>
                                Next
                            </Text>
                            <Ionicons
                                name="chevron-forward"
                                size={20}
                                color={currentPage === totalPages ? '#bbb' : '#fff'}
                            />
                        </TouchableOpacity>
                    </View>
                )}
            </View>
        </Modal>
    );
}

// ─── Main Screen ────────────────────────────────────────────────────────────
export default function NakshtraScreen({ navigation }) {
    const [selectedNakshtra, setSelectedNakshtra] = useState(null);
    const [pdfVisible, setPdfVisible] = useState(false);

    const handleNakshtraPress = (nakshtra) => {
        setSelectedNakshtra(nakshtra);
        setPdfVisible(true);
    };

    const renderNakshtra = ({ item, index }) => (
        <TouchableOpacity
            style={[styles.nakshtraCard, { backgroundColor: item.color }]}
            onPress={() => handleNakshtraPress(item)}
            activeOpacity={0.8}
        >
            <View style={styles.nakshtraLeft}>
                <View style={styles.nakshtraNumberBadge}>
                    <Text style={styles.nakshtraNumber}>{index + 1}</Text>
                </View>
                <Text style={styles.nakshtraEmoji}>{item.emoji}</Text>
                <View>
                    <Text style={styles.nakshtraName}>{item.name}</Text>
                    <Text style={styles.nakshtraSubtitle}>Tap to view PDF</Text>
                </View>
            </View>
            <View style={styles.nakshtraRight}>
                <MaterialCommunityIcons
                    name="file-pdf-box"
                    size={24}
                    color={COLORS.primaryText}
                />
                <Ionicons
                    name="chevron-forward"
                    size={18}
                    color={COLORS.primaryText}
                    style={{ marginLeft: 4 }}
                />
            </View>
        </TouchableOpacity>
    );

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
                <Text style={styles.headerTitle}>Nakshtra Vichar</Text>
                <View style={styles.headerBadge}>
                    <Text style={styles.headerBadgeText}>27</Text>
                </View>
            </View>

            {/* Subtitle */}
            <View style={styles.subtitleRow}>
                <MaterialCommunityIcons
                    name="star-crescent"
                    size={16}
                    color={COLORS.primaryText}
                />
                <Text style={styles.subtitle}>
                    Select a Nakshtra to view its detailed PDF
                </Text>
            </View>

            {/* List */}
            <FlatList
                data={NAKSHTRAS}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderNakshtra}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.listContent}
            />

            {/* PDF Viewer Modal */}
            <PdfViewerModal
                visible={pdfVisible}
                nakshtra={selectedNakshtra}
                onClose={() => {
                    setPdfVisible(false);
                    setSelectedNakshtra(null);
                }}
            />
        </View>
    );
}

// ─── Styles ─────────────────────────────────────────────────────────────────
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
    headerBadge: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: COLORS.buttonBg,
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerBadgeText: {
        color: '#fff',
        fontWeight: '800',
        fontSize: 14,
    },
    subtitleRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        paddingHorizontal: SPACING.md,
        marginBottom: SPACING.sm,
    },
    subtitle: {
        fontSize: 13,
        color: COLORS.bodyText,
        opacity: 0.7,
    },
    listContent: {
        paddingHorizontal: SPACING.md,
        paddingBottom: SPACING.xl,
        gap: SPACING.sm,
    },
    nakshtraCard: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderRadius: RADIUS.lg,
        padding: SPACING.md,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.06,
        shadowRadius: 6,
        elevation: 3,
    },
    nakshtraLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: SPACING.sm,
        flex: 1,
    },
    nakshtraNumberBadge: {
        width: 28,
        height: 28,
        borderRadius: 14,
        backgroundColor: 'rgba(255,255,255,0.8)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    nakshtraNumber: {
        fontSize: 12,
        fontWeight: '800',
        color: COLORS.primaryText,
    },
    nakshtraEmoji: {
        fontSize: 24,
    },
    nakshtraName: {
        fontSize: 15,
        fontWeight: '700',
        color: COLORS.primaryText,
    },
    nakshtraSubtitle: {
        fontSize: 11,
        color: COLORS.bodyText,
        opacity: 0.5,
        marginTop: 2,
    },
    nakshtraRight: {
        flexDirection: 'row',
        alignItems: 'center',
    },
});

const pdfStyles = StyleSheet.create({
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
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 4,
        elevation: 4,
        gap: SPACING.sm,
    },
    closeBtn: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: COLORS.background,
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '800',
        color: COLORS.primaryText,
    },
    headerSubtitle: {
        fontSize: 12,
        color: COLORS.bodyText,
        opacity: 0.6,
    },
    pageCounter: {
        backgroundColor: COLORS.buttonBg,
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: RADIUS.full,
    },
    pageCounterText: {
        color: '#fff',
        fontWeight: '700',
        fontSize: 13,
    },
    pdfContainer: {
        flex: 1,
    },
    pdf: {
        flex: 1,
        width: width,
        backgroundColor: COLORS.background,
    },
    loadingContainer: {
        position: 'absolute',
        top: 0, left: 0, right: 0, bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.background,
        zIndex: 10,
    },
    loadingText: {
        marginTop: SPACING.sm,
        fontSize: 14,
        color: COLORS.bodyText,
        opacity: 0.6,
    },
    errorContainer: {
        position: 'absolute',
        top: 0, left: 0, right: 0, bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.background,
        zIndex: 10,
        padding: SPACING.xl,
    },
    errorEmoji: {
        fontSize: 56,
        marginBottom: SPACING.md,
    },
    errorTitle: {
        fontSize: 20,
        fontWeight: '800',
        color: COLORS.primaryText,
        marginBottom: SPACING.sm,
    },
    errorText: {
        fontSize: 14,
        color: COLORS.bodyText,
        opacity: 0.6,
        textAlign: 'center',
        lineHeight: 22,
        marginBottom: SPACING.lg,
    },
    retryBtn: {
        backgroundColor: COLORS.buttonBg,
        paddingHorizontal: SPACING.xl,
        paddingVertical: 12,
        borderRadius: RADIUS.md,
    },
    retryBtnText: {
        color: '#fff',
        fontWeight: '700',
        fontSize: 15,
    },
    navigation: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: SPACING.md,
        paddingVertical: SPACING.md,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.06,
        shadowRadius: 8,
        elevation: 8,
    },
    navBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        backgroundColor: COLORS.buttonBg,
        paddingHorizontal: SPACING.md,
        paddingVertical: 10,
        borderRadius: RADIUS.md,
        shadowColor: COLORS.buttonBg,
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 4,
    },
    navBtnDisabled: {
        backgroundColor: '#EEEEEE',
        shadowOpacity: 0,
        elevation: 0,
    },
    navBtnText: {
        color: '#fff',
        fontWeight: '700',
        fontSize: 14,
    },
    navBtnTextDisabled: {
        color: '#bbb',
    },
    progressContainer: {
        flex: 1,
        alignItems: 'center',
        paddingHorizontal: SPACING.sm,
        gap: 6,
    },
    progressBar: {
        width: '100%',
        height: 6,
        backgroundColor: COLORS.border,
        borderRadius: 3,
        overflow: 'hidden',
    },
    progressFill: {
        height: '100%',
        backgroundColor: COLORS.buttonBg,
        borderRadius: 3,
    },
    progressText: {
        fontSize: 11,
        fontWeight: '600',
        color: COLORS.bodyText,
        opacity: 0.6,
    },
    webNotice: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.background,
        padding: SPACING.xl,
    },
    webNoticeEmoji: {
        fontSize: 64,
        marginBottom: SPACING.md,
    },
    webNoticeTitle: {
        fontSize: 20,
        fontWeight: '800',
        color: COLORS.primaryText,
        marginBottom: SPACING.sm,
    },
    webNoticeText: {
        fontSize: 14,
        color: COLORS.bodyText,
        opacity: 0.6,
        textAlign: 'center',
        lineHeight: 22,
    },
});
