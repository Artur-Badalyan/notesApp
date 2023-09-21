import React from 'react';
import moment from 'moment';

const DatetimeInput = ({ setThisDay, thisDay, selectedDate, onChange }) => {
  const handleChange = (e) => {
    const selectedDate = moment(e.target.value);
    onChange(selectedDate);
    setThisDay(selectedDate); // Обновляем состояние даты в CalendarPage
    console.log(selectedDate.format('YYYY-MM-DDTHH:mm'));
  };

  return (
    <input
      type="datetime-local"
      value={selectedDate.format('YYYY-MM-DDTHH:mm')}
      onChange={handleChange}
    />
  );
};


export default DatetimeInput;