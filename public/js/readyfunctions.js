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
	if (year == undefined) { year = Date.today().getFullYear(); }
	if (month == undefined) { month = Date.today().getMonth(); }

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

	var nextMonthButton = $('.calendar header .nextmo');
	nextMonthButton.off('click');
	nextMonthButton.click(function() {
		var nextMonth = today.clearTime().moveToFirstDayOfMonth().add(1).months();
		updateCalendar(
			nextMonth.getFullYear(),
			nextMonth.getMonth()
		);
	});

	var prevMonthButton = $('.calendar header .prevmo');
	prevMonthButton.off('click');
	prevMonthButton.click(function() {
		var lastMonth = today.clearTime().moveToFirstDayOfMonth().add(-1).months();
		updateCalendar(
			lastMonth.getFullYear(),
			lastMonth.getMonth()
		);
	});
};