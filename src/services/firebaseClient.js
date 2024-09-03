import Firebase from '@react-native-firebase/auth';
import FirebaseStorage from '@react-native-firebase/storage';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

const firebaseSignInWithEmailAndPassword = async ({
  username = '',
  password = '',
}) => {
  if (username?.length === 0 || password?.length === 0) {
    return 'Invalid credentials';
  }
  try {
    await Firebase().signInWithEmailAndPassword(username, password);
    return 'Login successful';
  } catch (e) {
    return e?.code;
  }
};

const firebaseCreateUserWithEmailAndPassword = async ({
  username = '',
  password = '',
}) => {
  if (username?.length === 0 || password?.length === 0) {
    return 'Invalid credentials';
  }
  try {
    await Firebase().createUserWithEmailAndPassword(username, password);
    return 'User account created & signed in!';
  } catch (e) {
    return e?.code;
  }
};

const handleGoogleSignin = async () => {
  try {
    // Check if your device supports Google Play
    await GoogleSignin.hasPlayServices({
      showPlayServicesUpdateDialog: true,
    });
    // Get the users ID token
    const idToken = (await GoogleSignin.signIn()).data.idToken;

    // Create a Google credential with the token
    const googleCredential = Firebase.GoogleAuthProvider.credential(idToken);

    // Sign-in the user with the credential
    return Firebase().signInWithCredential(googleCredential);
  } catch (e) {
    return e;
  }
};

const firebaseSignOut = () => {
  try {
    Firebase().signOut();
  } catch (_) {}
};

const getCurrentFirebaseUser = () => {
  try {
    return Firebase().currentUser;
  } catch (_) {
    return null;
  }
};

const deleteFirebaseUser = ({
  successCallback = () => {},
  failureCallback = () => {},
}) => {
  try {
    Firebase()
      .currentUser.delete()
      .then(() => successCallback())
      .catch(e => {
        if (e.code === 'auth/requires-recent-login') {
          failureCallback(e.code);
        }
      });
  } catch (_) {}
};

const getImageUrlFirebaseStorage = async (imgPath = '') => {
  try {
    const url = await FirebaseStorage().ref(imgPath).getDownloadURL();
    return url;
  } catch (e) {
    return e.message;
  }
};

export {
  firebaseSignInWithEmailAndPassword,
  firebaseCreateUserWithEmailAndPassword,
  handleGoogleSignin,
  firebaseSignOut,
  getCurrentFirebaseUser,
  deleteFirebaseUser,
  getImageUrlFirebaseStorage,
};
