import firestore, { Timestamp } from '@react-native-firebase/firestore';

// // Function to read one data from Firestore
// const readDataFromFirestore = async (collection, docId) => {
//   try {
//     const ref = firebase.firestore().collection(collection).doc(docId)
//     const response = await ref.get()
//     return response
//   } catch (error) {
//     return error
//   }
// }

// // fetch one
// readDataFromFirestore('todos', docId).then(doc => {
//     const data = doc.data();
//     console.log(data);
// });

const todosCollectionRef = ({ collection = '' }) =>
    firestore().collection(collection);

// fetch all
// Function to read data from Firestore
const fetchAllFromFirestore = async ({ collection = null }) => {
    if (!collection) return;
    try {
        const res = await todosCollectionRef({ collection }).get();
        return res?.docs?.map(doc => ({ ...doc?.data(), id: doc?.id }));
    } catch (error) {
        return error;
    }
};

// Function to write data to Firestore
const writeDocToFirestore = ({ collection = null, data = null }) => {
    if (!collection || !data) return;
    const dataToBeUpdated = {
        ...data,
        created: Timestamp.fromDate(new Date()),
    };
    try {
        const result = todosCollectionRef({ collection })
            .doc()
            .set(dataToBeUpdated);
        return result;
    } catch (error) {
        return error;
    }
};

const updateDocFirestore = ({ collection = null, id = null, obj = null }) => {
    if (!collection || !id || !obj) return;
    const objToBeUpdated = { ...obj, created: Timestamp.fromDate(new Date()) };
    try {
        return todosCollectionRef({ collection })
            .doc(id)
            .update(objToBeUpdated);
    } catch (error) {
        return error;
    }
};

const deleteDocFromFirestore = ({ collection = null, id = null }) => {
    if (!collection || !id) return;
    try {
        return todosCollectionRef({ collection }).doc(id).delete();
    } catch (error) {
        return error;
    }
};

export {
    fetchAllFromFirestore,
    writeDocToFirestore,
    todosCollectionRef,
    updateDocFirestore,
    deleteDocFromFirestore,
};
