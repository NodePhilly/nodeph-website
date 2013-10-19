$(function() {
  $('#pay').click(function() {
    var token = function(res){
      var $input = $('<input type="hidden" name="stripeToken" />').val(res.id);
      $('form').append($input).submit();
    };

    StripeCheckout.open({
      key: 'pk_live_MQhN5CuHpu9maQ07HQlVpFMB',
      address: true,
      amount: $('select[name="amount"]').val(),
      name: 'Node Philly Sponsorship',
      panelLabel: 'Checkout',
      token: token
    });

    return false;
  });
});