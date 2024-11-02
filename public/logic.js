$(function () {
  var data = {
    name: $("#name").val(),
    amount: $("#amount").val(),
  };

  $("#myForm").on("submit", function (event) {
    event.preventDefault();
    const formData = {
      name: $('input[name="name"]').val(),
      amount: $('input[name="amount"]').val(),
    };

    $.ajax({
      type: "POST",
      url: "http://localhost:3000/submit",
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

  let counter = 1;

  function displayData(data) {
    const container = $("#data-container");
    container.empty(); // Clear previous content

    $.each(data, function (index, item) {
      $("#data-container").append(
        `
        <tr><td>${item.name}</td><td>${
          item.amount
        }</td><td><button class="delete-button" data-index="${counter++}">X</button></tr>
        `
      );
    });
  }

  $("#data-container").on("click", ".delete-button", function () {
    const id = $(this).data("index"); // Get the index from the button
    console.log("Deleting item with ID:", id);

    $.ajax({
      url: `/api/pills/${id}`, // Replace with your actual API endpoint
      type: "DELETE",
      success: function (response) {
        // Optionally, you can handle the response
        console.log("Item deleted successfully:", response);
        // Refresh the data display
        fetchData(); // Call a function to refresh your data
      },
      error: function (error) {
        console.error("Error deleting item:", error);
        alert("Could not delete the item. Please try again.");
      },
    });
  });

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
