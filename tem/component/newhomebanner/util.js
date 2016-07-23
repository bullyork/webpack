import GregorianCalendarFormat from 'gregorian-calendar-format';
import GregorianCalendar from 'gregorian-calendar';
import localesForCalendar from'gregorian-calendar/lib/locale/zh_CN';

function formatTime(time,format='yyyy-MM-dd H:m:s'){
    let date = new GregorianCalendar(localesForCalendar);
    date.setTime(time);
    let df = new GregorianCalendarFormat(format);
    return df.format(date);
}

export {
	formatTime
}