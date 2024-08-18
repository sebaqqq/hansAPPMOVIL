import { StyleSheet } from 'react-native';

export const CuentaStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F0F0F0",
    borderRadius: 10,
    maxHeight: "100%",
    width: '100%',
    alignSelf: 'center',
  },
  header: {
    backgroundColor: "#090909",
    height: 90,
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  logo: {
    fontSize: 20,
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    marginLeft: 10,
  },
  subtitle: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#000",
    textAlign: "center",
  },
  meca: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#090909",
    textAlign: "center",
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 50,
    marginBottom: 15,
  },
  text: {
    marginLeft: 5,
    fontSize: 16,
    color: "#090909",
  },
  iconTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profile: {
    marginTop: 40,
    padding: 30,
    backgroundColor: '#fff',
    borderRadius: 30,
    marginBottom: 20,
    width: '90%',
    alignSelf: 'center',
  },
  logoImage: {
    padding: 100,
    width: 380,
    height: 100,
    marginBottom: 7,
    alignSelf: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#333333",
  },
});
