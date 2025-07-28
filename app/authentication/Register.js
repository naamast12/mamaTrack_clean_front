// Register.js

import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, ScrollView, Alert, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { authStyles } from '../../styles/authStyles';
import { dashboardStyles } from '../../styles/dashboardStyles'; // רק אם באמת צריךimport { Spacing } from "../../constants/Sizes";
// import axios from "axios";
import ProtectedRoute from '../../components/ProtectedRoute';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '../../constants/Colors';
// import DatePicker from "react-datepicker";
import DateTimePicker from '@react-native-community/datetimepicker';
import { Spacing } from '../../constants/Sizes';
import sharedStyles from '../../styles/sharedStyles';
import { Platform } from 'react-native';
import DatePicker from 'react-datepicker'; // רק לווב
import 'react-datepicker/dist/react-datepicker.css';
import api from '../../src/api/axiosConfig';

export const Register = () => {
    const router = useRouter();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [mail, setMail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    // const [lastPeriodDate, setLastPeriodDate] = useState('');
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [errors, setErrors] = useState({
        firstName: '',
        lastName: '',
        mail: '',
        password: '',
        confirmPassword: ''
    });
    const [lastPeriodDate, setLastPeriodDate] = useState(() => {
        const today = new Date();
        today.setDate(today.getDate() - 28); // ברירת מחדל: לפני 28 יום
        return today.toISOString().split('T')[0]; // מחזיר: "2025-05-23" לדוגמה
    });


    const validateField = (fieldName, value) => {
        let valid = true;
        let newErrors = { ...errors };

        switch (fieldName) {
            case 'firstName':
                newErrors.firstName = value ? '' : 'אנא מלא את השם הפרטי';
                valid = !!value;
                break;
            case 'lastName':
                newErrors.lastName = value ? '' : 'אנא מלא את שם המשפחה';
                valid = !!value;
                break;
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
            case 'confirmPassword':
                if (!value || value !== password) {
                    newErrors.confirmPassword = 'הסיסמאות אינן תואמות';
                    valid = false;
                } else {
                    newErrors.confirmPassword = 'אימות סיסמה תקין ✅';
                }
                break;
        }

        setErrors(newErrors);
        return valid;
    };

    const handleFieldChange = (fieldName, newValue) => {
        switch (fieldName) {
            case 'firstName':
                setFirstName(newValue);
                break;
            case 'lastName':
                setLastName(newValue);
                break;
            case 'mail':
                setMail(newValue);
                break;
            case 'password':
                setPassword(newValue);
                break;
            case 'confirmPassword':
                setConfirmPassword(newValue);
                break;
        }
        validateField(fieldName, newValue);
    };

    const validateAllFields = () => {
        return (
            validateField('firstName', firstName) &&
            validateField('lastName', lastName) &&
            validateField('mail', mail) &&
            validateField('password', password) &&
            validateField('confirmPassword', confirmPassword)
        );
    };

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleRegistration = async () => {
        if (!validateAllFields()) return;

        try {
            const userData = { firstName, lastName, mail, password ,lastPeriodDate};
            const response = await api.post('/api/register', userData);

            if (response.data.success) {
                alert( "ההרשמה הצליחה!");
                // איפוס
                setFirstName('');
                setLastName('');
                setMail('');
                setPassword('');
                setConfirmPassword('');
                router.push('/authentication/Login');
            } else {
                Alert.alert("שגיאה", response.data.message || "ההרשמה נכשלה, נסה שוב");
            }
        } catch (error) {
            if (error.response) {
                //  טיפול מיוחד ל-500 - המייל כבר קיים
                if (error.response.status === 500) {
                    alert("למייל הזה כבר יש משתמש! ", error.response.data.message);
                } else if (error.response.data?.message) {
                    alert("שגיאה בהרשמה שלך", error.response.data.message);
                } else {
                    alert("שגיאה", "ההרשמה נכשלה. נסה שוב מאוחר יותר.");
                }
            } else {
                alert("שגיאה", "ההרשמה נכשלה. נסה שוב מאוחר יותר.");
            }
            console.error('Error during registration:', error.response?.data || error.message);
        }
    };


    const moveToLoginPage = () => {
        router.push('/authentication/Login');
    };

    return (
        <ProtectedRoute requireAuth={false}>
            <ScrollView contentContainerStyle={authStyles.container}>

                <View style={authStyles.cardContainer}>
                    <Text style={sharedStyles.bigBoldText}>הרשמה:</Text>

                    <TextInput
                        style={sharedStyles.loginInput}
                        placeholder="שם פרטי"
                        value={firstName}
                        onChangeText={(text) => handleFieldChange('firstName', text)}
                    />
                    {errors.firstName ? <Text style={sharedStyles.errorText}>{errors.firstName}</Text> : null}

                    <TextInput
                        style={sharedStyles.loginInput}
                        placeholder="שם משפחה"
                        value={lastName}
                        onChangeText={(text) => handleFieldChange('lastName', text)}
                    />
                    {errors.lastName ? <Text style={sharedStyles.errorText}>{errors.lastName}</Text> : null}


                    <View style={{ marginBottom: 12 }}>
                        <View style={{
                            width: '100%',
                            padding: 10,
                            borderWidth: 1,
                            borderColor: '#d68aa1',
                            borderRadius: 25,
                            backgroundColor: '#fff',
                            flexDirection: 'row-reverse',
                            alignItems: 'center',
                            justifyContent: 'space-between'
                        }}>
                            <Text style={authStyles.label}>תאריך וסת אחרון</Text>

                            {Platform.OS === 'web' ? (
                                <div style={{ zIndex: 9999, position: 'relative' }}>
                                    <DatePicker
                                        selected={lastPeriodDate ? new Date(lastPeriodDate) : null}
                                        onChange={(date) => {
                                            const iso = date.toISOString().split('T')[0];
                                            setLastPeriodDate(iso);
                                        }}
                                        dateFormat="yyyy-MM-dd"
                                        maxDate={new Date()}
                                        popperPlacement="bottom"
                                        portalId="root-portal"
                                        popperClassName="datepicker-popper"
                                        customInput={
                                            <input
                                                style={{
                                                    width: '110px',
                                                    textAlign: 'center',
                                                    fontSize: 16,
                                                    padding: '8px',
                                                    border: 'none',
                                                    borderRadius: 10,
                                                    backgroundColor: '#f2f2f2',
                                                    cursor: 'pointer'
                                                }}
                                            />
                                        }
                                    />
                                </div>
                            ) : (
                                <>
                                    <Pressable onPress={() => setShowDatePicker(true)}>
                                        <Text style={{
                                            width: 110,
                                            textAlign: 'center',
                                            fontSize: 16,
                                            padding: 8,
                                            borderRadius: 10,
                                            backgroundColor: '#f2f2f2',
                                            color: '#000'
                                        }}>
                                            {lastPeriodDate
                                                ? new Date(lastPeriodDate).toLocaleDateString('he-IL', {
                                                    year: 'numeric',
                                                    month: '2-digit',
                                                    day: '2-digit'
                                                })
                                                : 'בחרי תאריך'}
                                        </Text>
                                    </Pressable>

                                    {showDatePicker && (
                                        <DateTimePicker
                                            value={lastPeriodDate ? new Date(lastPeriodDate) : new Date()}
                                            mode="date"
                                            display="default"
                                            maximumDate={new Date()}
                                            onChange={(event, selectedDate) => {
                                                setShowDatePicker(false);
                                                if (selectedDate) {
                                                    const iso = selectedDate.toISOString().split('T')[0];
                                                    setLastPeriodDate(iso);
                                                }
                                            }}
                                        />
                                    )}
                                </>
                            )}
                        </View>
                    </View>

                    <TextInput
                        style={sharedStyles.loginInput}
                        placeholder="אימייל"
                        value={mail}
                        onChangeText={(text) => handleFieldChange('mail', text)}
                        keyboardType="email-address"
                    />
                    {errors.mail ? <Text style={sharedStyles.errorText}>{errors.mail}</Text> : null}

                    <View style={authStyles.passwordWrapper}>
                        <TextInput
                            style={authStyles.passwordInput}
                            placeholder="סיסמה"
                            value={password}
                            onChangeText={(text) => handleFieldChange('password', text)}
                            secureTextEntry={!showPassword}
                        />
                        <Pressable onPress={toggleShowPassword} style={authStyles.emojiButton}>
                            <Text style={authStyles.emojiText}>
                                {showPassword ? '🙉' : '🙈'}
                            </Text>
                        </Pressable>
                    </View>
                    {errors.password ? <Text style={sharedStyles.errorText}>{errors.password}</Text> : null}

                    <TextInput
                        style={sharedStyles.loginInput}
                        placeholder="אימות סיסמה"
                        value={confirmPassword}
                        onChangeText={(text) => handleFieldChange('confirmPassword', text)}
                        secureTextEntry={!showPassword}
                    />
                    {errors.confirmPassword ? (
                        <Text style={[sharedStyles.errorText, errors.confirmPassword.includes('✅') && sharedStyles.successText]}>
                            {errors.confirmPassword}
                        </Text>
                    ) : null}

                    <TouchableOpacity style={sharedStyles.primaryButton} onPress={handleRegistration}>
                        <Text style={sharedStyles.primaryButtonText}>הרשם</Text>
                    </TouchableOpacity>

                    <View style={{ marginTop: Spacing.lg, alignItems: 'center' }}>
                        <Text style={authStyles.text}>כבר יש לך חשבון אצלנו?</Text>
                        <Pressable onPress={moveToLoginPage}>
                            <Text style={[sharedStyles.linkText, { marginTop: 4 }]}>התחבר</Text>
                        </Pressable>
                    </View>
                </View>
            </ScrollView>
        </ProtectedRoute>
    );
};

export default Register;