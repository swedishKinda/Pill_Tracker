$(function () {
  var data = {
    name: $("#name").val(),
    amount: $("#amount").val(),
  };

  $("#myForm").on("submit", function (event) {
    event.preventDefault();
    const formData = {
      name: $('input[name="name"]').val(),
      email: $('input[name="amount"]').val(),
    };

    $.ajax({
      type: "POST",
      url: 'http://localhost:3000/submit',
      data: JSON.stringify(formData),
      contentType: "application/json",
      success: function (response) {
        console.log(response);
      },
      error: function (error) {
        console.error("Error:", error);
      },
    });
    fetchData();
  });

  fetchData();

  function fetchData() {
    $.ajax({
      url: "/api/pills",
      method: "GET",
      dataType: "json",
      success: function (data) {
        displayData(data);
      },
      error: function (xhr, status, error) {
        console.error("AJAX Error:", status, error);
      },
    });
  }

  function displayData(data) {
    const container = $("#data-container");
    container.empty(); // Clear previous content

    $.each(data, function (index, item) {
      $("#data-container").append(
        `
        <tr><td>${item.name}</td><td>${item.amount}</td></tr>
        `
      );
    });
  }

  // $("#button").on("click", function () {
  //   var data = {
  //     name: $("#name").val(),
  //     amount: $("#amount").val(),
  //   };

  //   $.ajax({
  //     type: "POST",
  //     url: "/api/pills",
  //     data: data,
  //     success: function (response) {
  //       console.log("Data inserted successfully:", response);
  //     },
  //     error: function (error) {
  //       console.error("Error inserting data:", error);
  //     },
  //   });

  //   fetchData();
  // });
});
