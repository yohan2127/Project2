$.get("/api/order", function(data) {     
  console.log(data);  
      var liHtml ='<tbody>';
      //var editButton='<button type="submit" class="btn btn-secondary mb-2 editRecord" id="createAccBtn" data-toggle="modal" data-target="#EditModal">Edit</button>';
      for (var i = 0; i < data.length; i++) { 
        var editButton='<a href="#" target="_blank" class="btn btn-primary btn-xs editRecord  id="'+ data[i].id +'" data-toggle="modal" data-target="#EditModal">Edit</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;';
        var actions= '<div class="btn-group" data-toggle="buttons">'+ editButton +'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href="#" target="_blank" class="btn btn-primary btn-xs DeleteRecord ">Delete</a> </div>'
      liHtml =liHtml + 
        "<tr id="+data[i].id+"><td>" + 
        data[i].id + "</td><td>" +
        data[i].name_of_wine + "</td><td>" + 
        data[i].unit_price + "</td><td>" + 
        data[i].quantity+ "</td><td>" + 
        data[i].status+ "</td><td>" + 
        actions + "</td></tr>";
             } 
          liHtml +="</tbody>";
         $("#well-section").append(liHtml); 
        var LiHead='<tfoot><tr >   <th width="15%">Order ID</th>  <th width="15%">Name of Wine</th>  <th width="15%">purchased price</th> <th width="15%">Quantity</th> <th width="15%">Status</th> <th width="15%">Action</th> </tr><tfoot>';
      $("#well-section").append(LiHead);
      var table = $('#well-section').DataTable( {
          "lengthMenu": [[5, 10, 20, -1], [5, 10, 20, "All"]]
      }         
      );     
      $('#well-section thead th.columnFilter').each(function() {  
        $(this).html('<input class="SearchTextInput" style="width:70px;" type="text" placeholder="Search" />');  
   }); 
   $("#well-section thead input").on('keyup change', function() {  
       table  
          .column($(this).parent().index() + ':visible')  
         .search(this.value)  
           .draw();
      });      
      $('#global_filter').keyup(function(){  
   table.search( $(this).val())
        .draw();
       
        });
     

    // Find and remove selected table rows
       $(".DeleteRecord").click(function(){
         var ida=  $(this).closest('tr').attr('id');  
         
             //Logic to delete the item
             deleteOrder(ida); 
         //}
                         
       });  
       $(".editRecord").click(function(){
        var ida=  $(this).closest('tr').attr('id');  
      // alert("editing item with " + ida) ;   
       $.get("/api/ReadByID/" +ida, function(data) {
        ////console.log(data);
        $('#NameOfWineEdit').val(data.name_of_wine);
        $('#PurchasedPriceEdit').val(data.purchased_price);
        $('#QuantityEdit').val(data.quantity);
        $('#StatusEdit').val(data.status);
        $('.Edit').attr('id', ida);
          });       
      });        
  }); 
  
 

  function deleteOrder(IDA) {
    var id = $(this).data("id");
      $.ajax({
      method: "DELETE",
      url: "/api/Delete/" + IDA
    }).then(refereshPage());
  }

                    
 // getOrder();
  function refereshPage() {    
    location.reload();
  }

  $('#well-section').on('draw.dt', function() {
  $(".DeleteRecord").click(function(){
    var ida=  $(this).closest('tr').attr('id'); 
              //Logic to delete the item
              deleteOrder(ida); 
       
                    
  });  
  $(".editRecord").click(function(){
    var ida=  $(this).closest('tr').attr('id');  
  // alert("editing item with " + ida) ;   
   $.get("/api/ReadByID/" +ida, function(data) {
    ////console.log(data.name_of_wine);
    //alert(data.name_of_wine);
    $('#NameOfWineEdit').val(data.name_of_wine);
    $('#PurchasedPriceEdit').val(data.purchased_price);
    $('#QuantityEdit').val(data.quantity);
    $('#StatusEdit').val(data.status);
    $('.Edit').attr('id', ida);
      });       
  })
} );



/* ------Create item form page----*/

let handleCreateProductOrder = () => {
  event.preventDefault();  ////console.log('data2');
  
  let NameOfWine = $('#NameOfWine').val();
  let PurchasedPrice = $('#PurchasedPrice').val().trim();
  let Quantity = $('#Quantity').val();
  let Variety = $('#Variety').val();
  let Status = $('#Status').val().trim();   
  addOrder({
    name_of_wine: NameOfWine,
    unit_price:PurchasedPrice,
    variety:Variety,
    quantity: Quantity,
    status: Status
         
  }); 

}  
let addOrder = (userData) => {
    ////console.log(userData); 
    $('#NameOfWine').val('');
    $('#PurchasedPrice').val('');
    $('#Quantity').val('');
    $('#Variety').val('');
    $('#Status').val('');
    $('#accModal').modal("hide");
 $.post('/api/new', userData).then(location.reload());
}
$(document).on('click', '#createNew', handleCreateProductOrder)





