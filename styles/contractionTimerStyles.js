// styles/contractionTimerStyles.js
import { StyleSheet } from 'react-native';

const PINK = '#d81b60';      // deep pink (כמו בקניות)
const PINK_BG = '#fff5f8';   // רקע ורדרד עדין
const PINK_LIGHT = '#fce4ec';// ורוד בהיר לאפקטים/בדג'ים
const TEXT_MUTED = '#666';

const shadow = {
  shadowColor: PINK,
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.15,
  shadowRadius: 8,
  elevation: 5,
};

export default StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: PINK_BG,
    padding: 20,
  },

  title: {
    textAlign: 'center',
    color: PINK,
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 6,
    textShadowColor: 'rgba(216, 27, 96, 0.25)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  subtitle: {
    textAlign: 'center',
    marginBottom: 18,
    fontSize: 15,
    color: TEXT_MUTED,
    lineHeight: 22,
  },
  timerText: {
    fontSize: 18,
    textAlign: 'center',
    color: '#333',
    marginBottom: 14,
  },

  buttonsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
  },
  primaryButton: {
    backgroundColor: PINK,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 25,
    ...shadow,
  },
  primaryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  dangerButton: {
    backgroundColor: '#b71c1c', // לאדום עצור, אבל עדיין בכפתור ראשי
  },
  ghostButton: {
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: PINK,
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 25,
  },
  ghostButtonText: {
    color: PINK,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  hospitalMessageText: {
    color: '#b71c1c',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },

  sectionHeader: { marginTop: 6, marginBottom: 8 },
  listTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: PINK,
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
    color: TEXT_MUTED,
    textAlign: 'center',
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginBottom: 10,
    borderRadius: 14,
    shadowColor: PINK,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  itemLeft: { marginRight: 12 },
  itemIndexBadge: {
    backgroundColor: PINK,
    color: '#fff',
    minWidth: 26,
    textAlign: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
    fontWeight: 'bold',
  },
  itemMiddle: { flex: 1 },
  itemTitle: { fontSize: 16, color: '#333', marginBottom: 2, fontWeight: '600' },
  itemSubtitle: { fontSize: 14, color: TEXT_MUTED },

  itemRight: { marginLeft: 12 },
  badge: {
    backgroundColor: PINK_LIGHT,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
    alignItems: 'center',
  },
  badgeText: {
    color: PINK,
    fontSize: 15,
    fontWeight: '700',
  },
  badgeSubText: {
    fontSize: 10,
    color: '#b71c1c', // או ורוד כהה #d81b60
    marginTop: 2,
  },
  listContent: { paddingBottom: 16 },
     page: {
     flex: 1,
     backgroundColor: PINK_BG,
       width: '100%',     // כאן שולט על ה־80% שרצית

       alignSelf: 'center',
   },
   scrollContent: {
     paddingVertical: 24,
     flexGrow: 1,
   },

  // עוטף פנימי ששולט על הרוחב בפועל של כל התוכן
  content: {
    width: '70%',     // כאן שולט על ה־80% שרצית
    // maxWidth: 900,    // אפשר להגדיל/להקטין לדסקטופ
    alignSelf: 'center',
    paddingHorizontal: 20,
  },

  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 18,
    marginBottom: 20,
    width: '100%', // ימלא את ה־content
    ...shadow,
  },

  hospitalMessageBox: {
    backgroundColor: '#ffebee',
    borderWidth: 2,
    borderColor: '#ef5350',
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
    backgroundColor: PINK,
    borderRadius: 2,
    opacity: 0.3,
    alignSelf: 'center',
    width: '100%', // במקום marginHorizontal
  },
});