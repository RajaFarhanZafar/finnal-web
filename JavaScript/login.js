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


function signup() {

	var today = new Date();
    var date = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear();

	var name = document.getElementById("username").value;
	var email = document.getElementById("email").value;
	var pass = document.getElementById("password").value;
	var phone = document.getElementById("phone").value
	var cnic = document.getElementById("cnic").value;
	var gender = document.getElementById("gender").value;
	var location = document.getElementById("location").value;

	window.alert("Date:" + name + "Gendermale :" + email + "Genderfemale :" + password);
	var errorMessage = "";

	if (email != "" && pass != "" && name != "" && phone != "") {
		firebase.auth().createUserWithEmailAndPassword(email, pass)
			.then(function (response) {
				console.log('success');
				console.log(response);
				var userId = firebase.auth().currentUser.uid;
				var verify = firebase.auth().currentUser.emailVerified;

				firebase.database().ref('customer').child(userId).set({
					name: name,
					id: userId,
					email: email,
					password: pass,
					phone: phone,
					cnic: cnic,
					gender: gender,
					location: location,
					date_of_birth: date,
					country: "Pakistan",
					image_URL: "",
					status: "enable"
				}, function (error) {
					if (error) {
						window.alert(error);
					} else {
						// Data saved successfully!
						window.alert("successfully upload data in fire base");
						
						window.location.href = "login.html";
					}
				});
				window.alert(userId);
				firebase.auth().signOut();
			}).catch(function (error) {
				// Handle Errors here.
				var errorCode = error.code;
				errorMessage = error.message;
				window.alert(errorCode);
				window.alert(errorMessage);
			});
	}
	else {
		window.alert("Incomplete Filds");
	}
}


function SignOut() {
	var email = firebase.auth().currentUser.email;
	firebase.auth().signOut();
	window.alert(" This email : " + email + "is S!gNouT.......@@@@");
	localStorage.setItem("Firebase LoginID", "Logout");
	location.reload();

}

function login() {
	var email = document.getElementById("email").value;
	var pass = document.getElementById("password").value;
	firebase.auth().signInWithEmailAndPassword(email, pass)
		.then(function (response) {

			localStorage.setItem("Firebase LoginID", "Login");
			change();
			//	window.alert("welecom");		
			//	window.location.href = "homepage.html";

		}).catch(function (error) {
			// Handle Errors here.
			var errorCode = error.code;
			var errorMessage = error.message;
			window.alert(errorMessage);
		});

}


function change() {
	var login_form = document.getElementById("loginIn_form");
	var verification_form = document.getElementById("verification_form");
	var verification_BTN = document.getElementById("Verification_BTN");

	firebase.auth().onAuthStateChanged(function (user) {
		if (user) {
			
			var userId = firebase.auth().currentUser.uid;
			var email = firebase.auth().currentUser.email;
			var verify = firebase.auth().currentUser.emailVerified;
			
			if (verify == true) {

				firebase.database().ref('customer/' + userId).update({ varification_status: true });
				firebase.database().ref('customer/' + userId).child("status").once('value').then(function (snapshot) {
					if (snapshot.val() == "enable") {

						alert("window change   :...." + userId);
						window.location.href = "homepage.html";
					}
					else if (snapshot.val() == "disable") {
						alert("This EMAIL :- " + email + " is Blocked By Admin ");
						firebase.auth().signOut();
						localStorage.setItem("Firebase LoginID", "Logout");
						window.location.href = "block.html";
					}
					else {
						///window.alart("Account is blocked");
						firebase.auth().signOut();
						localStorage.setItem("Firebase LoginID", "Logout");
						window.location.href = "404.html";
					}
				}
				);
			}
			else{
				
				send_verification();
				login_form.style="display:hide";
				verification_form.style="display:show";
				verification_BTN.id=userId;
			}

		} else {

		}

	});
}
function VerifyBtn(element) {
	var Verify_note = document.getElementById("Verification_note");
	firebase.database().ref('customer/' + element).child("varification_status").once('value').then(function (snapshot) {
		console.log(snapshot.val());
		if (snapshot.val() == true) {
			console.log(snapshot.val());
			change();
			//document.getElementById("Radio_enable").checked=true;
			//hide.style="display:show";
		}
		else if (snapshot.val() == false) {
			console.log(snapshot.val());
			Verify_note.innerHTML = "our account is not verified";
			change();
		} else {
			alert("error ");
		}
	});
}
function send_verification() {
	var user = firebase.auth().currentUser;

	user.sendEmailVerification().then(function () {
		// Email sent.
		console("Verification Sent");
	}).catch(function (error) {
		// An error happened.
		var errorCode = error.code;
		var errorMessage = error.message;
		window.alert(errorMessage);
	});
}

