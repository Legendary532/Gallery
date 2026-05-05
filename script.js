$('.remove-btn').click(function() {
  var confirmRemove = confirm("Are you sure you want to remove this image?");
  if (confirmRemove) {
    $(this).parent('.col-4').fadeOut(500, function() {
      $(this).remove();
    });
  }
});
$('#file-input').change(function(event) {
  var file = event.target.files[0];
  var formData = new FormData();
  formData.append('file', file);

  $.ajax({
    url: '/upload', // Replace with your server URL
    type: 'POST',
    data: formData,
    contentType: false,
    processData: false,
    success: function(response) {
      console.log('Image uploaded successfully!');
      // Optionally, you can display the uploaded image on the page
      var uploadedImageURL = response.imageURL; // Assuming your server returns the image URL
      $('#image-preview-container').html('<img src="' + uploadedImageURL + '">');
    },
    error: function() {
      alert('Error uploading the image!');
    }
  });
});
$(document).ready(function() {
  // Filtering images based on the selected category
  $(".filter-button").click(function() {
      var filter = $(this).data("filter");

      // Remove the active class from all filter buttons and add it to the clicked one
      $(".filter-button").removeClass("active");
      $(this).addClass("active");

      // Filter images based on the selected category
      if (filter === "all") {
          $(".col-4").show(); // Show all images if "All" is selected
      } else {
          $(".col-4").each(function() {
              if ($(this).data("category") === filter) {
                  $(this).show(); // Show image if it matches the filter
              } else {
                  $(this).hide(); // Hide image if it doesn't match the filter
              }
          });
      }
  });
});
