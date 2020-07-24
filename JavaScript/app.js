
  database =firebase.database().ref();
  var ref=database.child("cardetail");
  //ref.orderByChild( "name").startAt('c').endAt('c\uf8ff');
  Car_detail_data(ref);

  function searchBtn() {
    var carname = document.getElementById("carname").value;
    var check = document.getElementById("check");
    var check1 = document.getElementById("check1");
    check1.remove();
    var check1 = document.createElement("div");
    check1.id="check1";
    check.append(check1);
    var ref=database.child("cardetail").orderByChild( "name").startAt(carname).endAt(carname+"\uf8ff");
    Car_detail_data(ref);
  }
  

function Car_detail_data(ref){
  var number=0;
  ref.on('child_added',snap=>
  {
    var fornt_image=snap.child("fornt_image").val();
    var car_name=snap.child("name").val();
    var car_year=snap.child("year").val();
    var engine_type=snap.child("engine_type").val();
    var car_color=snap.child("color").val();
    var price=snap.child("car_price").val();
    var id=snap.child("id").val();
    var sold=snap.child("sold_status").val();
    
    var container = document.getElementById("check1");

    var card_mb_5 = document.createElement("div");
    card_mb_5.className="card ";
    card_mb_5.id=id;
    //card_mb_5.setAttribute("onclick", "myFunction1(this.id);");
    card_mb_5.style="max-width: 640px;";
    

    var row_no_gutters = document.createElement("div");
    row_no_gutters.className="row no-gutters";

    var col_md_4 = document.createElement("div");
    col_md_4.className="col-md-3";
    col_md_4.id=id;
    col_md_4.setAttribute("onclick", "myFunction1(this.id);");
      var img = document.createElement("img");
      img.src = fornt_image;
      img.className="card-img";
      col_md_4.append(img);
    
    var col_md_6 = document.createElement("div");
    col_md_6.className="col-md-5";
    col_md_6.id=id;
    col_md_6.style="max-width: 250px;";
    col_md_6.setAttribute("onclick", "myFunction1(this.id);");
      var Card_body = document.createElement("div");
      Card_body.className="card-body";
        
        number++;
        var Card_title = document.createElement("h4");
        Card_title.className="card-title";
        Card_title.id="id-"+number;
        console.log(Card_title.id);
        Card_title.style="font-weight:bold;";
        Card_title.innerHTML=car_name;
        var Card_text = document.createElement("p");
        Card_text.className="card-text";
        Card_text.innerHTML=car_year+ " | "+engine_type+" | "+car_color;
        var Card_price = document.createElement("p");
        Card_price.className="card-text";
        Card_price.style="color:green;font-weight:bold;";
        Card_price.innerHTML="PKR "+price;

      Card_body.appendChild(Card_title);
      Card_body.appendChild(Card_text);
      Card_body.appendChild(Card_price);
    col_md_6.appendChild(Card_body);  

    var col_m_4 = document.createElement("div");
    col_m_4.className="col-md-4";
    col_m_4.id=id;
    col_m_4.style="max-width: 150px;";

      
        var Card_body = document.createElement("div");
        Card_body.className="card-body";
        var img = document.createElement("img");
        img.className="card-img";
        img.src =sold;
        Card_body.appendChild(img);
        col_m_4.appendChild(Card_body);
      


      var col_md = document.createElement("div");
      col_md.className="col-md";
      var input_checkBox=document.createElement("input");
      input_checkBox.className="check";

      input_checkBox.name="check";
      input_checkBox.type="checkbox";
      input_checkBox.id=id;
      input_checkBox.setAttribute("onclick", "checkbox(this.id);");
      col_md.appendChild(input_checkBox);

    row_no_gutters.appendChild(col_md_4);
    row_no_gutters.appendChild(col_md_6);
    row_no_gutters.appendChild(col_m_4);
    row_no_gutters.appendChild(col_md);

    card_mb_5.appendChild(row_no_gutters);
    container.appendChild(card_mb_5);

});
}

function myFunction1(element) {
    //alert(window.location.href);
    view_counter(element);
    
    window.location.href="car_detail.html"+"?id="+element;
    console.log(element)
  }
  var checkboxID_1=null,checkboxID_2=null;
  function checkbox (element) {
    //document.getElementById(element).value;       
    if(checkboxID_1==null)
    {
      checkboxID_1=element;
      
      console.log(checkboxID_1);
    }
    else if(element==checkboxID_1)
    {
      alert("hello me unchecked ....."+checkboxID_1);
      checkboxID_1= null;

    }
    else
    {
      checkboxID_2=element;
      console.log(checkboxID_2);
      console.log("comparepage.html"+"?id1="+checkboxID_1+"&id2="+checkboxID_2);
      window.location.href="comparepage.html"+"?id1="+checkboxID_1+"&id2="+checkboxID_2;    
    }

    
  }
  function view_counter(id) {
    firebase.database().ref('cardetail/' + id).once('value').then(function (snapshot) {
      if (snapshot.val()) {
          
          var cout=snapshot.child("view").val();
          alert("old value" + cout);
          cout = cout + 1;
          firebase.database().ref('cardetail/' + id).update({ view: cout });
          alert("new value" + cout);

      }
  });
    
}