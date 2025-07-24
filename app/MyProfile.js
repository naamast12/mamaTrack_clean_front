

import React, { useState, useEffect } from 'react';
import { View, Text, Pressable, ScrollView, Platform } from 'react-native';
import { FontAwesome, Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import DateTimePicker from '@react-native-community/datetimepicker';
import DatePicker from 'react-datepicker'; // לשימוש רק בווב
import 'react-datepicker/dist/react-datepicker.css';

import { useRouter } from 'expo-router';
import ProtectedRoute from '@/components/ProtectedRoute';
import { HomeButton } from './utils/HomeButton';

import { myProfileStyles } from '../styles/myProfileStyles';
import sharedStyles from '../styles/sharedStyles';
import { dashboardStyles } from '../styles/dashboardStyles';
import { Colors } from '../constants/Colors';

import api from '../src/api/axiosConfig';

export default function MyProfile() {
    const router = useRouter();

    const [isLoading, setIsLoading] = useState(true);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [lastPeriodDate, setLastPeriodDate] = useState(null);
    const [dueDate, setDueDate] = useState(null);
    const [pregnancyWeek, setPregnancyWeek] = useState(null);

    const [isEditingPeriod, setIsEditingPeriod] = useState(false);
    const [editedPeriodDate, setEditedPeriodDate] = useState(null);
    const [showDatePicker, setShowDatePicker] = useState(false);


    useEffect(() => {
        fetchUserFromServer();
    }, []);

    async function fetchUserFromServer() {
        try {
            const res = await api.get('/api/user');
            if (res.data && res.data.success) {
                setName(`${res.data.firstName} ${res.data.lastName}`);
                setEmail(res.data.mail);
                setLastPeriodDate(res.data.lastPeriodDate);
                setDueDate(res.data.estimatedDueDate);
                setPregnancyWeek(res.data.pregnancyWeek);
            }
        } catch (err) {
            console.log('שגיאה בקבלת נתוני משתמש:', err);
        } finally {
            setIsLoading(false);
        }
    }

    async function saveChanges() {
        if (!editedPeriodDate) return;

        try {
            const iso = editedPeriodDate.toISOString().split('T')[0];
            const res = await api.put('/api/user/preferences', {
                lastPeriodDate: iso,
            });

            if (res.data && res.data.success) {
                setLastPeriodDate(iso);
                setIsEditingPeriod(false);
                await fetchUserFromServer();
                alert('השינויים נשמרו בהצלחה!');
            }
        } catch (err) {
            console.log('שגיאה בעדכון תאריך וסת:', err);
            alert('אירעה שגיאה בשמירת השינויים, נסי שוב מאוחר יותר.');
        }
    }

    function formatDate(date) {
        if (!date) return '';
        if (typeof date === 'string') return date;
        return date.toISOString().split('T')[0];
    }
    return (
        <ProtectedRoute requireAuth={true}>
            <View style={{ flex: 1, backgroundColor: '#f2f2f2' }}>

            <ScrollView contentContainerStyle={myProfileStyles.scrollContainer}>

                <HomeButton />


                <View style={{ flexDirection: "row-reverse", justifyContent: 'center', width: '100%' }}>
                    <View style={myProfileStyles.profileContainer}>
                        <LinearGradient
                            colors={[Colors.primary, Colors.accent]}
                            start={{ x: 1, y: 0 }}
                            end={{ x: 0, y: 0 }}
                            style={dashboardStyles.gradientTitleWrapper}
                        >
                            <Text style={dashboardStyles.gradientTitle}>פרופיל אישי</Text>
                        </LinearGradient>
                    <View style={myProfileStyles.avatarWrapper}>
                        <FontAwesome name="user" size={100} color= {Colors.primary} />
                    </View>
                    {isLoading ? (
                        <Text style={myProfileStyles.loadingText}>טוען נתוני משתמש...</Text>
                    ) : (
                        <>
                            <Text style={myProfileStyles.name}>{name}</Text>

                            <View style={myProfileStyles.profileLabels}>
                                <Text style={sharedStyles.text}>אימייל:     </Text>
                                <FontAwesome name="envelope" size={22} color={Colors.primary} style={{}} />
                                <Text style={sharedStyles.text}>{email}</Text>
                            </View>

                            <View style={{ flexDirection: 'row-reverse', alignItems: 'center', marginTop: 10 }}>
                                <Text style={sharedStyles.text}>תאריך וסת אחרון: </Text>

                                {isEditingPeriod ? (
                                    Platform.OS === 'web' ? (
                                        <View style={{ zIndex: 9999, position: 'relative' }}>
                                            <DatePicker
                                                selected={editedPeriodDate}
                                                onChange={(date) => setEditedPeriodDate(date)}
                                                dateFormat="yyyy-MM-dd"
                                                maxDate={new Date()}
                                                portalId="root-portal"
                                                popperPlacement="bottom"
                                                popperClassName="datepicker-popper"
                                                onBlur={() => setIsEditingPeriod(false)} // סוגר אם יוצאים
                                                customInput={
                                                    <input
                                                        autoFocus
                                                        style={{
                                                            width: 110,
                                                            textAlign: 'center',
                                                            fontSize: 16,
                                                            padding: 8,
                                                            border: 'none',
                                                            borderRadius: 10,
                                                            backgroundColor: '#f2f2f2',
                                                            cursor: 'pointer',
                                                        }}
                                                    />
                                                }
                                            />
                                        </View>
                                    ) : (
                                        <>
                                            <Pressable onPress={() => setShowDatePicker(true)}>
                                                <Text
                                                    style={{
                                                        backgroundColor: '#f2f2f2',
                                                        padding: 8,
                                                        borderRadius: 10,
                                                        textAlign: 'center',
                                                        width: 110,
                                                        fontSize: 16,
                                                        color: '#000',
                                                    }}
                                                >
                                                    {editedPeriodDate
                                                        ? new Date(editedPeriodDate).toLocaleDateString('he-IL', {
                                                            year: 'numeric',
                                                            month: '2-digit',
                                                            day: '2-digit',
                                                        })
                                                        : 'בחרי תאריך'}
                                                </Text>
                                            </Pressable>

                                            {showDatePicker && (
                                                <DateTimePicker
                                                    value={editedPeriodDate || new Date()}
                                                    mode="date"
                                                    display="default"
                                                    maximumDate={new Date()}
                                                    onChange={(event, selectedDate) => {
                                                        setShowDatePicker(false);
                                                        setIsEditingPeriod(false);
                                                        if (selectedDate) {
                                                            setEditedPeriodDate(selectedDate);
                                                        }
                                                    }}
                                                />
                                            )}
                                        </>
                                    )
                                ) : (
                                    <>
                                        <Text style={sharedStyles.text}>
                                            {formatDate(editedPeriodDate || lastPeriodDate)}
                                        </Text>
                                        <Pressable
                                            onPress={() => {
                                                setEditedPeriodDate(lastPeriodDate ? new Date(lastPeriodDate) : new Date());
                                                setIsEditingPeriod(true);
                                            }}
                                        >
                                            <Feather name="edit" size={20} color={Colors.primary} style={{ marginRight: 10 }} />
                                        </Pressable>
                                    </>
                                )}
                            </View>

                            {dueDate && (
                                <Text style={sharedStyles.text}>
                                    תאריך לידה משוער: {dueDate}
                                </Text>
                            )}
                            {pregnancyWeek !== null && (
                                <Text style={sharedStyles.text}>
                                    שבוע הריון נוכחי: {pregnancyWeek}
                                </Text>
                            )}
                        </>
                    )}
                    <View>
                        <Pressable onPress={() => { alert("מצטערים, כרגע אנחנו תומכים רק בעברית....") }}>
                            <View style={{ flexDirection: "row-reverse" }} >
                                <Text style={myProfileStyles.languageLabel}>שפת ממשק:</Text>
                                <FontAwesome name="language" size={25} color={Colors.primary} style={{ paddingRight: 10 }} />
                                <Text style={myProfileStyles.input} > עברית </Text>
                            </View>
                        </Pressable>

                        <LinearGradient
                            colors={[Colors.primary, Colors.accent]}
                            style={myProfileStyles.saveButtonGradient}
                        >
                            <Pressable onPress={saveChanges}>
                                <Text style={sharedStyles.buttonText}>שמור שינויים</Text>
                            </Pressable>
                        </LinearGradient>

                    </View>
                </View>

                    <View>

                    </View>
                </View>
            </ScrollView>
            </View>

        </ProtectedRoute>
    );
}