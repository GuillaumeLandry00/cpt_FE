import React from 'react';
import moment from "moment";

const Calendar = () => {
    const value = moment();
    const startDay = value.clone().startOf("month").startOf("week");
    const endDay = value.clone().endOf("month").endOf("week");
    const day = startDay.clone().subtract(1, "day");
    const calendar = [];
    return (<p>{startDay.format("DD/MM")}</p>);
}

export default Calendar;