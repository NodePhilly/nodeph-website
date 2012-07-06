$(document).ready(function(){
	updateCalendar();

	$('.feature').tinycarousel({ 
		pager: true,
		animation: true,
		controls: false,
		interval: true,
		intervaltime: 5000
	});
});

function updateCalendar(year, month) {
	if (!year) { year = Date.today().getFullYear(); }
	if (!month) { month = Date.today().getMonth(); }

	var today = new Date(year, month, 1)
	  , firstDayOfMonth = today.moveToFirstDayOfMonth()
	  , daysInMonth = Date.getDaysInMonth(today.getYear(), today.getMonth())
	  , monthName = today.getMonthName()
	  , fullYear = today.getFullYear();
	
	$('.calendar header h1').text(monthName + ' - ' + fullYear);

	var dates = $('.the-calendar li[name="adate"]')
		, day = firstDayOfMonth.getDay()
	  , dayOfMonth = 0;

	$.each(dates, function(idx, value) {
		if (idx >= day && dayOfMonth < daysInMonth) {
			$(value).attr('rel', ++dayOfMonth);
		} else {
			$(value).attr('rel', '');
		}
	});
};