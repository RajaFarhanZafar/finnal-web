
var url_string = window.location.href;
var url = new URL(url_string);
var id = url.searchParams.get("id");
console.log("url id of firebasse" + id);

database = firebase.database();
var ref = database.ref('/cardetail/' + id);
car_detail(ref);

function car_detail(ref) {
    ref.on('value', gotdata, gotError);
}

function gotdata(data) {

    var car_name = data.child("name").val();
    var car_year = data.child("year").val();
    var engine_type = data.child("engine_type").val();
    var car_color = data.child("color").val();
    var price = data.child("car_price").val();
    var img_front = data.child("fornt_image").val();
    var img_left = data.child("left_side_image").val();
    var img_right = data.child("right_side_image").val();
    var img_back = data.child("back_image").val();
    var cout = data.child("view").val();



    document.getElementById("price").innerHTML = price;
    document.getElementById("detail").innerHTML = car_year + " - " + car_color + " - " + engine_type;

    document.getElementById("car_name").innerHTML = car_name;
    document.getElementById("car_name1").innerHTML = car_name;
    document.getElementById("car_name2").innerHTML = car_name;
    document.getElementById("car_name3").innerHTML = car_name;
    document.getElementById("car_name4").innerHTML = car_name;

    document.getElementById("front_side").src = img_front;
    document.getElementById("left_side").src = img_left;
    document.getElementById("right_side").src = img_right;
    document.getElementById("back_side").src = img_back;


    //for customer location
    customer_ID = data.child("customer_id").val();
    var ref = database.ref('/customer/' + customer_ID);
    ref.on('value', gotdata, gotError);
    function gotdata(data) {

        var country = data.child("country").val();
        var city = data.child("location").val();
        var username = data.child("name").val();
        var email = data.child("email").val();
        var phone = data.child("phone").val();
        var gender = data.child("gender").val();

        document.getElementById("location").innerHTML = city + " - " + country;
        document.getElementById("username").innerHTML = username;
        document.getElementById("email").innerHTML = email;
        document.getElementById("phone_NO").innerHTML = phone;
        document.getElementById("gender").innerHTML = gender;


    }
}
function gotError(err) {
    console.log(err)
}







