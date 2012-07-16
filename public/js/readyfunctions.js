$(document).ready(function(){
	updateCalendar();

	$('.feature').tinycarousel({ 
		pager: true,
		animation: true,
		controls: false,
		interval: true,
		intervaltime: 5000
	});

	var socket = io.connect('/');
	
	socket.on('tweet', function(tweet) {
		var text = linkifyUrls(tweet.text);
		text = linkifyHashTags(text);
		text = linkifyUserHandles(text);

		$('.tweets').append('\
			<section class="the-tweet">\
				<a href="https://www.twitter.com/' + tweet.from_user + '" class="username">@' + tweet.from_user + '</a>' + text + '\
			</section>\
		');
	});
});

function linkifyUrls(text) {
  var exp = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
  return text.replace(exp, '<a href="$1" target="_blank">$1</a>');
};

function linkifyHashTags(text) {
	var exp = /#(\w+)/ig;
	return text.replace(exp, '<a href="https://twitter.com/#!/search/%23$1" target="_blank">#$1</a>');
};

function linkifyUserHandles(text) {
	var exp = /@(\w+)/ig;
	return text.replace(exp, '<a href="https://twitter.com/$1" target="_blank">@$1</a>');
};

function findAll(list, predicate) {
	var results = [];

	list.forEach(function(item) {		
		if (predicate(item)) {
			results.push(item);
		}
	});

	return results;
};

function updateCalendar(year, month, callback) {
	if (year == undefined) { year = Date.today().getFullYear(); }
	if (month == undefined) { month = Date.today().getMonth(); }

	// TODO: ajax get events
	$.get('/events/' + year + '/' + month, function(events) {
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
				var date = new Date(year, month, dayOfMonth)
				  , todaysEvents = findAll(events, function(e) {
					  	return e.date == date.getTime();
					  });

				$(value).attr('rel', ++dayOfMonth)
								.attr('date', date.getTime());

				if (todaysEvents.length > 0) {
					todaysEvents.forEach(function(event) {
						$(value).append('<span>X</span>');
					});					
				} 
				
				$(value).data('events', todaysEvents);				
			} else {
				$(value).attr('rel', '')
								.attr('date', '')
								.data('events', [])
								.children().remove();		
			}

			$(value).off('click')
							.click(function() {
								$('.calendar2 .the-feature').children().remove();
								$(value).data('events').forEach(function(event) {
									$('.calendar2 .the-feature').append('<h1>' + event.title + '</h1>')
																							.append('<div><span class="time">' + event.startTime + '</span> - <span class="time">' + event.endTime + '</span></div>')
																							.append('<p>' + event.description + '</p>');
								});
							});
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
	});
};