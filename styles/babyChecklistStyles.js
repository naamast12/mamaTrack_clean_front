import { StyleSheet } from 'react-native';
import { Colors } from '../constants/Colors';

const babyChecklistStyles = StyleSheet.create({
  centeredBox: {
    width: '90%',
    maxWidth: 600,
    alignSelf: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: Colors.pink100, // רקע ורוד בהיר כמו בעמוד השאלות הנפוצות
    padding: 16,
  },
  header: {
    backgroundColor: Colors.blueLight, // תכלת בהיר כמו בעמוד השאלות הנפוצות
    padding: 24,
    borderRadius: 20,
    marginBottom: 20,
    shadowColor: Colors.blue,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
    borderWidth: 1,
    borderColor: Colors.blue,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.pink700, // ורוד כהה לכותרת - יותר יפה עם התכלת
    textAlign: 'center',
    marginBottom: 8,
    textShadowColor: Colors.pink700,
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.pink, // ורוד בהיר לכותרת המשנה - יותר יפה עם התכלת
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 22,
  },

  progressContainer: { marginBottom: 20 },
  progressBar: {
    height: 12,
    backgroundColor: Colors.purpleLight,
    borderRadius: 10,
    overflow: 'hidden',
    shadowColor: Colors.purple,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  progressFill: {
    height: '100%',
    backgroundColor: Colors.pink,
    borderRadius: 10,
    shadowColor: Colors.pink,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  progressText: {
    fontSize: 14,
    color: Colors.pink, // ורוד בהיר לטקסט ההתקדמות - יותר יפה עם התכלת
    textAlign: 'center',
    marginTop: 12,
    fontWeight: '600',
  },

  categoryTabsContainer: {
    backgroundColor: Colors.blueLight, // תכלת בהיר כמו בעמוד השאלות הנפוצות
    borderRadius: 20,
    marginBottom: 20,
    shadowColor: Colors.blue,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
    borderWidth: 1,
    borderColor: Colors.blue,
  },

  // categoryTabs: {
  //   flexDirection: 'row',
  //   flexWrap: 'wrap',
  //   padding: 16,
  // },
  categoryTabs: {
    flexDirection: 'row',   // כמו שהיה
    flexWrap: 'wrap',
    justifyContent: 'flex-end', // יישור לשול הימני
    padding: 16,
  },
  categoryTab: {
    paddingHorizontal: 18,
    paddingVertical: 10,
    margin: 4,
    borderRadius: 25,
    backgroundColor: Colors.pinkLight, // ורוד בהיר לכל הקטגוריות
    borderWidth: 2,
    borderColor: Colors.pink, // ורוד למסגרת
    shadowColor: Colors.pinkDeep,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  categoryTabActive: {
    backgroundColor: Colors.blue, // תכלת לטאבים פעילים
    borderColor: Colors.blue,
    shadowColor: Colors.blue,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
  },


  // רקע/מסגרת לפי קטגוריות - כולן ורוד בהיר
  categoryTabAll:       { backgroundColor: Colors.pinkLight, borderColor: Colors.pink },
  categoryTabClothing:  { backgroundColor: Colors.pinkLight, borderColor: Colors.pink },
  categoryTabFeeding:   { backgroundColor: Colors.pinkLight, borderColor: Colors.pink },
  categoryTabSleep:     { backgroundColor: Colors.pinkLight, borderColor: Colors.pink },
  categoryTabHygiene:   { backgroundColor: Colors.pinkLight, borderColor: Colors.pink },
  categoryTabSafety:    { backgroundColor: Colors.pinkLight, borderColor: Colors.pink },
  categoryTabTransport: { backgroundColor: Colors.pinkLight, borderColor: Colors.pink },
  categoryTabToys:      { backgroundColor: Colors.pinkLight, borderColor: Colors.pink },
  categoryTabMedical:   { backgroundColor: Colors.pinkLight, borderColor: Colors.pink },
  categoryTabOther:     { backgroundColor: Colors.pinkLight, borderColor: Colors.pink },

  categoryTabContent: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  categoryTabIcon: {
    fontSize: 22,
    marginLeft: 4,
    marginRight: 4,
  },
  categoryTabText: {
    fontSize: 14,
    color: Colors.pink700, // ורוד כהה לטקסט הקטגוריות - יותר יפה עם התכלת
    fontWeight: '600',
  },
  categoryTabTextActive: { color: Colors.white, fontWeight: 'bold' },

  // צבעי טקסט לקטגוריות - כולן ורוד כהה
  categoryTabTextAll:       { color: Colors.pink700 },
  categoryTabTextClothing:  { color: Colors.pink700 },
  categoryTabTextFeeding:   { color: Colors.pink700 },
  categoryTabTextSleep:     { color: Colors.pink700 },
  categoryTabTextHygiene:   { color: Colors.pink700 },
  categoryTabTextSafety:    { color: Colors.pink700 },
  categoryTabTextTransport: { color: Colors.pink700 },
  categoryTabTextToys:      { color: Colors.pink700 },
  categoryTabTextMedical:   { color: Colors.pink700 },
  categoryTabTextOther:     { color: Colors.pink700 },

  itemsContainer: {
    backgroundColor: Colors.blueLight, // תכלת בהיר כמו בעמוד השאלות הנפוצות
    borderRadius: 20,
    shadowColor: Colors.blue,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
    borderWidth: 1,
    borderColor: Colors.blue,
    overflow: 'hidden',
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 18,
    borderBottomWidth: 1,
    borderBottomColor: Colors.pinkLight,
    backgroundColor: Colors.blueLight, // תכלת בהיר כמו בעמוד השאלות הנפוצות
  },
  itemRowLast: { borderBottomWidth: 0 },
  itemRowChecked: { backgroundColor: Colors.pink100 }, // ורוד בהיר לשורות מסומנות

  checkbox: {
    width: 28,
    height: 28,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: Colors.pinkLight,
    marginRight: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.white,
    shadowColor: Colors.pinkDeep,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  checkboxChecked: {
    backgroundColor: Colors.blue, // תכלת לצ'קבוקס מסומן
    borderColor: Colors.blue,
    shadowColor: Colors.blue,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  checkboxIcon: { color: Colors.white, fontSize: 18, fontWeight: 'bold' },

  itemText: {
    flex: 1,
    fontSize: 16,
    color: Colors.blue, // תכלת לטקסט הפריטים - יותר יפה עם התכלת
    lineHeight: 24,
    fontWeight: '500',
  },
  itemTextChecked: {
    textDecorationLine: 'line-through',
    color: Colors.blue, // תכלת לפריטים מסומנים - יותר יפה עם התכלת
    fontStyle: 'italic',
  },

  categoryHeader: {
    backgroundColor: Colors.pinkBg,
    padding: 16,
    borderBottomWidth: 2,
    borderBottomColor: Colors.pinkLight,
  },
  categoryHeaderText: { fontSize: 20, fontWeight: 'bold', color: Colors.pink, textAlign: 'center' },

  emptyState: { alignItems: 'center', justifyContent: 'center', padding: 60 },
  emptyStateIcon: { fontSize: 48, color: Colors.blue, marginBottom: 16 }, // תכלת לאייקון
  emptyStateText: { fontSize: 16, color: Colors.blue, textAlign: 'center', marginTop: 8, lineHeight: 22 }, // תכלת לטקסט

  buttonsContainer: { flexDirection: 'row', justifyContent: 'center', marginTop: 24, paddingHorizontal: 4 },

  resetButton: {
    backgroundColor: Colors.blue, // תכלת לכפתור איפוס
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 15,
    shadowColor: Colors.blue,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 6,
  },
  resetButtonText: { color: Colors.white, fontSize: 16, fontWeight: 'bold', textAlign: 'center' },

  saveButton: {
    backgroundColor: Colors.green,
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderRadius: 15,
    flex: 0.48,
    shadowColor: Colors.green,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 6,
  },
  saveButtonText: { color: Colors.white, fontSize: 16, fontWeight: 'bold', textAlign: 'center' },
  buttonHalf: { flex: 0.48 },

  decorativeLine: {
    height: 3,
    backgroundColor: Colors.blue, // תכלת לקו הדקורטיבי
    borderRadius: 2,
    marginVertical: 8,
    alignSelf: 'center',
    width: 60,
  },
  itemCountBadge: { backgroundColor: Colors.blue, borderRadius: 15, paddingHorizontal: 10, paddingVertical: 6, marginLeft: 8 }, // תכלת לתגים
  itemCountText: { color: Colors.white, fontSize: 12, fontWeight: 'bold' },
  categoryIcon: { marginRight: 8, fontSize: 18 },
});

export default babyChecklistStyles;
