"use sctrict";

function storageGet() {
  var localGet = localStorage.getItem("asocialStore");
  var localParse = JSON.parse(localGet);
  return localParse;
}
var storGet = storageGet()

function storageSet(fn) {
  localStorage.setItem("asocialStore", JSON.stringify(fn));
}

function storageChecker() {
  var get = localStorage.getItem("asocialStore");
  var parse = JSON.parse(get);

  if (!parse || !parse.length) {
      var array = [];
      localStorage.setItem("asocialStore", JSON.stringify(array));
  };
};

// function cartDisplay(fn) {
//     var qty = 0;
//     for (item in fn) {
//         qty += parseInt(fn[item].qty)
//     };
//     // $('#cartDisplay').empty();
//     // $('#cartDisplay').append('<span id="cartDisplay"></span>');
//     $('#cartDisplay').text("cart" + " / " + qty + "");
// };

function cartDisplay() {
  var localGet = localStorage.getItem("asocialStore");
  var localParse = JSON.parse(localGet);

    var qty = 0;
    for (item in localParse) {
        qty += parseInt(localParse[item].qty)
    };
    // $('#cartDisplay').empty();
    // $('#cartDisplay').append('<span id="cartDisplay"></span>');
    $('#cartDisplay').text("cart" + " / " + qty + "");
    $('.slicknav_nav li:last-child a').text("cart" + " / " + qty + "");
};

function totalCalc() {
        var get = localStorage.getItem("asocialStore");
        var localParse = JSON.parse(get);

        var ttl = 0;
        var ttlQtyItem = 0;
        for (key in localParse) {
              ttlQtyItem = localParse[key].qty * localParse[key].price
              ttl += ttlQtyItem;
        };

        $('#total').empty();
        $('#total').append(ttl);
};

// function updateTableNumeration() {
//       $('input[name=cartNo]').each(function(i) {
//             $(this).val(i++)
//       });
// };

function cartIsEmpty(fn) {
  if(fn.length === 0) {
    $('#cartBody').append('<span id="cartIsEmpty">Your cart is empty</span>');
    $('#cartBody').append('<span id="supSon"> ¯\\_(ツ)_/¯</span>');
    $('hr').remove();
    $('#clearStorage').remove();
    $('#customerInfo').remove();

  }
}

function thankForPurchase() {
  $('.wrapper').append('<span id="cartIsEmpty">Thank you for your order!</span>');
  $('.wrapper').append('<img src="http://i.imgur.com/6yjBDPb.gif" alt=""/>');
  $('hr').remove();
  $('#productsInCart').remove();
  $('#clearStorage').remove();
  $('#customerInfo').remove();
}

