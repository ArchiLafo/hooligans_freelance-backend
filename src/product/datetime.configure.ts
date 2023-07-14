export class DatetimeCustomization {
    static customDatetime(datetime) {
        const monthNames = ["января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря"];
        const dater = datetime.day + " " + monthNames[Number(datetime.month) - 1] + " " + datetime.year  + " года " + datetime.hours + ":" + datetime.minutes;
        return dater;
    }
}