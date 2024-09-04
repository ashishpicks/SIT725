
const clickMe = () => {
    alert("Thanks for clicking me. Hope you have a nice day!")
}
$(document).ready(function () {
    // $('.materialboxed').materialbox();
    $('#clickMeButton').click(() => {
        clickMe();
    })
});





/* const clickMe = () => {
    alert("Thanks for clicking me. Hope you have a nice day!")
}
$(document).ready(function () {
    $("clickMeButton").click(function(){
        $.ajax({url: "http://localhost:3040", success: function(result){
          $("#div1").html(result);
        }});
      });
    }); */