//One product page
$(function() {

    //Storage check on page load
    storageChecker();
    cartDisplay()


    $("#addToCart").on('submit', function(event) {

        event.preventDefault();

        $('#addtocart').attr('value', 'Added to cart')

        //local storage check on button click
        storageChecker();

        //Transforming form to object and adding sizeName to check localStorage for duplication
        var serialized = $(this).serializeArray();
        cartItem = {};
        $.each(serialized, function() {
            cartItem[this.name] = this.value;
        });

        cartItem.sizeName = cartItem.product + cartItem.size;
        var pic = $('.shopItemPic').attr('src');
        cartItem.src = pic;

        var localStorageGet = localStorage.getItem("asocialStore");
        var localStorageParse = JSON.parse(localStorageGet);
        var localStorageLength = localStorageParse.length
        var dupl = false;

        if (!localStorageLength) {
            localStorageParse.push(cartItem);
        } else {
            for (key in localStorageParse) {
                if (localStorageParse[key].sizeName == cartItem.sizeName) {
                    localStorageParse[key].qty = parseInt(localStorageParse[key].qty) + 1
                    dupl = true;
                }
            };

            if (!dupl) localStorageParse.push(cartItem);

        };



        var cartNo = 0;
        for(item in localStorageParse){
          localStorageParse[item].cartNo = cartNo;
          cartNo += 1;
        };


        localStorage.setItem("asocialStore", JSON.stringify(localStorageParse));

        cartDisplay()
    });



//Cart Page
(function cartPage() {

        //initial opacity = 0. if cart is not empty then customerInfo form loads in 0.4s
        $('#customerInfo').animate({opacity: 1}, 400);
        cartIsEmpty(storageGet());

        var local = localStorage.getItem("asocialStore");
        var localReady = JSON.parse(local)

        if(localReady.length !== 0) {

                var totalQtyItem = 0;
                var total = 0;
                for (key in localReady) {
                    totalQtyItem = localReady[key].qty * localReady[key].price
                    total += totalQtyItem;

                    $('#productsInCart').append('<div class="itemInCart" id="' + localReady[key].cartNo +'">')
                    $('#' + localReady[key].cartNo).attr('id', localReady[key].cartNo)
                    $('#' + localReady[key].cartNo).append('<div class="cartItemImage>' +'"><img class="shopItemPic"' +
                     ' src="' + localReady[key].src + '" alt=""></div>');
                    $('#' + localReady[key].cartNo).append('<span class="productTitlePrice" id="productTitle">'
                    + localReady[key].product + '</span><br>');
                    $('#' + localReady[key].cartNo).append('<span id="cartSize">Size: ' + localReady[key].size +
                      '</span>');
                    $('#' + localReady[key].cartNo).append('<div style="clear: left"></div>');
                    $('#' + localReady[key].cartNo).append('<span id="qty">Quantity: ' + localReady[key].qty +
                      '</span>');
                      $('#' + localReady[key].cartNo).append('<div>' +
                      '<form class="removeForm"><input type="submit" class="remover" name="remover" value="Remove"></form>' +
                        '</div>');
                      $('#' + localReady[key].cartNo).append('  <div style="clear: left"></div>');
                      $('#' + localReady[key].cartNo).append('<span class="" id="productPrice">Price: ' +
                        localReady[key].price + ' ₽' + '</span><br></div>');
                };

                $('#productsInCart').append('<hr>');
                $("table").append('<tr><td></td><td></td><td></td><td id="total"></td><td><form id="clearStorage">' +
                '<input type="submit" name="clearStorage" value="Clear"></form></td></tr>')
                totalCalc();
        };
  })();


    $("#clearStorage").on('submit', function(event) {
        event.preventDefault();

        localStorage.removeItem("asocialStore");

        $('#productsInCart').children().remove();
        cartIsEmpty(storageCheck);
        cartDisplay()
    });


// Item in cart remover
    $('.removeForm').on("submit", function(event) {

        event.preventDefault();

        var id = $(this).parents('.itemInCart').attr('id')
        $(this).parents('#' + id).remove();


      (function updateViewCartNumbering() {
        var i = 0;
      $('.itemInCart').each(function(i) {
            $(this).attr('id', i++)
          });
      })();

      function getSet(fn) {
          fn.splice(id, 1);
          var number = 0;
          for(item in fn) {
            fn[item].cartNo = number;
            number++;
          };
        storageSet(fn);
      };

      getSet(storageGet());

        cartIsEmpty(storageGet());
        totalCalc();
        cartDisplay()

        // document.location.reload(true);
    });

    $('#customerInfo').on('submit', function(event) {

        event.preventDefault();

        var email = $('#3').val().toString();
        var phone = $('#4').val().toString();
        var address = $('#5').val().toString();
        var city = $('#7').val().toString();
        var country = $('#country').val().toString();
        var paymentMethod = $('#paymentMethod').val().toString();


          $('.removeForm').remove();
          // $('span').wrap('<style>* {font-family: monospace}</style>')
          var messageHtml = $('#productsInCart').html();

          console.log(messageHtml);

          localStorage.removeItem("asocialStore");

          thankForPurchase();

              // $("#customerInfo").on('submit', function(event) {
              //     event.preventDefault();
              //
              //     var array = $(this).serializeArray();
              //     var obj = {};
              //     $.each(array, function() {
              //         obj[this.name] = this.value;
              //     });
              //     console.log(obj);
              //     $(".hiddenDiv").append(obj["first name"]);
              // });


          // emailjs.send("gmail", "template_test", {
          //     to_email: email,
          //     from_name: "Bibik Store",
          //     email_html: email,
          //     message_html: messageHtml,
          //     phone_html: phone,
          //     address_html: address,
          //     city_html: city,
          //     country_html: country,
          //     paymethod_html: paymentMethod
          // });

          // Payment Method: {{{paymethod_html}}}
          //
          // Email Address: {{{email_html}}}
          //
          // Phone: {{{phone_html}}}
          //
          // Address: {{{address_html}}}
          //
          // City : {{{city_html}}}
          //
          // Country: {{{country_html}}}



    });

});







    // $("#customerInfo").on('submit', function(event) {
    //     event.preventDefault();
    //
    //     var array = $(this).serializeArray();
    //     var obj = {};
    //     $.each(array, function() {
    //         obj[this.name] = this.value;
    //     });
    //     console.log(obj);
    //     $(".hiddenDiv").append(obj["first name"]);
    // });
