// screens/SplashScreen.js

import React, { useEffect, useRef } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Animated,
    Dimensions,
    Image,
} from 'react-native';
import { COLORS } from '../theme';

const { width, height } = Dimensions.get('window');

export default function SplashScreen({ navigation }) {
    const scaleAnim = useRef(new Animated.Value(0)).current;
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const rotateAnim = useRef(new Animated.Value(0)).current;
    const textFadeAnim = useRef(new Animated.Value(0)).current;
    const ringScaleAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        // Ring animation
        Animated.spring(ringScaleAnim, {
            toValue: 1,
            tension: 10,
            friction: 3,
            useNativeDriver: true,
        }).start();

        // Logo scale + fade in
        Animated.parallel([
            Animated.spring(scaleAnim, {
                toValue: 1,
                tension: 50,
                friction: 5,
                useNativeDriver: true,
            }),
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 800,
                useNativeDriver: true,
            }),
            Animated.timing(rotateAnim, {
                toValue: 1,
                duration: 1000,
                useNativeDriver: true,
            }),
        ]).start();

        // Text fade in after logo
        setTimeout(() => {
            Animated.timing(textFadeAnim, {
                toValue: 1,
                duration: 600,
                useNativeDriver: true,
            }).start();
        }, 800);

        // Navigate to Auth after 3 seconds
        setTimeout(() => {
            navigation.replace('Auth');
        }, 3000);
    }, []);

    const rotate = rotateAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
    });

    return (
        <View style={styles.container}>
            {/* Background Circles */}
            <Animated.View
                style={[
                    styles.bgCircle1,
                    {
                        transform: [{ scale: ringScaleAnim }],
                        opacity: fadeAnim,
                    },
                ]}
            />
            <Animated.View
                style={[
                    styles.bgCircle2,
                    {
                        transform: [{ scale: ringScaleAnim }],
                        opacity: fadeAnim,
                    },
                ]}
            />

            {/* Logo Container */}
            <Animated.View
                style={[
                    styles.logoContainer,
                    {
                        transform: [{ scale: scaleAnim }],
                        opacity: fadeAnim,
                    },
                ]}
            >
                {/* Outer Ring */}
                <Animated.View
                    style={[
                        styles.outerRing,
                        { transform: [{ rotate }] },
                    ]}
                >
                    {[...Array(8)].map((_, i) => (
                        <View
                            key={i}
                            style={[
                                styles.ringDot,
                                {
                                    transform: [
                                        { rotate: `${i * 45}deg` },
                                        { translateY: -52 },
                                    ],
                                },
                            ]}
                        />
                    ))}
                </Animated.View>

                {/* Glowing Ring */}
                <Animated.View
                    style={[
                        styles.glowRingOuter,
                        { transform: [{ rotate }] },
                    ]}
                />
                <View style={styles.glowRingInner} />

                {/* Planet Circle */}
                {/* Logo Image */}
                <View style={styles.planetCircle}>
                    <Image
                        source={require('../assets/splash-icon.png')}
                        style={styles.logoImage}
                        resizeMode="contain"
                    />
                </View>
            </Animated.View>

            {/* App Name */}
            <Animated.View style={{ opacity: textFadeAnim }}>
                <Text style={styles.appName}>Perfect Planets</Text>
                <Text style={styles.tagline}>✨ Cosmic Wellness & Astrology ✨</Text>
            </Animated.View>

            {/* Bottom Dots */}
            <Animated.View style={[styles.dotsContainer, { opacity: textFadeAnim }]}>
                {[0, 1, 2].map((i) => (
                    <View
                        key={i}
                        style={[
                            styles.dot,
                            { opacity: i === 1 ? 1 : 0.4 },
                        ]}
                    />
                ))}
            </Animated.View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
        alignItems: 'center',
        justifyContent: 'center',
    },
    bgCircle1: {
        position: 'absolute',
        width: 300,
        height: 300,
        borderRadius: 150,
        backgroundColor: '#FFD6E7',
        opacity: 0.5,
        top: -50,
        right: -80,
    },
    bgCircle2: {
        position: 'absolute',
        width: 250,
        height: 250,
        borderRadius: 125,
        backgroundColor: '#C8E6C9',
        opacity: 0.3,
        bottom: -40,
        left: -60,
    },
    logoContainer: {
        width: 140,
        height: 140,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 30,
    },
    glowRingOuter: {
    position: 'absolute',
    width: 130,
    height: 130,
    borderRadius: 65,
    borderWidth: 2.5,
    borderColor: 'rgba(255,255,255,0.9)',
    shadowColor: '#FFFFFF',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 20,
    elevation: 20,
},
glowRingInner: {
    position: 'absolute',
    width: 112,
    height: 112,
    borderRadius: 56,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.25)',
},
    planetCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
},
    planetRing: {
        position: 'absolute',
        width: 130,
        height: 30,
        borderRadius: 15,
        borderWidth: 4,
        borderColor: COLORS.accent,
        opacity: 0.7,
        transform: [{ rotateX: '60deg' }],
    },
    planetCore: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    planetEmoji: {
        fontSize: 48,
    },
    appName: {
        fontSize: 32,
        fontWeight: '800',
        color: COLORS.primaryText,
        textAlign: 'center',
        letterSpacing: 1,
        marginBottom: 8,
    },
    tagline: {
        fontSize: 13,
        color: COLORS.bodyText,
        textAlign: 'center',
        opacity: 0.7,
        letterSpacing: 0.5,
    },
    dotsContainer: {
        position: 'absolute',
        bottom: 60,
        flexDirection: 'row',
        gap: 8,
    },
    dot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: COLORS.buttonBg,
    },
    logoImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
},
});