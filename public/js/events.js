$(document).ready(function() {
	$.each($('.unformatted_time'), function(idx, time) {
		time = $(time);

		time.text(new Date(time.attr('time')).toString('hh:mm tt'))
	});

	$.each($('.unformatted_date'), function(idx, date) {
		date = $(date);

		date.text(new Date(date.attr('date')).toString('MM-dd-yyyy'));
	});
});