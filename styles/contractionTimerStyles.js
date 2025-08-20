// styles/contractionTimerStyles.js
import { StyleSheet } from 'react-native';
import { Colors } from '../constants/Colors';

const shadow = {
  shadowColor: Colors.pinkDeep,
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.15,
  shadowRadius: 8,
  elevation: 5,
};

export default StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: Colors.pinkBg,
    padding: 20,
  },

  title: {
    textAlign: 'center',
    color: Colors.pinkDeep,
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 6,
    textShadowColor: Colors.pinkShadowSoft,
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  subtitle: {
    textAlign: 'center',
    marginBottom: 18,
    fontSize: 15,
    color: Colors.pink700,
    lineHeight: 22,
  },
  timerText: {
    fontSize: 18,
    textAlign: 'center',
    color: Colors.pink700,
    marginBottom: 14,
  },

  buttonsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
  },
  primaryButton: {
    backgroundColor: Colors.pinkDeep,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 25,
    ...shadow,
  },
  primaryButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  dangerButton: {
    backgroundColor: Colors.redDark, // "עצור"
  },
  ghostButton: {
    backgroundColor: Colors.blue,
    borderWidth: 2,
    borderColor: Colors.blue,
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 25,
  },
  ghostButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  hospitalMessageText: {
    color: Colors.redDark,
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },

  sectionHeader: { marginTop: 6, marginBottom: 8 },
  listTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.pinkDeep,
    textAlign: 'center',
    marginBottom: 6,
  },

  // empty states
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  emptyStateIcon: {
    fontSize: 48,
    marginBottom: 8,
  },
  emptyStateText: {
    fontSize: 16,
    color: Colors.blue700,
    textAlign: 'center',
  },

  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.blueLight,
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginBottom: 10,
    borderRadius: 14,
    shadowColor: Colors.blue,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
    borderBottomWidth: 1,
    borderBottomColor: Colors.pinkLight,
  },
  itemLeft: { marginRight: 12 },
  itemIndexBadge: {
    backgroundColor: Colors.pinkDeep,
    color: Colors.white,
    minWidth: 26,
    textAlign: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
    fontWeight: 'bold',
  },
  itemMiddle: { flex: 1 },
  itemTitle: { fontSize: 16, color: Colors.blue700, marginBottom: 2, fontWeight: '600' },
  itemSubtitle: { fontSize: 14, color: Colors.blue700 },

  itemRight: { marginLeft: 12 },
  badge: {
    backgroundColor: Colors.pinkLight,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
    alignItems: 'center',
  },
  badgeText: {
    color: Colors.pinkDeep,
    fontSize: 15,
    fontWeight: '700',
  },
  badgeSubText: {
    fontSize: 10,
    color: Colors.redDark, // או Colors.pinkDeep אם מעדיפה
    marginTop: 2,
  },

  listContent: { paddingBottom: 16 },

  page: {
    flex: 1,
    backgroundColor: Colors.pinkBg,
    width: '100%', // כאן שולט על ה־100% רוחב
    alignSelf: 'center',
  },
  scrollContent: { paddingVertical: 24, flexGrow: 1 },

  // עוטף פנימי ששולט על הרוחב בפועל של כל התוכן
  content: {
    width: '100%',
    maxWidth: 900,        // הגבלה במחשב/טאבלט
    alignSelf: 'center',
    paddingHorizontal: 24,
    paddingTop: 16,
  },

  card: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 18,
    marginBottom: 20,
    width: '100%',
    shadowColor: Colors.blue,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
    borderWidth: 1,
    borderColor: Colors.white,
  },

  hospitalMessageBox: {
    backgroundColor: Colors.redBg,
    borderWidth: 2,
    borderColor: Colors.red, // אם תרצי גוון מדויק יותר, הוסיפי Colors.redMedium = '#ef5350'
    padding: 14,
    borderRadius: 12,
    marginVertical: 14,
    alignItems: 'center',
    width: '100%',
  },

  list: { flex: 1, width: '100%', minHeight: 200 },
  itemsContainer: { flex: 1, marginTop: 6, width: '100%' },

  decorativeLine: {
    height: 3,
    backgroundColor: Colors.pinkDeep,
    borderRadius: 2,
    opacity: 0.3,
    alignSelf: 'center',
    width: '100%',
  },
});
