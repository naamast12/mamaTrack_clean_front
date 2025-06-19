//MyProfile

import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Pressable, Switch, ScrollView, StyleSheet, Image } from 'react-native';
import { useRouter } from 'expo-router';
import axios from 'axios';
import ProtectedRoute from '@/components/ProtectedRoute';
import { FontAwesome, Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import {myProfileStyles} from '../../styles/myProfileStyles';
import { HomeButton } from '../utils/HomeButton';
import { Colors } from '../../constants/Colors';
axios.defaults.withCredentials = true;
axios.defaults.baseURL = 'http://localhost:3030';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import sharedStyles from '../../styles/sharedStyles';



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



    useEffect(() => {
        fetchUserFromServer();
    }, []);

    async function fetchUserFromServer() {
        try {
            const res = await axios.get('/api/user');
            if (res.data && res.data.success) {
                setName(`${res.data.firstName} ${res.data.lastName}`);
                setEmail(res.data.mail);
                setLastPeriodDate(res.data.lastPeriodDate);
                setDueDate(res.data.estimatedDueDate);
                setPregnancyWeek(res.data.pregnancyWeek); // ⬅️ חדש
            }
        } catch (err) {
            console.log('Error fetching user info:', err);
        } finally {
            setIsLoading(false);
        }
    }

    async function saveChanges() {
        if (!editedPeriodDate) return;

        try {
            const iso = editedPeriodDate.toISOString().split('T')[0];
            const res = await axios.put('/api/user/preferences', {
                lastPeriodDate: iso,
            });

            if (res.data && res.data.success) {
                setLastPeriodDate(iso);
                setIsEditingPeriod(false);
                await fetchUserFromServer();

                // ✅ התראה על הצלחה
                alert('השינויים נשמרו בהצלחה!');
            }
        } catch (err) {
            console.log('שגיאה בעדכון תאריך וסת:', err);
            alert('אירעה שגיאה בשמירת השינויים, נסי שוב מאוחר יותר.');
        }
    }

    function formatDate(date) {
        if (!date) return '';
        if (typeof date === 'string') return date; // אם זה כבר בפורמט ISO

        return date.toISOString().split('T')[0]; // אם זה אובייקט Date
    }


    return (
        <ProtectedRoute requireAuth={true}>
            <ScrollView contentContainerStyle={myProfileStyles.scrollContainer}>

                <HomeButton />

                <View style={{ flexDirection: "row-reverse", justifyContent: 'center', width: '100%' }}>                    <View style={myProfileStyles.profileContainer}>
                    <Text style={myProfileStyles.profileSectionTitle}>פרופיל אישי </Text>
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
                                    <View style={{ zIndex: 9999, position: 'relative' }}>
                                        <DatePicker
                                            selected={editedPeriodDate}
                                            onChange={(date) => {
                                                setEditedPeriodDate(date);
                                            }}
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
                                                        cursor: 'pointer'
                                                    }}
                                                />
                                            }
                                        />
                                    </View>
                                ) : (
                                    <>
                                        <Text style={sharedStyles.text}>
                                            {formatDate(editedPeriodDate || lastPeriodDate)}
                                        </Text>                                            <Pressable onPress={() => {
                                        setEditedPeriodDate(lastPeriodDate ? new Date(lastPeriodDate) : null);
                                        setIsEditingPeriod(true);
                                    }}>
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
        </ProtectedRoute>
    );
}

//end of MyProfile
