import { StyleSheet } from 'react-native';

const babyChecklistStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fef7f9', // רקע ורוד מאוד עדין
    padding: 16,
  },
  header: {
    backgroundColor: '#fff',
    padding: 24,
    borderRadius: 20,
    marginBottom: 20,
    shadowColor: '#ff69b4',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
    borderWidth: 1,
    borderColor: '#ffeef2',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#e91e63', // ורוד כהה יותר לכותרת
    textAlign: 'center',
    marginBottom: 8,
    textShadowColor: 'rgba(233, 30, 99, 0.1)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  subtitle: {
    fontSize: 16,
    color: '#9c27b0', // סגול עדין
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 22,
  },
  progressContainer: {
    marginBottom: 20,
  },
  progressBar: {
    height: 12,
    backgroundColor: '#f3e5f5', // רקע סגול עדין
    borderRadius: 10,
    overflow: 'hidden',
    shadowColor: '#9c27b0',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#e91e63', // ורוד כהה
    borderRadius: 10,
    shadowColor: '#e91e63',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  progressText: {
    fontSize: 14,
    color: '#9c27b0',
    textAlign: 'center',
    marginTop: 12,
    fontWeight: '600',
  },
  categoryTabsContainer: {
    backgroundColor: '#fff',
    borderRadius: 20,
    marginBottom: 20,
    shadowColor: '#ff69b4',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
    borderWidth: 1,
    borderColor: '#ffeef2',
  },
  categoryTabs: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 16,
  },
  categoryTab: {
    paddingHorizontal: 18,
    paddingVertical: 10,
    margin: 4,
    borderRadius: 25,
    backgroundColor: '#fef7f9',
    borderWidth: 2,
    borderColor: '#fce4ec',
    shadowColor: '#ff69b4',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  categoryTabActive: {
    backgroundColor: '#e91e63',
    borderColor: '#e91e63',
    shadowColor: '#e91e63',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
  },
  // צבעים לקטגוריות שונות
  categoryTabAll: {
    backgroundColor: '#e3f2fd',
    borderColor: '#2196f3',
  },
  categoryTabClothing: {
    backgroundColor: '#fce4ec',
    borderColor: '#e91e63',
  },
  categoryTabFeeding: {
    backgroundColor: '#fff3e0',
    borderColor: '#ff9800',
  },
  categoryTabSleep: {
    backgroundColor: '#e8f5e8',
    borderColor: '#4caf50',
  },
  categoryTabHygiene: {
    backgroundColor: '#f3e5f5',
    borderColor: '#9c27b0',
  },
  categoryTabSafety: {
    backgroundColor: '#ffebee',
    borderColor: '#f44336',
  },
  categoryTabTransport: {
    backgroundColor: '#e0f2f1',
    borderColor: '#009688',
  },
  categoryTabToys: {
    backgroundColor: '#fff8e1',
    borderColor: '#ffc107',
  },
  categoryTabMedical: {
    backgroundColor: '#f1f8e9',
    borderColor: '#8bc34a',
  },
  categoryTabOther: {
    backgroundColor: '#fafafa',
    borderColor: '#9e9e9e',
  },
  categoryTabText: {
    fontSize: 14,
    color: '#9c27b0',
    fontWeight: '600',
  },
  categoryTabTextActive: {
    color: '#fff',
    fontWeight: 'bold',
  },
  // צבעי טקסט לקטגוריות שונות
  categoryTabTextAll: {
    color: '#1976d2',
  },
  categoryTabTextClothing: {
    color: '#c2185b',
  },
  categoryTabTextFeeding: {
    color: '#e65100',
  },
  categoryTabTextSleep: {
    color: '#2e7d32',
  },
  categoryTabTextHygiene: {
    color: '#7b1fa2',
  },
  categoryTabTextSafety: {
    color: '#c62828',
  },
  categoryTabTextTransport: {
    color: '#00695c',
  },
  categoryTabTextToys: {
    color: '#f57f17',
  },
  categoryTabTextMedical: {
    color: '#558b2f',
  },
  categoryTabTextOther: {
    color: '#424242',
  },
  itemsContainer: {
    backgroundColor: '#fff',
    borderRadius: 20,
    shadowColor: '#ff69b4',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
    borderWidth: 1,
    borderColor: '#ffeef2',
    overflow: 'hidden',
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 18,
    borderBottomWidth: 1,
    borderBottomColor: '#fce4ec',
    backgroundColor: '#fff',
  },
  itemRowLast: {
    borderBottomWidth: 0,
  },
  itemRowChecked: {
    backgroundColor: '#fef7f9',
  },
  checkbox: {
    width: 28,
    height: 28,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#fce4ec',
    marginRight: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    shadowColor: '#ff69b4',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  checkboxChecked: {
    backgroundColor: '#e91e63',
    borderColor: '#e91e63',
    shadowColor: '#e91e63',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  checkboxIcon: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  itemText: {
    flex: 1,
    fontSize: 16,
    color: '#9c27b0',
    lineHeight: 24,
    fontWeight: '500',
  },
  itemTextChecked: {
    textDecorationLine: 'line-through',
    color: '#ba68c8',
    fontStyle: 'italic',
  },
  categoryHeader: {
    backgroundColor: '#fef7f9',
    padding: 16,
    borderBottomWidth: 2,
    borderBottomColor: '#fce4ec',
  },
  categoryHeaderText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#e91e63',
    textAlign: 'center',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 60,
  },
  emptyStateIcon: {
    fontSize: 48,
    color: '#ba68c8',
    marginBottom: 16,
  },
  emptyStateText: {
    fontSize: 16,
    color: '#ba68c8',
    textAlign: 'center',
    marginTop: 8,
    lineHeight: 22,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
    paddingHorizontal: 4,
  },
  resetButton: {
    backgroundColor: '#f44336',
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderRadius: 15,
    flex: 0.48,
    shadowColor: '#f44336',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 6,
  },
  resetButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  saveButton: {
    backgroundColor: '#4caf50',
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderRadius: 15,
    flex: 0.48,
    shadowColor: '#4caf50',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 6,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  buttonHalf: {
    flex: 0.48,
  },
  // Additional decorative elements
  decorativeLine: {
    height: 3,
    backgroundColor: '#e91e63',
    borderRadius: 2,
    marginVertical: 8,
    alignSelf: 'center',
    width: 60,
  },
  itemCountBadge: {
    backgroundColor: '#e91e63',
    borderRadius: 15,
    paddingHorizontal: 10,
    paddingVertical: 6,
    marginLeft: 8,
  },
  itemCountText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  categoryIcon: {
    marginRight: 8,
    fontSize: 18,
  },
});

export default babyChecklistStyles; 