<!DOCTYPE html>
<html>

<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>BIBIK</title>
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.2/jquery.min.js"></script>
  <script src="http://cdnjs.cloudflare.com/ajax/libs/modernizr/2.6.2/modernizr.min.js"></script>
  <script type="text/javascript" src="https://cdn.emailjs.com/dist/email.min.js"></script>
  <script type="text/javascript">
      (function() {
          emailjs.init("user_3Ys230jJDU6d7AJKuuApa");
      })();
  </script>
   <?php echo css('assets/css/style.css') ?>
   <?php echo css('assets/css/slicknav.css') ?>
   <?php echo js('assets/js/cart.js') ?>
</head>

<body id="cartBody">
    <div class="wrapper">
      <?php snippet('header') ?>
        <div id="productsInCart">
            <!-- <div id="cartItemImage"></div>
            <div id="cartDescription">
            <span class="productTitlePrice" id="productTitle"></span>
            <br>
            <span class="productTitlePrice" id="productPrice"></span>
            <br>
            <span id="qty">Quantity: </span>
            <span id="totalQtyItem">Subtotal: </span> -->
        </div>
        <div id="checkout">

        </div>
        <!-- <form id="clearStorage">
            <input type="submit" name="clearStorage" value="Clear Cart">
        </form> -->

        <form id="customerInfo">

              <div class="customerInfoDiv">
                 <label for="1" class="checkoutTitles">Name</label>
                 <input type="text" class="inputField" name="first name" id="1">
              </div>

            <div class="customerInfoDiv">
              <label for="2" class="checkoutTitles">Last Name</label>
              <input type="text" class="inputField" name="last name" id="2">
            </div>

            <div class="customerInfoDiv">
              <label for="3" class="checkoutTitles">email</label>
              <input type="email" class="inputField" name="email" id="3">
            </div>

            <div class="customerInfoDiv">
              <label for="4" class="checkoutTitles">phone</label>
              <input type="text" class="inputField" name="phone" id="4">
            </div>

            <div class="customerInfoDiv">
                <label for="5" class="checkoutTitles">address</label>
              <input type="text" class="inputField" name="address" id="5">
            </div>

            <div class="customerInfoDiv">
              <label for="6" class="checkoutTitles">zip</label>
              <input type="text" class="inputField" name="zip" id="6">
            </div>

            <div class="customerInfoDiv">
              <label for="7" class="checkoutTitles">city</label>
              <input type="text" class="inputField" name="city" id="7">
            </div>

            <div class="customerInfoDiv">
              <label class="checkoutTitles" for="country">country</label>
            <select class="inputField" id="country">
                <option value="RUS">Russian Federation</option>
                <option value="USA">United States</option>
            </select>
            </div>
            <input type="submit" value="Place Order" id="placeOrder">
        </form>





      </div>
    </div>

    <?php echo js('assets/js/jquery.slicknav.js') ?>
    <script type="text/javascript">
    $(document).ready(function(){
    	$('#menu').slicknav();
    });
    </script>
</body>
</html>
