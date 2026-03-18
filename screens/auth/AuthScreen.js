// screens/auth/AuthScreen.js

import React, { useState, useRef } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    ScrollView,
    Animated,
    Dimensions,
    Switch,
    Alert,
    KeyboardAvoidingView,
    Platform,
    Image,
} from 'react-native';
import { COLORS, SPACING, RADIUS, SHADOW } from '../../theme';
import { Ionicons, FontAwesome } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

export default function AuthScreen({ navigation }) {
    const [activeTab, setActiveTab] = useState('signin');
    const [rememberMe, setRememberMe] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showSignupPassword, setShowSignupPassword] = useState(false);

    // Signin fields
    const [signinEmail, setSigninEmail] = useState('');
    const [signinPassword, setSigninPassword] = useState('');

    // Signup fields
    const [fullName, setFullName] = useState('');
    const [signupEmail, setSignupEmail] = useState('');
    const [signupPassword, setSignupPassword] = useState('');

    const tabAnim = useRef(new Animated.Value(0)).current;
    const fadeAnim = useRef(new Animated.Value(1)).current;

    const switchTab = (tab) => {
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 0,
                duration: 150,
                useNativeDriver: true,
            }),
        ]).start(() => {
            setActiveTab(tab);
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 300,
                useNativeDriver: true,
            }).start();
        });

        Animated.spring(tabAnim, {
            toValue: tab === 'signin' ? 0 : 1,
            useNativeDriver: false,
        }).start();
    };

    const handleSignIn = () => {
        if (!signinEmail || !signinPassword) {
            Alert.alert('Error', 'Please fill all fields');
            return;
        }
        navigation.replace('Dashboard', { name: fullName || 'User' });
    };

    const handleSignUp = () => {
        if (!fullName || !signupEmail || !signupPassword) {
            Alert.alert('Error', 'Please fill all fields');
            return;
        }
        navigation.replace('Dashboard', { name: fullName });
    };

    const tabIndicatorLeft = tabAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['2%', '52%'],
    });

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            {/* Background Decorations */}
            <View style={styles.bgCircle1} />
            <View style={styles.bgCircle2} />
            <View style={styles.bgCircle3} />

            <ScrollView
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
            >
                {/* Logo Section */}
                <View style={styles.logoSection}>
                    <View style={styles.logoCircle}>
                        <Image
                            source={require('../../assets/icon.png')}
                            style={styles.logoImage}
                            resizeMode="contain"
                        />
                    </View>
                    <Text style={styles.appName}>Perfect Planets</Text>
                    <Text style={styles.appTagline}>Your Cosmic Wellness Journey</Text>
                </View>

                {/* Auth Card */}
                <View style={styles.card}>

                    {/* Tab Switcher */}
                    <View style={styles.tabContainer}>
                        <Animated.View
                            style={[
                                styles.tabIndicator,
                                { left: tabIndicatorLeft },
                            ]}
                        />
                        <TouchableOpacity
                            style={styles.tabBtn}
                            onPress={() => switchTab('signin')}
                        >
                            <Text style={[
                                styles.tabText,
                                activeTab === 'signin' && styles.tabTextActive,
                            ]}>
                                Sign In
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.tabBtn}
                            onPress={() => switchTab('signup')}
                        >
                            <Text style={[
                                styles.tabText,
                                activeTab === 'signup' && styles.tabTextActive,
                            ]}>
                                Sign Up
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <Animated.View style={{ opacity: fadeAnim }}>
                        {activeTab === 'signin' ? (
                            /* ===== SIGN IN FORM ===== */
                            <View style={styles.form}>
                                <Text style={styles.formTitle}>Welcome Back! 👋</Text>
                                <Text style={styles.formSubtitle}>Sign in to continue your journey</Text>

                                {/* Email */}
                                <View style={styles.inputGroup}>
                                    <Text style={styles.inputLabel}>Email Address</Text>
                                    <View style={styles.inputWrapper}>
                                        <Ionicons name="mail-outline" size={18} color={COLORS.placeholder} style={styles.inputIcon} />
                                        <TextInput
                                            style={styles.input}
                                            placeholder="Enter your email"
                                            placeholderTextColor={COLORS.placeholder}
                                            value={signinEmail}
                                            onChangeText={setSigninEmail}
                                            keyboardType="email-address"
                                            autoCapitalize="none"
                                        />
                                    </View>
                                </View>

                                {/* Password */}
                                <View style={styles.inputGroup}>
                                    <Text style={styles.inputLabel}>Password</Text>
                                    <View style={styles.inputWrapper}>
                                        <Ionicons name="lock-closed-outline" size={18} color={COLORS.placeholder} style={styles.inputIcon} />
                                        <TextInput
                                            style={styles.input}
                                            placeholder="Enter your password"
                                            placeholderTextColor={COLORS.placeholder}
                                            value={signinPassword}
                                            onChangeText={setSigninPassword}
                                            secureTextEntry={!showPassword}
                                        />
                                        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                                            <Ionicons
                                                name={showPassword ? 'eye-outline' : 'eye-off-outline'}
                                                size={18}
                                                color={COLORS.placeholder}
                                                style={styles.inputIconRight}
                                            />
                                        </TouchableOpacity>
                                    </View>
                                </View>

                                {/* Sign In Button */}
                                <TouchableOpacity style={styles.mainBtn} onPress={handleSignIn}>
                                    <Text style={styles.mainBtnText}>Sign In</Text>
                                    <Ionicons name="arrow-forward" size={18} color="#fff" />
                                </TouchableOpacity>

                                {/* Divider */}
                                <View style={styles.dividerRow}>
                                    <View style={styles.dividerLine} />
                                    <Text style={styles.dividerText}>or</Text>
                                    <View style={styles.dividerLine} />
                                </View>

                                {/* Google Button */}
                                <TouchableOpacity style={styles.googleBtn}>
                                    <FontAwesome name="google" size={18} color="#DB4437" />
                                    <Text style={styles.googleBtnText}>Continue with Google</Text>
                                </TouchableOpacity>
                            </View>
                        ) : (
                            /* ===== SIGN UP FORM ===== */
                            <View style={styles.form}>
                                <Text style={styles.formTitle}>Create Account ✨</Text>
                                <Text style={styles.formSubtitle}>Join your cosmic wellness journey</Text>

                                {/* Full Name */}
                                <View style={styles.inputGroup}>
                                    <Text style={styles.inputLabel}>Full Name</Text>
                                    <View style={styles.inputWrapper}>
                                        <Ionicons name="person-outline" size={18} color={COLORS.placeholder} style={styles.inputIcon} />
                                        <TextInput
                                            style={styles.input}
                                            placeholder="Enter your full name"
                                            placeholderTextColor={COLORS.placeholder}
                                            value={fullName}
                                            onChangeText={setFullName}
                                        />
                                    </View>
                                </View>

                                {/* Email */}
                                <View style={styles.inputGroup}>
                                    <Text style={styles.inputLabel}>Email Address</Text>
                                    <View style={styles.inputWrapper}>
                                        <Ionicons name="mail-outline" size={18} color={COLORS.placeholder} style={styles.inputIcon} />
                                        <TextInput
                                            style={styles.input}
                                            placeholder="Enter your email"
                                            placeholderTextColor={COLORS.placeholder}
                                            value={signupEmail}
                                            onChangeText={setSignupEmail}
                                            keyboardType="email-address"
                                            autoCapitalize="none"
                                        />
                                    </View>
                                </View>

                                {/* Password */}
                                <View style={styles.inputGroup}>
                                    <Text style={styles.inputLabel}>Password</Text>
                                    <View style={styles.inputWrapper}>
                                        <Ionicons name="lock-closed-outline" size={18} color={COLORS.placeholder} style={styles.inputIcon} />
                                        <TextInput
                                            style={styles.input}
                                            placeholder="Create a password"
                                            placeholderTextColor={COLORS.placeholder}
                                            value={signupPassword}
                                            onChangeText={setSignupPassword}
                                            secureTextEntry={!showSignupPassword}
                                        />
                                        <TouchableOpacity onPress={() => setShowSignupPassword(!showSignupPassword)}>
                                            <Ionicons
                                                name={showSignupPassword ? 'eye-outline' : 'eye-off-outline'}
                                                size={18}
                                                color={COLORS.placeholder}
                                                style={styles.inputIconRight}
                                            />
                                        </TouchableOpacity>
                                    </View>
                                </View>

                                {/* Remember Me */}
                                <View style={styles.rememberRow}>
                                    <Switch
                                        value={rememberMe}
                                        onValueChange={setRememberMe}
                                        trackColor={{ false: COLORS.border, true: COLORS.accent }}
                                        thumbColor={rememberMe ? COLORS.buttonBg : '#f4f3f4'}
                                    />
                                    <Text style={styles.rememberText}>Remember Me</Text>
                                </View>

                                {/* Sign Up Button */}
                                <TouchableOpacity style={styles.mainBtn} onPress={handleSignUp}>
                                    <Text style={styles.mainBtnText}>Create Account</Text>
                                    <Ionicons name="arrow-forward" size={18} color="#fff" />
                                </TouchableOpacity>

                                {/* Divider */}
                                <View style={styles.dividerRow}>
                                    <View style={styles.dividerLine} />
                                    <Text style={styles.dividerText}>or</Text>
                                    <View style={styles.dividerLine} />
                                </View>

                                {/* Google Button */}
                                <TouchableOpacity style={styles.googleBtn}>
                                    <FontAwesome name="google" size={18} color="#DB4437" />
                                    <Text style={styles.googleBtnText}>Continue with Google</Text>
                                </TouchableOpacity>
                            </View>
                        )}
                    </Animated.View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    bgCircle1: {
        position: 'absolute',
        width: 280,
        height: 280,
        borderRadius: 140,
        backgroundColor: '#FFD6E7',
        opacity: 0.5,
        top: -80,
        right: -80,
    },
    bgCircle2: {
        position: 'absolute',
        width: 200,
        height: 200,
        borderRadius: 100,
        backgroundColor: '#C8E6C9',
        opacity: 0.3,
        bottom: 100,
        left: -60,
    },
    bgCircle3: {
        position: 'absolute',
        width: 150,
        height: 150,
        borderRadius: 75,
        backgroundColor: '#FFD6E7',
        opacity: 0.2,
        bottom: -40,
        right: -30,
    },
    scrollContent: {
        flexGrow: 1,
        paddingHorizontal: SPACING.md,
        paddingBottom: SPACING.xl,
    },
    logoSection: {
        alignItems: 'center',
        paddingTop: 60,
        paddingBottom: SPACING.lg,
    },
   
    logoCircle: {
        width: 90,
        height: 90,
        borderRadius: 45,
        backgroundColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: SPACING.sm,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.15,
        shadowRadius: 16,
        elevation: 10,
    },
    logoImage: {
        width: 90,
        height: 90,
        borderRadius: 45,
    },
    appName: {
        fontSize: 26,
        fontWeight: '800',
        color: COLORS.primaryText,
        letterSpacing: 0.5,
    },
    appTagline: {
        fontSize: 13,
        color: COLORS.bodyText,
        opacity: 0.6,
        marginTop: 4,
    },
    card: {
        backgroundColor: COLORS.cardBg,
        borderRadius: RADIUS.xxl,
        padding: SPACING.lg,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.12,
        shadowRadius: 20,
        elevation: 10,
    },
    tabContainer: {
        flexDirection: 'row',
        backgroundColor: COLORS.background,
        borderRadius: RADIUS.full,
        padding: 4,
        marginBottom: SPACING.lg,
        position: 'relative',
    },
    tabIndicator: {
        position: 'absolute',
        top: 4,
        width: '46%',
        height: '100%',
        backgroundColor: COLORS.buttonBg,
        borderRadius: RADIUS.full,
        zIndex: 0,
    },
    tabBtn: {
        flex: 1,
        paddingVertical: 10,
        alignItems: 'center',
        zIndex: 1,
    },
    tabText: {
        fontSize: 14,
        fontWeight: '600',
        color: COLORS.bodyText,
    },
    tabTextActive: {
        color: '#fff',
    },
    form: {
        gap: 4,
    },
    formTitle: {
        fontSize: 22,
        fontWeight: '800',
        color: COLORS.primaryText,
        marginBottom: 4,
    },
    formSubtitle: {
        fontSize: 13,
        color: COLORS.bodyText,
        opacity: 0.6,
        marginBottom: SPACING.md,
    },
    inputGroup: {
        marginBottom: SPACING.sm,
    },
    inputLabel: {
        fontSize: 13,
        fontWeight: '600',
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
    inputIcon: {
        marginRight: 8,
    },
    inputIconRight: {
        marginLeft: 8,
        padding: 4,
    },
    input: {
        flex: 1,
        paddingVertical: 13,
        fontSize: 14,
        color: COLORS.bodyText,
    },
    rememberRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: SPACING.sm,
        gap: 8,
    },
    rememberText: {
        fontSize: 14,
        color: COLORS.bodyText,
        fontWeight: '500',
    },
    mainBtn: {
        backgroundColor: COLORS.buttonBg,
        borderRadius: RADIUS.md,
        paddingVertical: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        marginTop: SPACING.sm,
        shadowColor: COLORS.buttonBg,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 6,
    },
    mainBtnText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '700',
        letterSpacing: 0.5,
    },
    dividerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: SPACING.md,
        gap: SPACING.sm,
    },
    dividerLine: {
        flex: 1,
        height: 1,
        backgroundColor: COLORS.divider,
    },
    dividerText: {
        fontSize: 13,
        color: COLORS.bodyText,
        opacity: 0.5,
    },
    googleBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
        borderWidth: 1.5,
        borderColor: COLORS.border,
        borderRadius: RADIUS.md,
        paddingVertical: 13,
        backgroundColor: '#fff',
    },
    googleBtnText: {
        fontSize: 14,
        fontWeight: '600',
        color: COLORS.bodyText,
    },
    
});