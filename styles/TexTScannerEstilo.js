import { StyleSheet } from 'react-native';

export const TexTScannerStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  label: {
    fontSize: 18,
    color: 'white',
  },
  errorMessage: {
    color: 'red',
    marginTop: 10,
  },
  button: {
    padding: 16,
    borderRadius: 8,
    backgroundColor: '#0077B6',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});