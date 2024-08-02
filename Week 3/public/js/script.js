
const clickMe = () => {
    alert("Thanks for clicking me. Hope you have a nice day!")
}
$(document).ready(function () {
    // $('.materialboxed').materialbox();
    $('#clickMeButton').click(() => {
        clickMe();
    })
});


// Open the modal
function openModal() {
    document.getElementById('simpleModal').style.display = 'block';
  }
  
  // Close the modal
  function closeModal() {
    document.getElementById('simpleModal').style.display = 'none';
  }
  
  // Close the modal when clicking outside of it
  window.onclick = function(event) {
    var modal = document.getElementById('simpleModal');
    if (event.target == modal) {
      modal.style.display = 'none';
    }
  }
  
  // Handle item click
  document.querySelectorAll('.product-list li').forEach(item => {
    item.addEventListener('click', function() {
      alert('You selected: ' + this.textContent);
      closeModal();
    });
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
