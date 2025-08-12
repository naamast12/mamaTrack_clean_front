

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
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

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

            <HomeButton />

            <ScrollView contentContainerStyle={myProfileStyles.scrollContainer}>

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
                        <MaterialCommunityIcons name="human-pregnant" size={100} color={Colors.primary} />
                    </View>
                    {isLoading ? (
                        <Text style={myProfileStyles.loadingText}>טוען נתוני משתמש...</Text>
                    ) : (
                        <>
                            <View style={myProfileStyles.profileLabels}>
                                <FontAwesome name="user" size={22} color={Colors.primary} style={{ marginLeft: 5 }} />
                                <Text style={sharedStyles.text}>  שם:  {name}</Text>
                            </View>
                            <View style={myProfileStyles.profileLabels}>
                                <FontAwesome name="envelope" size={22} color={Colors.primary} style={{}} />
                                <Text style={sharedStyles.text}>  אימייל:  </Text>
                                <Text style={sharedStyles.text}>{email}</Text>
                            </View>

                            <View style={myProfileStyles.profileLabels}>
                                <FontAwesome name="calendar" size={22} color={Colors.primary} style={{ marginLeft: 5 }} />
                                <Text style={sharedStyles.text}> תאריך וסת אחרון: </Text>

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
                                <View style={myProfileStyles.profileLabels}>
                                    <MaterialCommunityIcons name="baby-face-outline" size={24} color={Colors.primary} style={{ marginLeft: 5 }} />
                                    <Text style={sharedStyles.text}>תאריך לידה משוער: </Text>
                                    <Text style={sharedStyles.text}>{dueDate}</Text>
                                </View>
                            )}
                            {pregnancyWeek !== null && (
                                <View style={myProfileStyles.profileLabels}>
                                    <FontAwesome name="heartbeat" size={22} color={Colors.primary} style={{ marginLeft: 5 }} />
                                    <Text style={sharedStyles.text}>שבוע הריון נוכחי: </Text>
                                    <Text style={sharedStyles.text}>{pregnancyWeek}</Text>
                                </View>
                            )}
                        </>
                    )}
                    <View>
                        <Pressable onPress={() => { alert("מצטערים, כרגע אנחנו תומכים רק בעברית....") }}>
                            <View style={myProfileStyles.profileLabels}>
                                <FontAwesome name="language" size={25} color={Colors.primary} style={{ marginLeft: 5 }} />
                                <Text style={sharedStyles.text}>שפת ממשק:</Text>
                                <Text style={sharedStyles.text} > עברית </Text>
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

        </ProtectedRoute>
    );
}