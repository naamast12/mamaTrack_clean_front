

import React, { useState } from 'react';
import {
    Text,
    View,
    TextInput,
    Pressable,
    TouchableOpacity,
    ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import ProtectedRoute from '../../components/ProtectedRoute';
import { Spacing } from '../../constants/Sizes';
import { authStyles } from '../../styles/authStyles';
import { dashboardStyles } from '../../styles/dashboardStyles';
import sharedStyles from '../../styles/sharedStyles';
import storage from '../utils/storage';
import { Colors } from '../../constants/Colors';
import api from '../../src/api/axiosConfig';

export default function Login() {
    const [mail, setMail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({ mail: '', password: '', form: '' });

    const router = useRouter();

    const toggleShowPassword = () => setShowPassword(!showPassword);
    const moveToRegistration = () => router.push('/authentication/Register');

    const validateField = (fieldName, value) => {
        const newErrors = { ...errors };
        switch (fieldName) {
            case 'mail':
                newErrors.mail = !value.includes('@') ? 'כתובת המייל לא תקינה' : '';
                break;
            case 'password':
                newErrors.password = value.length < 6 ? 'הסיסמה חייבת להיות לפחות 6 תווים' : '';
                break;
            default:
                break;
        }
        setErrors(newErrors);
    };

    const handleLogin = async () => {
        setErrors((e) => ({ ...e, form: '' }));

        if (!mail || !password) {
            setErrors((e) => ({ ...e, form: 'אנא מלאי אימייל וסיסמה' }));
            return;
        }

        try {
            const { data } = await api.post('/api/login', { mail, password });
            console.log('login response', data);

            if (data.success && data.token) {
                await storage.set('userToken', data.token);
                await storage.set('userData', data.user);
                alert('התחברות הצליחה!');
                setMail('');
                setPassword('');
                router.replace('/'); // שנה לפי הצורך
            } else {
                setErrors((e) => ({ ...e, form: data.message || 'שגיאה בהתחברות' }));
            }
        } catch (err) {
            console.error('login error', err);
            if (err.response?.data?.message) {
                setErrors((e) => ({ ...e, form: err.response.data.message }));
            } else if (err.response?.status === 404) {
                setErrors((e) => ({ ...e, form: 'אימייל לא קיים במערכת' }));
            } else if (err.response?.status === 401) {
                setErrors((e) => ({ ...e, form: 'סיסמה שגויה' }));
            } else {
                setErrors((e) => ({ ...e, form: 'שגיאה כללית בשרת' }));
            }
        }
    };

    return (
        <ProtectedRoute requireAuth={false}>
            <ScrollView contentContainerStyle={authStyles.container}>

                <View style={authStyles.cardContainer}>
                    <LinearGradient
                        colors={[Colors.pink, Colors.blue]}
                        start={{ x: 1, y: 0 }}
                        end={{ x: 0, y: 0 }}
                        style={dashboardStyles.gradientTitleWrapper}
                    >
                        <Text style={dashboardStyles.gradientTitle}>כניסה לאיזור אישי:</Text>
                    </LinearGradient>
                    {!!errors.form && <Text style={sharedStyles.errorText}>{errors.form}</Text>}

                    <TextInput
                        style={sharedStyles.loginInput}
                        placeholder="אימייל"
                        value={mail}
                        onChangeText={(text) => {
                            setMail(text);
                            validateField('mail', text);
                        }}
                    />
                    {!!errors.mail && <Text style={sharedStyles.errorText}>{errors.mail}</Text>}

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
                            <Text style={authStyles.emojiText}>{showPassword ? '🙉' : '🙈'}</Text>
                        </Pressable>
                    </View>
                    {!!errors.password && <Text style={sharedStyles.errorText}>{errors.password}</Text>}

                    <TouchableOpacity style={sharedStyles.primaryButton} onPress={handleLogin}>
                        <Text style={sharedStyles.primaryButtonText}>התחברי</Text>
                    </TouchableOpacity>

                    <View style={{ flexDirection: 'row', marginTop: Spacing.lg, justifyContent: 'center' }}>
                        <View style={{ marginTop: Spacing.lg, alignItems: 'center' }}>
                            <Text style={sharedStyles.text}>לא רשומה עדיין?</Text>
                            <Pressable onPress={moveToRegistration}>
                                <Text style={[sharedStyles.linkText, { marginTop: 4 }]}>הרשמה</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </ProtectedRoute>
    );
}