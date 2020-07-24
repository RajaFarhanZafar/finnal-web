database = firebase.database().ref();
var ref = database.child("cardetail");
//ref.orderByChild("name").startAt('c').endAt('c\uf8ff');
Car_detail_data(ref);

function searchBtn() {
    var carname = document.getElementById("carname").value;
    var CarYear = document.getElementById("year").value;
    var check1 = document.getElementById("check1");
    var check = document.getElementById("check");
    check.remove();
    var check = document.createElement("div");
    check.id="check";
    check1.append(check);
    console.log(CarYear);
    if(CarYear=="")
    {    
        var ref=database.child("cardetail").orderByChild( "name").startAt(carname).endAt(carname+"\uf8ff");
        document.getElementById("carname").value='';
    }
    if(carname=="")
    {
        var ref=database.child("cardetail").orderByChild( "year").startAt(CarYear).endAt(CarYear+"\uf8ff");
        document.getElementById("year").value='';
    }
    Car_detail_data(ref);
  }
  

function Car_detail_data(ref){
    var number = 0;
    ref.on('child_added', snap => {
        var fornt_image = snap.child("fornt_image").val();
        var car_name = snap.child("name").val();
        var car_year = snap.child("year").val();
        var car_color = snap.child("color").val();
        var price = snap.child("car_price").val();
        var id = snap.child("id").val();
        var views = snap.child("view").val();
        var sold = snap.child("sold_status").val();

        var container = document.getElementById("check");
        var row1= document.createElement("div");
        row1.className="row1 ";
        row1.id=id;

        var column1= document.createElement("div");
        column1.className="column1 ";
        column1.id=id;
        column1.setAttribute("onclick","myFunction1(this.id)");
            var car_img = document.createElement("img");
            car_img.style="width: 150px;height:120px;";
            car_img.src = fornt_image;
            column1.append(car_img);
        
        var column2= document.createElement("div");
        column2.className="column2 ";
        column2.id=id;
        column2.setAttribute("onclick", "myFunction1(this.id);");
        var CarName = document.createElement("h5");
        var CarDeatils = document.createElement("h5");
        var CarPrice = document.createElement("h4");
        CarName.innerHTML=car_name;
        CarDeatils.innerHTML=car_year+" | "+car_color;
        CarPrice.innerHTML=price;
        column2.append(CarName);
        column2.append(CarDeatils);
        column2.append(CarPrice);
        
        var column3= document.createElement("div");
        column3.className="column3";
            
            var sold_img = document.createElement("img");
            sold_img.style="width: 150px;height:120px;";
            sold_img.src =sold;
            column3.append(sold_img);
            
            
        var column4= document.createElement("div");
        column4.className="column4";
        var E_Btn= document.createElement("button");
        E_Btn.className="edit";
        E_Btn.id=id;
        E_Btn.setAttribute("onclick", "myFunction1(this.id);");
        E_Btn.innerHTML="Edit";
        column4.append(E_Btn);
        
        var D_Btn= document.createElement("button");
        D_Btn.className="delete";
        D_Btn.id=id;
        D_Btn.setAttribute("onclick", "car_delete(this.id);");
        D_Btn.innerHTML="Delete";
        column4.append(D_Btn);
        
        var View_p= document.createElement("p");
        View_p.style="text-align: center;";
        View_p.innerHTML="Views :"+views;

        column4.append(View_p);
                
    row1.appendChild(column1);
    row1.appendChild(column2);
    row1.appendChild(column3);
    row1.appendChild(column4);
    container.appendChild(row1);

        console.log(snap.val());
    });
}

function myFunction1(element) {
    alert(element);
   // window.location.href = "car_detail.html" + "?id=" + element;
    //console.log(element)
}
function car_delete(element) {
    if (confirm("DO YOU WANT TO DELETE THIS CAR !")) {

        firebase.database().ref("cardetail").child(element).remove();    
         alert("user delete successfully")
         document.location.reload();
        
     //  txt = "You pressed OK!";
    } else {
        alert("This user has no record ");
        document.location.reload();
    }
}