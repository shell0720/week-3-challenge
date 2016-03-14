  var operationArray = ["Add", "Subtract", "Multiply", "Divide"];
  var numberArray = ["0","1","2","3","4","5","6","7","8","9"];
  var val = {};
  var newNumbers =[];
  var a;
  var number1 = "";
  var number2 ="";
  var newMathNumbers = {};

//prepare the inital page loading
  $(document).ready(function () {
    $(".people").on("click", "button", clickOperationButton);
    $(".number").on("click","button",clickeNumButton);
    $('.equal').on("click", equal);
    $('.anotherequal').on("click", anotherEqual);
    $('.clear').on("click", resetDom);
    appendOperationButtons();
    appendNumButtons();
  });
//append buttons dynamicly
  function appendOperationButtons () {
    for(var i = 0; i< operationArray.length; i++){
      $(".people").append("<button>"+ operationArray[i]+"</button>");
      var $el = $(".people").children().last();
      $el.data("type", operationArray[i]);
    }
  }
//collect information from the form
  function clickOperationButton(event){
    event.preventDefault();

    //store inputs from form into the object
    $.each($("#calculateForm").serializeArray(),function(index, element){
      val[element.name]= element.value;
    });

    console.log(val);
    //set the type key to val
    var type = $(this).data("type");
    val.type = type;
    $("h3").text(type);
    //push the type key to an array
    newNumbers.push(type);
    newMathNumbers.type = type;
    a = newNumbers.indexOf(type);
      console.log(a);

    if(a >= 1) {
      for(var i = 0; i < a; i++) {
        number1 += newNumbers[i];
      }
    }

  }
//show the result to the DOM
  function appendDom(data) {
  $('.result').empty();
  $('.result').append('<p> Result is: ' + data + '</p>');
  }

//clear the DOM
  function resetDom () {
    $('.result').empty();
    newNumbers=[];
    val = {};
    //empty the input
    $("#calculateForm").find("input[type=text]").val("");
    $("#calculateForm").find("input[type=number]").val("");

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

    $("h3").text(number);
    console.log(newNumbers);
  }
//convert array to object and send the new data to server
  function equal (){
    $.ajax({
       type: "POST",
       url: "/data",
       data: val,
       success: function(data){
         appendDom(data);
       }

     });
 }

 function anotherEqual () {
   //set the second key for newMathNumbers
   for (var j = a+1; j<newNumbers.length; j++){
     number2 +=newNumbers[j];
   }
       newMathNumbers.x = number1,
       newMathNumbers.y = number2,
       //newMathNumbers.type = newNumbers[1];
       console.log(newMathNumbers);
     $.ajax({
      type: "POST",
      url: "/data",
      data: newMathNumbers,
      success: function(data){
        appendDom(data);
      }

    });

 }