/* ------Edit form page----*/
let handleEditAccount = () => {
  event.preventDefault();
  //var ida=  $(this).attr('id');  //console.log('id',ida);
   var idSubmit= $(".Edit").attr("id")
  let NameOfWine = $('#NameOfWineEdit').val();
  let PurchasedPrice = $('#PurchasedPriceEdit').val().trim();
  let Quantity = $('#QuantityEdit').val();
  let Status = $('#StatusEdit').val().trim();   
  editUser({
    name_of_wine: NameOfWine,
    unit_price:PurchasedPrice,
    variety:PurchasedPrice,
    quantity: Quantity,
    status: Status,
    id:idSubmit      
  });  
}  
let editUser = (userData) => {
   //console.log(userData); 
     $.post('/api/update-data/'+userData.id, userData).then(location.reload());
     $('#accModal').modal("hide");  
}  
$(document).on('click', '.Edit', handleEditAccount);




let getWine = () => { 
  $('#NameOfWine').find('option').remove().end()
   var option= "<option> Select </option>";
  $.get("/api/wine/Dropdown", function(data2) {  
 //var WineNameArray=[];
 for(i=0;i<data2.length;i++){
   ////console.log(WineNameArray.indexOf(data2[i].name_of_wine));
  //if(WineNameArray.indexOf(data2[i].name_of_wine)  == -1){
    // WineNameArray.push(data2[i].name_of_wine) ;
     option += "<option>" + data2[i].name_of_wine + "</option>"
   // } 
}
$('#NameOfWine').append(option);
});
}
let getWineEditRecord = () => {
  var option= "<option> Select </option>";
  if ($("#Variety").val() === "") {
    var apicall="/api/wine/Dropdown"
 } else { var apicall="/api/wine/Dropdown" +VarietySelected }
  $.get(apicall, function(data2) {  
// var WineNameArray=[];
 for(i=0;i<data2.length;i++){
  // //console.log(WineNameArray.indexOf(data2[i].name_of_wine));
 // if(WineNameArray.indexOf(data2[i].name_of_wine)  == -1){
    // WineNameArray.push(data2[i].name_of_wine) ;
     option += "<option>" + data2[i].name_of_wine + "</option>"
    //} 
}
$('#NameOfWineEdit').append(option);
});
}



//$(document).on('click', '.editRecord ', getWineEditRecord);
$(document).on('click', '#createAccBtn', getWine);

$(document).ready(function(){
  $("select#VarietyEdit").change(function(){
      var selectedVariety = $(this).children("option:selected").val();
      $('#NameOfWineEdit').find('option').remove().end();
      //$('#NameOfWine').find('option').remove().end();
       var option= "<option> Select </option>";
  if (selectedVariety=== "") {
    var apicall="/api/wine/Dropdown"
 } else { var apicall="/api/wine/Dropdown/" +selectedVariety }
// alert(apicall);
 $.get(apicall, function(data2) {    
   for(i=0;i<data2.length;i++){   
       option += "<option>" + data2[i].name_of_wine + "</option>"; 
  }
  $('#NameOfWineEdit').append(option);
 // $('#NameOfWine').append(option);
  });
  });
                  $("select#Variety").change(function(){
                    var selectedVariety = $(this).children("option:selected").val();
                    $('#NameOfWine').find('option').remove().end();
                    //$('#NameOfWine').find('option').remove().end();
                    var option= "<option> Select </option>";
                if (selectedVariety=== "") {
                  var apicall="/api/wine/Dropdown"
                } else { var apicall="/api/wine/Dropdown/" +selectedVariety }
                // alert(apicall);
                $.get(apicall, function(data2) {    
                for(i=0;i<data2.length;i++){   
                    option += "<option>" + data2[i].name_of_wine + "</option>"; 
                }
                $('#NameOfWine').append(option);
                // $('#NameOfWine').append(option);
                });
                });

                    $("select#NameOfWineEdit").change(function(){
                      var selectedVariety = $('#VarietyEdit').val();
                      var SelectedWine=$('#NameOfWineEdit').val();//alert(SelectedWine);
                      //$('#NameOfWine').find('option').remove().end();
                      
                  if (selectedVariety!= "" ||  selectedVariety!= "" ) {
                    var apicall="/api/wine/Dropdown/" +selectedVariety +"/" + SelectedWine}
                  
                  $.get(apicall, function(data2) {    
                    $('#PurchasedPriceEdit').val(data2[0].unit_price); 
                    });
                  });

               
});

