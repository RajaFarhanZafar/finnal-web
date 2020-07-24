
database = firebase.database().ref();
var ref = database.child("cardetail");
//ref.orderByChild("name").startAt('c').endAt('c\uf8ff');
Car_detail_data(ref);

function Car_detail_data(ref){
    ref.on('child_added', snap => {
        //var fornt_image = snap.child("fornt_image").val();
        var car_name = snap.child("name").val();
        var views = snap.child("view").val();

        var container = document.getElementById("check");
        var card1= document.createElement("div");
        card1.className="card1";
            var img = document.getElementById("img");
        //    img.src = fornt_image;

            card1.appendChild(img);
            
            var container = document.getElementById("div");
            container.className="container1";
                var h4 = document.getElementById("h4");
                    var b = document.getElementById("b");
                    b.innerHTML="Views :"+views;
                    h4.appendChild(b);
 
                container.appendChild(h4);
                var p = document.getElementById("p");
                p.innerHTML=car_name
                container.appendChild(p);


            card1.appendChild(container);


    container.appendChild(card1);


    });
}