

database = firebase.database().ref();
var Admin_name= document.getElementById("Admin_name");
var Admin_Img= document.getElementById("Admin_Img");

var User_id=window.localStorage.getItem("id");
firebase.database().ref('mangerdetails/' + User_id).once('value').then(function (snapshot) {
    if (snapshot.val()) {
        
        Admin_name.innerHTML=snapshot.child("name").val();
        Admin_Img.src=snapshot.child("image_Url").val();
    }
    else
    {
        window.location.href = "error.html";
    }
}
);

var ref = database.child("customer");
var user_list = document.getElementById("tableUsers");
table(ref);

var Input_username = document.getElementById("username");
Input_username.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
     event.preventDefault();
    var username = document.getElementById("username").value;
    var user_list= document.getElementById("tableUsers");
    var User_table_list= document.getElementById("User_table_list");
    user_list.remove();
    var new_user_list= document.createElement("tbody");
    new_user_list.id="tableUsers";
    User_table_list.append(new_user_list);

        var ref=database.child("customer").orderByChild( "name").startAt(username).endAt(username+"\uf8ff");
        document.getElementById("username").value='';
        
        table(ref);

    }
  });

var Input_email = document.getElementById("email");
Input_email.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
     event.preventDefault();
    var email = document.getElementById("email").value;
    var user_list= document.getElementById("tableUsers");
    var User_table_list= document.getElementById("User_table_list");
    user_list.remove();
    var new_user_list= document.createElement("tbody");
    new_user_list.id="tableUsers";
    User_table_list.append(new_user_list);

        var ref=database.child("customer").orderByChild( "email").startAt(email).endAt(email+"\uf8ff");
        document.getElementById("email").value='';
        
        table(ref);

    }
  });
  var Input_phone = document.getElementById("phoneNo");
  Input_phone.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
     event.preventDefault();
    var phone = document.getElementById("phoneNo").value;
    var user_list= document.getElementById("tableUsers");
    var User_table_list= document.getElementById("User_table_list");
    user_list.remove();
    var new_user_list= document.createElement("tbody");
    new_user_list.id="tableUsers";
    User_table_list.append(new_user_list);

        var ref=database.child("customer").orderByChild( "phone").startAt(phone).endAt(phone+"\uf8ff");
        document.getElementById("phoneNo").value='';
        
        table(ref);

    }
  });
  var Input_address = document.getElementById("address");
  Input_address.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
     event.preventDefault();
    var address = document.getElementById("address").value;
    var user_list= document.getElementById("tableUsers");
    var User_table_list= document.getElementById("User_table_list");
    user_list.remove();
    var new_user_list= document.createElement("tbody");
    new_user_list.id="tableUsers";
    User_table_list.append(new_user_list);

        var ref=database.child("customer").orderByChild( "location").startAt(address).endAt(address+"\uf8ff");
        document.getElementById("address").value='';
        
        table(ref);

    }
  });


function searchBtn() {
    var email = document.getElementById("email").value;
    var username = document.getElementById("username").value;
    var phone = document.getElementById("phoneNo");
    var address = document.getElementById("address");
    var user_list= document.getElementById("tableUsers");
    var User_table_list= document.getElementById("User_table_list");
    user_list.remove();
    var new_user_list= document.createElement("tbody");
    new_user_list.id="tableUsers";
    User_table_list.append(new_user_list);

        var ref=database.child("customer").orderByChild( "email").startAt(email).endAt(email+"\uf8ff");
        document.getElementById("email").value='';
        
        table(ref);
  }
  
function table(ref)
{
    ref.on('child_added', snap => {
        var C_ID = snap.child("id").val();
        var User_name = snap.child("name").val();
        var User_email = snap.child("email").val();
        var User_phone = snap.child("phone").val();
        var User_address = snap.child("location").val();
        var Status = snap.child("status").val();
        console.log(C_ID);

        $("#tableUsers").append(
            "<tr class=\"w3-hover-grey\" id=\"C_ID\"><td id=\"email\">" + User_email +
            "</td><td>" + User_name + "</td><td>" + User_phone +"</td><td>" + User_address +"</td><td>" + Status + "</td><td><button id=\"edit\" class=\"edit\" onclick=\"user_edit(this.id)\">" + "Edit"
            + "</button><button class=\"delete\" id=\"del\" onclick=\"user_delete(this.id)\">" + "Delete" + "</button></td></tr>");

            
        var D_id = document.getElementById("del");
        D_id.id = C_ID;
        var E_id=document.getElementById("edit");
        E_id.id=C_ID;

    });
}
function user_delete(element) {
    if (confirm("DO YOU WANT TO DELETE THIS USER !")) {

        ref.child(element).remove();    
         alert("user delete successfully")
         document.location.reload();
        
     //  txt = "You pressed OK!";
    } else {
        alert("This user has no record ");
        document.location.reload();
    }
}

function user_edit(element) {
    var hide=document.getElementById("hide");
    var User_id=document.getElementById("User_id");
    User_id.innerHTML=element;
    firebase.database().ref('customer/' + element).child("status").once('value').then(function (snapshot) {
        if(snapshot.val()=="enable")
        {
            console.log(snapshot.val());
            document.getElementById("Radio_enable").checked=true;
            hide.style="display:show";
        }
        else if(snapshot.val()=="disable")
        {
            console.log(snapshot.val());
            document.getElementById("Radio_disable").checked=true;
            hide.style="display:show";
        }else{
            alert("error ");
        }
    });
}
function user_edit_save_Btn() {
    var hide=document.getElementById("hide");
    var User_id=document.getElementById("User_id").innerText;
    alert("your id is :"+ User_id);
    if(document.getElementById("Radio_enable").checked==true)
    {
        
        firebase.database().ref('customer/' + User_id).update({ status: "enable" });
        hide.style="display:none";
        window.location.reload();
    }
    else if(document.getElementById("Radio_disable").checked==true)
    {
        firebase.database().ref('customer/' + User_id).update({ status: "disable" });
        hide.style="display:none";
        window.location.reload();
    }
    else
    {
        hide.style="display:none";
        
    }
   
}
