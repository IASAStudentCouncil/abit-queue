import firebase from 'firebase/app'

export default {
    actions: {
        async login({}, {email, password}) {
            try {
                await firebase.auth().signInWithEmailAndPassword(email, password)
            } catch(e) {
                alert('wrong login or password')
                throw e
            }
        }
    }
}