function data() {
	var date = document.getElementById("birthday").value;
	var gendermale = document.getElementById("male").value;
	var genderfemale = document.getElementById("female").value;

	//window.alert("Date:" + date + "Gendermale :" + gendermale + "Genderfemale :" + genderfemale);

	//const dbRefOblsct=firebase.database().ref().child('object').set("hello");

}

// admin and customer btn change
function Admin_Btn_change() {
	var icon = document.getElementById("icon");
	var admin = document.getElementById("Btn_admin");
	var customer = document.getElementById("Btn_customer");
	var BTN_A_login = document.getElementById("BTN_A_login");
	var BTN_C_login = document.getElementById("BTN_C_login");

	admin.className = "active";
	customer.className = "inactive underlineHover";
	icon.src = "https://firebasestorage.googleapis.com/v0/b/showroom-21ecb.appspot.com/o/Admin%2Flogin_admin.png?alt=media&token=6cb6bef4-9cd6-4bac-9c43-f56a772473e4";
	BTN_C_login.setAttribute("type", "hidden");
	BTN_A_login.setAttribute("type", "submit");

}
function Customer_Btn_change() {
	var icon = document.getElementById("icon");
	var admin = document.getElementById("Btn_admin");
	var customer = document.getElementById("Btn_customer");
	var BTN_A_login = document.getElementById("BTN_A_login");
	var BTN_C_login = document.getElementById("BTN_C_login");

	customer.className = "active";
	admin.className = "inactive underlineHover";
	icon.src = "Images/img_avatar3.png";
	BTN_A_login.setAttribute("type", "hidden");
	BTN_C_login.setAttribute("type", "submit");

}
//---------------admin login java code----------------// 

function admin_login() {
	//var mailformat =;

	var email = document.getElementById("email").value;
	var pass = document.getElementById("password").value;

	if (email.indexOf("@admin.com") > -1) {
		alert("Hello Admin");

		firebase.auth().signInWithEmailAndPassword(email, pass)
			.then(function (response) {

				admin_auth_change();
				//localStorage.setItem("Firebase LoginID", "Login");
				// window.alert(" Welecom To Dashboard ")
				// window.location.href = "dashbaord_User_List.html";
			}).catch(function (error) {
				// Handle Errors here.
				var errorCode = error.code;
				var errorMessage = error.message;
				window.alert(errorMessage);
			});
	}
	else {
		alert("In-Valid Entery");
		document.location.reload(true);
	}


}


function admin_auth_change() {
	firebase.auth().onAuthStateChanged(function (user) {
		if (user) {

			var userId = firebase.auth().currentUser.uid;
			var email = firebase.auth().currentUser.email;

			firebase.database().ref('mangerdetails/' + userId).child("status").once('value').then(function (snapshot) {
				if (snapshot.val() == "enable") {

					alert("window change   :...." + userId);
					window.localStorage.setItem("id", userId);
					window.location.href = "dashbaord_User_List.html";
				}
				else if (snapshot.val() == "disable") {
					alert("This EMAIL :- " + email + " is Blocked By Company ");
					firebase.auth().signOut();
					//localStorage.setItem("Firebase LoginID", "Logout");
					window.location.href = "block.html";
				}
				else {
					///window.alart("Account is blocked");
					firebase.auth().signOut();
					localStorage.setItem("Firebase LoginID", "Logout");
					window.location.href = "login.html";
				}
			}
			);

		} else {

		}

	});
}
function Admin_SignOut() {
	var email = firebase.auth().currentUser.email;
	firebase.auth().signOut();
	window.alert(" This email : " + email + "is S!gNouT.......@@@@");
	localStorage.setItem("id", null);
	window.location.href="login.html";
}
