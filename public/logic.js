$(function () {
  var data = {
    name: $("#name").val(),
    amount: $("#amount").val(),
  };

  // $.ajax({
  //   type: "GET",
  //   url: "/api/pills",
  //   data: data,
  //   success: function (response) {
  //     console.log("Data retrieved successfully:", response);
  //   },
  //   error: function (error) {
  //     console.error("Error inserting data:", error);
  //   },
  // });

  $("#fetch-button").click(function () {
    fetchData();
  });

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
      const div = $("<div></div>").text(`Name: ${item.name}, Amount: ${item.amount}`);
      container.append(div);
    });
  }

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
