import { StyleSheet } from 'react-native';

const contractionTimerStyles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#ffe6f0', // light pink
    flexGrow: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  timerContainer: {
    marginBottom: 30,
    alignItems: 'center',
  },
  timerText: {
    fontSize: 20,
    marginBottom: 10,
  },
  listTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 10,
  },
  listHeader: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#ccc',
    paddingBottom: 5,
    marginBottom: 5,
  },
  headerCell: {
    flex: 1,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  listRow: {
    flexDirection: 'row',
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  cell: {
    flex: 1,
    textAlign: 'center',
  },
  noData: {
    textAlign: 'center',
    color: '#888',
    marginVertical: 10,
  },
  buttonBlue: {
    backgroundColor: '#2196F3',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonRed: {
    backgroundColor: '#f44336',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  hospitalMessageBox: {
    backgroundColor: '#ffb6c1', // prominent pink
    padding: 16,
    borderRadius: 10,
    marginVertical: 16,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#f44336',
  },
  hospitalMessageText: {
    color: '#b71c1c',
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
  },
});

export default contractionTimerStyles;
