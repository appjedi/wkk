const imgSlideTime = 3500; // 3 seconds in miliseconds
let imgSlideImages = [];
let imageIndex = 0;

// setup and start
function setupSlideShow(imageArray) {
    // cleanup string
    let temp = imageArray;
    temp = temp.replace('[', '');
    temp = temp.replace(']', '');
    temp = temp.replace(/["]+/g, '');

    imgSlideImages = temp.split(',');
    changeSlideShowImage();
}

// function to change the slideshow image
function changeSlideShowImage() {
  // $('#imgSlide').hide();
  $('#imgSlide').attr('src', imgSlideImages[imageIndex]);
  $('#imgSlide').fadeIn("slow");
  //document.getElementById('imgSlide').src = imgSlideImages[imageIndex];
  if (imageIndex < imgSlideImages.length - 1) {
    imageIndex++;
  } else {
    imageIndex = 0; 
  }

  setTimeout (changeSlideShowImage, imgSlideTime );
}

// Send Email validation 
var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,6})?$/;
$( '#sendemailemail' )
  .focusout(function() {
    let valid = false; 
    valid = emailReg.test(this.value);
    
    if (valid) {
      $('#sendemailemailValid').removeClass('d-none');
      $('#sendemailemailInvalid').addClass('d-none');
    } else {
      $('#sendemailemailInvalid').removeClass('d-none');
      $('#sendemailemailValid').addClass('d-none');
    }

  })

  // lazy load youtube videos



var youtube = document.querySelectorAll( ".youtube" );

for (var i = 0; i < youtube.length; i++) {
  
  var source = "https://img.youtube.com/vi/"+ youtube[i].dataset.embed +"/mqdefault.jpg";
  
  var image = new Image();
      image.src = source;
      image.addEventListener( "load", function() {
        youtube[ i ].appendChild( image );
      }( i ) );
  
      youtube[i].addEventListener( "click", function() {

        var iframe = document.createElement( "iframe" );

            // iframe.setAttribute( "frameborder", "0" );
            // iframe.setAttribute( "allowfullscreen", "" );
            iframe.setAttribute( "src", "https://www.youtube.com/embed/"+ this.dataset.embed +"?rel=0&showinfo=0&autoplay=1" );
            //iframe.setAttribute( "src", this.dataset.embed );
            this.innerHTML = "";
            this.appendChild( iframe );
      } );  
};

