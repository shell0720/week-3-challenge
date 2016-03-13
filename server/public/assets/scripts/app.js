  var operationArray = ["Add", "Subtract", "Multiply", "Divide"];
  var numberArray = ["0","1","2","3","4","5","6","7","8","9"];
  var newNumbers =[];

//prepare the inital page loading
  $(document).ready(function () {
    $(".people").on("click", "button", clickOperationButton);
    $(".number").on("click","button",clickeNumButton);
    $('.equal').on("click", equal);
    $('.clear').on("click", resetDom);
    appendButtons();
    appendNumButtons();
  });
//append buttons dynamicly
  function appendButtons () {
    for(var i = 0; i< operationArray.length; i++){
      $(".people").append("<button>"+ operationArray[i]+"</button>");
      var $el = $(".people").children().last();
      $el.data("type", operationArray[i]);
    }
  }
//collect information from the form
  function clickOperationButton(event){
    event.preventDefault();
    var val = {};
    //store inputs from form into the object
    $.each($("#calculateForm").serializeArray(),function(index, element){
      val[element.name]= element.value;
    });

    console.log(val);
    //set the type key to val
    var type = $(this).data("type");
    val.type = type;
    //push the type key to an array
    newNumbers.push(type);
    //empty the input
    $("#employeeForm").find("input[type=text]").val("");
    $("#employeeForm").find("input[type=number]").val("");
    //ajax call
    $.ajax({
       type: "POST",
       url: "/data",
       data: val,
       success: function(data){
         appendDom(data);
       }

     });
  }
//show the result to the DOM
  function appendDom(data) {
  $('.result').empty();
  $('.result').append('<p> Result is: ' + data + '</p>');
  }

//clear the DOM
  function resetDom () {
    $('.result').empty();

  }
//append number buttons
  function appendNumButtons () {
    for(var i = 0; i< numberArray.length; i++){
      $(".number").append("<button>"+ numberArray[i]+"</button>");
      var $el = $(".number").children().last();
      $el.data("number", numberArray[i]);
    }
  }
//create an array to store input from number buttons
  function clickeNumButton(){
    var number = $(this).data("number");
    newNumbers.push(number);
    console.log(newNumbers);
  }
//convert array to object and send the new data to server
  function equal (){
    var newMathNumbers = {};
      newMathNumbers.x = newNumbers[0],
      newMathNumbers.y = newNumbers[2],
      newMathNumbers.type = newNumbers[1];
    $.ajax({
     type: "POST",
     url: "/data",
     data: newMathNumbers,
     success: function(data){
       appendDom(data);
     }

   });
 }
 
