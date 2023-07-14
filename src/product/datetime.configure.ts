export class DatetimeCustomization {
    static customDatetime(year, month, day, hours, minutes) {
        const monthNames = ["января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря"];
        const datetime = day + " " + monthNames[Number(month)] + " " + year  + " года " + hours + ":" + minutes;
        return datetime;
    }
}