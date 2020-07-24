// Your web app's Firebase configuration
var firebaseConfig = {
	apiKey: "AIzaSyAW1QIQCY3cmW4g1DP2cbJHa14rw8le2DU",
	authDomain: "showroom-21ecb.firebaseapp.com",
	databaseURL: "https://showroom-21ecb.firebaseio.com",
	projectId: "showroom-21ecb",
	storageBucket: "showroom-21ecb.appspot.com",
	messagingSenderId: "1077090634718",
	appId: "1:1077090634718:web:d5d88f7ecaa6d6743cab4f",
	measurementId: "G-D8L7BX5YTW"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

function GoogleLogin() {
    //first of all create google provider object

    var provider=new firebase.auth.GoogleAuthProvider();
    //Login with popup window
    firebase.auth().signInWithPopup(provider).then(function () {
        //code executes after successful login
        

        window.location="homepage.html";
    }).catch(function (error) {
        var errorMessage=error.message;
        alert(errorMessage);
    });
}