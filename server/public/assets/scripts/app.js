  var operationArray = ["+", "-", "*", "/"];
  var numberArray = ["0","1","2","3","4","5","6","7","8","9"];
  var numberX = "";
  var newMathNumbers = {};

//prepare the inital page loading
  $(document).ready(function () {
    $(".people").on("click", "button", clickOperationButton);
    $(".number").on("click","button",clickeNumButton);
    $('.equal').on("click", equal);
    $('.clear').on("click", resetDom);
    appendOperationButtons();
    appendNumButtons();
  });
//append Opertation buttons dynamicly
  function appendOperationButtons () {
    for(var i = 0; i< operationArray.length; i++){
      $(".people").append("<button>"+ operationArray[i]+"</button>");
      var $el = $(".people").children().last();
      $el.data("type", operationArray[i]);
    }
  }
  //append number buttons dynamicly
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
      numberX += number;
      $(".display").text(numberX);

    }
//collect information from the form
  function clickOperationButton(event){
    event.preventDefault();
    var type = $(this).data("type");
    $(".display").text(type);
    newMathNumbers.type = type;
    newMathNumbers.x = numberX;
    numberX="";
 }
//show the result to the DOM
  function appendDom(data) {
  $('.display').text(data);
  }

//clear the DOM
  function resetDom () {
    $('.display').empty();
    newMathNumbers = {};
    $("#calculateForm").find("input[type=text]").val("");
    $("#calculateForm").find("input[type=number]").val("");

  }

//convert array to object and send the new data to server
 function equal () {
   //set the second key for newMathNumbers
       newMathNumbers.y = numberX,
       numberX ="";
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
