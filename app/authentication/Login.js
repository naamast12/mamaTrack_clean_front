//Login

// ✅ Login.js (מעודכן)
import React, { useState, useEffect } from 'react';
import { Text, View, TextInput, Image, Pressable, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter, useRootNavigationState } from 'expo-router';
import { Spacing } from '@/constants/Sizes';
import { authStyles } from '../../styles/authStyles';
import { dashboardStyles } from '../../styles/dashboardStyles';
import ProtectedRoute from '../../components/ProtectedRoute';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '@/constants/Colors';
import axios from "axios";
import sharedStyles from '../../styles/sharedStyles';
import storage from '../utils/storage';

const Login = () => {
    const [mail, setMail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({ mail: '', password: '', form: '' });

    const router = useRouter();
    const navigationState = useRootNavigationState();

    useEffect(() => {
        if (!navigationState?.key) return;
    }, [navigationState?.key]);

    const toggleShowPassword = () => setShowPassword(!showPassword);

    const moveToRegistration = () => router.push('/authentication/Register');

    const handleLogin = async () => {
        setErrors({ ...errors, form: '' });
        if (!mail || !password) {
            setErrors({ ...errors, form: 'אנא מלא אימייל וסיסמה' });
            return;
        }

        try {
            const loginData = { mail, password };
            const response = await axios.post('http://localhost:3030/api/login', loginData, {
                withCredentials: true,
            });

            if (response.data.success) {
                console.log('Login response:', response.data);
                
                // Save token and user data
                if (response.data.token) {
                    console.log('About to save token:', response.data.token);
                    await storage.set('userToken', response.data.token);
                    const savedToken = await storage.get('userToken');
                    console.log('Token saved and retrieved:', savedToken);
                    
                    // Extract userId from JWT token
                    try {
                        const tokenParts = response.data.token.split('.');
                        if (tokenParts.length === 3) {
                            const payload = JSON.parse(atob(tokenParts[1]));
                            console.log('JWT payload:', payload);
                            
                            if (payload.sub) {
                                await storage.set('userId', payload.sub);
                                console.log('User ID extracted from JWT:', payload.sub);
                            }
                        }
                    } catch (error) {
                        console.error('Error parsing JWT:', error);
                    }
                } else {
                    console.log('No token in response');
                }
                if (response.data.user?.id) {
                    await storage.set('userId', response.data.user.id.toString());
                    console.log('User ID saved:', response.data.user.id);
                } else {
                    console.log('No user ID in response:', response.data);
                }
                
                alert("ההתחברות הצליחה!");
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
                newErrors.mail = !value || !value.includes('@') ? 'כתובת המייל לא תקינה' : '';
                valid = !newErrors.mail;
                break;
            case 'password':
                newErrors.password = !value || value.length < 6 ? 'הסיסמה חייבת להיות לפחות 6 תווים' : '';
                valid = !newErrors.password;
                break;
        }
        setErrors(newErrors);
        return valid;
    };

    return (
        <ProtectedRoute requireAuth={false}>
            <ScrollView contentContainerStyle={authStyles.container}>
                {/*<View style={{ marginBottom: 40, marginTop: 30 }}>*/}
                {/*    <LinearGradient colors={[Colors.primary, Colors.accent]} start={{ x: 1, y: 0 }} end={{ x: 0, y: 0 }} style={dashboardStyles.gradientTitleWrapper}>*/}
                {/*        <Text style={dashboardStyles.gradientTitle}> MamaTrack!</Text>*/}
                {/*    </LinearGradient>*/}
                {/*</View>*/}
                <View style={authStyles.cardContainer}>
                    <LinearGradient
                        colors={[Colors.primary, Colors.accent]}
                        start={{ x: 1, y: 0 }}
                        end={{ x: 0, y: 0 }}
                        style={dashboardStyles.gradientTitleWrapper}
                    >
                        <Text style={dashboardStyles.gradientTitle}>כניסה לאזור אישי:</Text>
                    </LinearGradient>
                    {/*<Text style={sharedStyles.bigBoldText}>כניסה לאזור אישי:</Text>*/}
                    {errors.form ? <Text style={sharedStyles.errorText}>{errors.form}</Text> : null}
                    <TextInput style={sharedStyles.loginInput} placeholder="אימייל" value={mail} onChangeText={(text) => { setMail(text); validateField('mail', text); }} />
                    {errors.mail ? <Text style={sharedStyles.errorText}>{errors.mail}</Text> : null}
                    <View style={authStyles.passwordWrapper}>
                        <TextInput style={authStyles.passwordInput} placeholder="סיסמה" value={password} onChangeText={(text) => { setPassword(text); validateField('password', text); }} secureTextEntry={!showPassword} />
                        <Pressable onPress={toggleShowPassword} style={authStyles.emojiButton}>
                            <Text style={authStyles.emojiText}>{showPassword ? '🙉' : '🙈'}</Text>
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

// ✅ אותו שינוי תעשי גם ב־Register.js:
// axios.post('http://localhost:3030/api/register', userData, { withCredentials: true });
