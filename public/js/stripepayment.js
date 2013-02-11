

$(function() {
  $('#sponsorship').submit(function(event) {
    $('#card-number-error').text("");
    $('#card-expiry-error').text("");
    $('#card-cvc-error').text("");
    $('#unexpected-stripe-payment-error-error').text("");

    // Disable the submit button to prevent repeated clicks
    $('.submit-button').prop('disabled', true);

// these are just the required fields - name and address details are optional
    Stripe.createToken({
      number: $('.card-number').val(),
      cvc: $('.card-cvc').val(),
      exp_month: $('.card-expiry-month').val(),
      exp_year: $('.card-expiry-year').val()
    }, stripeResponseHandler);

    // Prevent the form from submitting with the default action
    return false;
  });
});


function stripeResponseHandler(status, response) {
  if (response.error) {
    // Show the errors on the form
    // https://stripe.com/docs/api#errors
    var errElementId;
    switch(response.error.code) {
      case 'incorrect_number':
      case 'invalid_number':
        errElementId = '#card-number-error';
        break;
      case 'invalid_expiry_month':
      case 'invalid_expiry_year':
      case 'expired_card':
        errElementId = '#card-expiry-error';
        break;
      case 'invalid_cvc':
      case 'incorrect_cvc':
        errElementId = '#card-cvc-error';
        break;
      default:
        errElementId = '#card-error';
    }

    $(errElementId).text(response.error.message);
    $('.submit-button').prop('disabled', false);
  } else {
    var $form = $('#sponsorship');
    // token contains id, last4, and card type
    var token = response.id;
    // Insert the token into the form so it gets submitted to the server
    $form.append($('<input type="hidden" name="stripeToken" />').val(token));
    // and submitl
    $form.get(0).submit();
  }
}
