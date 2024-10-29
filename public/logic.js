$(function () {
  $("#button").on("click", function () {
    var data = {
      name: $("#name").val(),
      amount: $("#amount").val(),
    };

    $.ajax({
      type: "POST",
      url: "/api/pills",
      data: data,
      success: function (response) {
        console.log("Data inserted successfully:", response);
      },
      error: function (error) {
        console.error("Error inserting data:", error);
      },
    });
  });
});
