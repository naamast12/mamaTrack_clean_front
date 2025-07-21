//Login

import React, { useState, useEffect } from 'react';
import { Text, View, TextInput, Image, Pressable, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter, useRootNavigationState } from 'expo-router';
import { Spacing } from '@/constants/Sizes';
import { authStyles } from '../../styles/authStyles';
import { dashboardStyles } from '../../styles/dashboardStyles'; // רק אם באמת צריךimport axios from "axios";
import ProtectedRoute from '../../components/ProtectedRoute';
import Cookies from 'js-cookie';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '@/constants/Colors';
import axios from "axios";
import sharedStyles from '../../styles/sharedStyles';
import storage from '../utils/storage';

const Login = () => {
    const [mail, setMail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [hovered, setHovered] = useState(false);
    const [errors, setErrors] = useState({ mail: '', password: '', form: '' });

    const router = useRouter();
    const navigationState = useRootNavigationState();

    useEffect(() => {
        if (!navigationState?.key) return;
        const userToken = Cookies.get('userToken');
        if (userToken) {
            router.replace('/(tabs)/Dashboard');
        }
    }, [navigationState?.key, router]);

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const moveToRegistration = () => {
        router.push('/authentication/Register');
    };

    const handleLogin = async () => {
        setErrors({ ...errors, form: '' });

        if (!mail || !password) {
            setErrors({ ...errors, form: 'אנא מלא אימייל וסיסמה' });
            return;
        }

        try {
            const loginData = { mail, password };
            const response = await axios.post('http://localhost:3030/api/login', loginData);

            if (response.data.success) {
                // Get userId from response
                const userId = response.data.user && response.data.user.id;
                console.log(userId);

                if (userId) {
                    await storage.set('userId', userId);
                    const testId = await storage.get('userId');
                    console.log('userId after saving to AsyncStorage:', testId);


                } else {
                    // TODO: Backend must return userId in response.data.user.id
                    console.warn('userId not found in login response. Please update backend to return userId.');
                }
                alert("ההתחברות הצליחה!");
                Cookies.set('userToken', response.data.token, { expires: 7 });
                await storage.set('userToken', response.data.token); // ← חשוב!
                setMail('');
                setPassword('');
                router.replace('/');
            } else {
                setErrors({ ...errors, form: response.data.message || 'תקלה לא ידועה' });
            }
        } catch (error) {
            if (error.response && error.response.data) {
                setErrors({ ...errors, form: error.response.data.message });
            } else {
                setErrors({ ...errors, form: 'שגיאה כללית בשרת' });
            }
        }
    };

    const validateField = (fieldName, value) => {
        let valid = true;
        let newErrors = { ...errors };

        switch (fieldName) {
            case 'mail':
                if (!value || !value.includes('@')) {
                    newErrors.mail = 'כתובת המייל לא תקינה';
                    valid = false;
                } else {
                    newErrors.mail = '';
                }
                break;
            case 'password':
                if (!value || value.length < 6) {
                    newErrors.password = 'הסיסמה חייבת להיות לפחות 6 תווים';
                    valid = false;
                } else {
                    newErrors.password = '';
                }
                break;
            default:
                break;
        }

        setErrors(newErrors);
        return valid;
    };

    return (
        <ProtectedRoute requireAuth={false}>
            <ScrollView contentContainerStyle={authStyles.container}>
                <View style={{ marginBottom: 40, marginTop:30 }}>
                    <LinearGradient
                        colors={[Colors.primary, Colors.accent]}
                        start={{ x: 1, y: 0 }}
                        end={{ x: 0, y: 0 }}
                        style={dashboardStyles.gradientTitleWrapper}
                    >
                        <Text style={dashboardStyles.gradientTitle}> MamaTrack!</Text>
                    </LinearGradient>
                </View>

                <View style={authStyles.cardContainer}>

                    <Text style={sharedStyles.bigBoldText}>כניסה לאזור אישי:</Text>

                    {errors.form ? (
                        <Text style={sharedStyles.errorText}>{errors.form}</Text>
                    ) : null}

                    <TextInput
                        style={sharedStyles.loginInput}
                        placeholder="אימייל"
                        value={mail}
                        onChangeText={(text) => {
                            setMail(text);
                            validateField('mail', text);
                        }}
                    />
                    {errors.mail ? <Text style={sharedStyles.errorText}>{errors.mail}</Text> : null}
                    <View style={authStyles.passwordWrapper}>
                        <TextInput
                            style={authStyles.passwordInput}
                            placeholder="סיסמה"
                            value={password}
                            onChangeText={(text) => {
                                setPassword(text);
                                validateField('password', text);
                            }}
                            secureTextEntry={!showPassword}
                        />
                        <Pressable onPress={toggleShowPassword} style={authStyles.emojiButton}>
                            <Text style={authStyles.emojiText}>
                                {showPassword ? '🙉' : '🙈'}
                            </Text>
                        </Pressable>
                    </View>



                    {errors.password ? <Text style={sharedStyles.errorText}>{errors.password}</Text> : null}

                    <TouchableOpacity style={sharedStyles.primaryButton} onPress={handleLogin}>
                        <Text style={sharedStyles.primaryButtonText}>התחבר</Text>
                    </TouchableOpacity>

                    <View style={{ flexDirection: 'row', marginTop: Spacing.lg, justifyContent: 'center' }}>
                        <View style={{ marginTop: Spacing.lg, alignItems: 'center' }}>
                            <Text style={sharedStyles.text}>לא רשומים עדיין לאתר?</Text>
                            <Pressable onPress={moveToRegistration}>
                                <Text style={[sharedStyles.linkText, { marginTop: 4 }]}>הרשמו!</Text>
                            </Pressable>
                        </View>

                    </View>
                </View>
            </ScrollView>
        </ProtectedRoute>
    );
};

export default Login;