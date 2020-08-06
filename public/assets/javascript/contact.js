$("#submitContact").on("click", postContent);
$("#clearForm").on("click", clearForm);
$('#showMessage').hide();
function postContent() {
  if (
    $("#name").val().trim() !== "" &&
    $("#email").val().trim() !== "" &&
    $("#subject").val().trim() !== "" &&
    $("#message").val().trim() !== ""
  ) {
    var contact = {
      name: $("#name").val().trim(),
      email: $("#email").val().trim(),
      subject: $("#subject").val().trim(),
      message: $("#message").val().trim(),
    };
    $.ajax("/api/contact", {
      type: "POST",
      data: contact,
    }).then(function () {
      $('#showMessage').show();      
    });
  }
}

function clearForm()
{
    $("#name").val("");
    $("#email").val("");
    $("#subject").val("");
    $("#message").val("");
    $('#showMessage').hide();
}