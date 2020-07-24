
var Login_ID=localStorage.getItem("Firebase LoginID");
var url_string = window.location.pathname;
console.log(url_string);
		//alert( "section store  :" );
		if(Login_ID=="Login")
		{
			console.log( "section store  :"+Login_ID );		
			document.getElementById("nav_logBTN").style.visibility="hidden";
			document.getElementById("nav_signupBTN").style.visibility="hidden";
			document.getElementById("nav_signoutBTN").style.visibility="show"
			document.getElementById("nav_userImg").style.visibility="show"
			
		}
		else if(Login_ID=="Logout")
		{
			document.getElementById("nav_logBTN").style.visibility="show";
			document.getElementById("nav_signupBTN").style.visibility="show";
			document.getElementById("nav_signoutBTN").style.visibility="hidden";
			document.getElementById("nav_userImg").style.visibility="hidden";
			console.log( "section store  :"+Login_ID );			
		}
    if(url_string=="/login.html")
    {
        window.location.href("/homepage.html")
    }
