
var url_string = window.location.href;
var url = new URL(url_string);
var id1 = url.searchParams.get("id1");
var id2 = url.searchParams.get("id2");
console.log("id of car 1 is :"+id1);
console.log("id of car 2 is :"+id2);

 database =firebase.database();
 var car_1=database.ref('/cardetail/'+id1);
 var car_2=database.ref('/cardetail/'+id2);

 car_1.on('value',Car_1_data,gotError);
 car_2.on('value',Car_2_data,gotError);

     function Car_1_data(data)
     {
         var car_name=data.child("name").val();
         var car_year=data.child("year").val();
         var engine_type=data.child("engine_type").val();
         var car_color=data.child("color").val();
         var price=data.child("car_price").val();
         var img_front=data.child("fornt_image").val();
         var img_left=data.child("left_side_image").val();
         var img_right=data.child("right_side_image").val();
         var img_back=data.child("back_image").val();
        
         
         document.getElementById("price1").innerHTML=price;
         document.getElementById("detail1").innerHTML=car_year+" - " +car_color+" - "+engine_type;

         document.getElementById("carname1").innerHTML=car_name;
         document.getElementById("carname2").innerHTML=car_name;
         document.getElementById("carname3").innerHTML=car_name;
         document.getElementById("carname4").innerHTML=car_name;
         document.getElementById("carname5").innerHTML=car_name;

         document.getElementById("front_side1").src=img_front;
         document.getElementById("left_side1").src=img_left;
         document.getElementById("right_side1").src=img_right;
         document.getElementById("back_side1").src=img_back;
        
         //for customer location
         customer_ID=data.child("customer_id").val();
             var ref=database.ref('/customer/'+customer_ID);
             ref.on('value',gotdata,gotError);
             function gotdata(data)
             {
                 var country=data.child("country").val();
                 var city=data.child("location").val();
                 var username=data.child("name").val();
                 var email=data.child("email").val();
                 var phone=data.child("phone").val();
                 var gender=data.child("gender").val();

                 document.getElementById("location1").innerHTML=city+" - "+country;   
                 document.getElementById("username1").innerHTML=username;
                 document.getElementById("email1").innerHTML=email;
                 document.getElementById("phone_NO1").innerHTML=phone;
                 document.getElementById("gender1").innerHTML=gender;     

            }
     }
     function Car_2_data(data)
     {
         var car_name=data.child("name").val();
         var car_year=data.child("year").val();
         var engine_type=data.child("engine_type").val();
         var car_color=data.child("color").val();
         var price=data.child("car_price").val();
         var img_front=data.child("fornt_image").val();
         var img_left=data.child("left_side_image").val();
         var img_right=data.child("right_side_image").val();
         var img_back=data.child("back_image").val();
        
         

         document.getElementById("price2").innerHTML=price;
         document.getElementById("detail2").innerHTML=car_year+" - " +car_color+" - "+engine_type;

         document.getElementById("carname1_2").innerHTML=car_name;
         document.getElementById("carname2_2").innerHTML=car_name;
         document.getElementById("carname3_2").innerHTML=car_name;
         document.getElementById("carname4_2").innerHTML=car_name;
         document.getElementById("carname5_2").innerHTML=car_name;

         document.getElementById("front_side2").src=img_front;
         document.getElementById("left_side2").src=img_left;
         document.getElementById("right_side2").src=img_right;
         document.getElementById("back_side2").src=img_back;
        

         //for customer location
         customer_ID=data.child("customer_id").val();
             var ref=database.ref('/customer/'+customer_ID);
             ref.on('value',gotdata,gotError);
             function gotdata(data)
             {
                 var country=data.child("country").val();
                 var city=data.child("location").val();
                 var username=data.child("name").val();
                 var email=data.child("email").val();
                 var phone=data.child("phone").val();
                 var gender=data.child("gender").val();

                 document.getElementById("location2").innerHTML=city+" - "+country;   
                 document.getElementById("username2").innerHTML=username;
                 document.getElementById("email2").innerHTML=email;
                 document.getElementById("phone_NO2").innerHTML=phone;
                 document.getElementById("gender2").innerHTML=gender;
                 

            }
     }
     function gotError(err)
     {
         console.log(err)
     }


