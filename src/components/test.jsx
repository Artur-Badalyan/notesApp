import { useState, useEffect } from 'react';
import '../assets/styles/CalendarPage.css';
import { BiLeftArrow, BiRightArrow } from 'react-icons/bi';
import moment from 'moment/moment';
import { useSelector } from 'react-redux';

const CalendarPage = () => {
  const [today, setToday] = useState(moment());
  const [toDayEvents, setToDayEvents] = useState([]);

  const isWeekend = true;
  const months = [
    'Январь',
    'Февраль',
    'Март',
    'Апрель',
    'Май',
    'Июнь',
    'Июль',
    'Август',
    'Сентябрь',
    'Октябрь',
    'Ноябрь',
    'Декабрь',
  ];

  const isSelectedMonth = (day) => today.isSame(day, 'month');
  const day = today.clone().startOf('month').startOf('week').subtract(0, 'day');
  const calendar = [...Array(35)].map(() => day.add(1, 'day').clone());

  const prevHandler = () => {
    setToday((prev) => prev.clone().subtract(1, 'month'));
  };

  const todayHandler = () => {
    setToday(moment());
  };

  const nextHandler = () => {
    setToday((prev) => prev.clone().add(1, 'month'));
    checkToDayEvent(today.clone().add(1, 'month'));
  };

  const events = useSelector((store) => {
    return store.events;
  });

  useEffect(() => {
    calendar.forEach((item) => {
      checkToDayEvent(item);
    });
  }, [today]);

  const checkToDayEvent = (item) => {
    const filteredEvents = events.filter(
      (event) => item.format('DD.MM.YYYY') === event.date
    );
    setToDayEvents((prev) => [...prev, filteredEvents]);
  };

  return (
    <div className="CalendarPage">
      <div className="wrapper">
        <div className="top-panel">
          <h1 className="today">
            {months[today.month()]} <span>{today.format('YYYY')}</span>
          </h1>
          <div className="change-month">
            <button className="prev-month" onClick={prevHandler}>
              <BiLeftArrow />
            </button>
            <button className="current-month" onClick={todayHandler}>
              Текущий
            </button>
            <button className="next-month" onClick={nextHandler}>
              <BiRightArrow />
            </button>
          </div>
        </div>
        <div className="days">
          <p>Пн</p>
          <p>Вт</p>
          <p>Ср</p>
          <p>Чт</p>
          <p>Пт</p>
          <p className="weekend">Сб</p>
          <p className="weekend">Вс</p>
        </div>
        <div className="calendar">
          {calendar &&
            calendar.map((item, idx) => (
              <div
                key={idx}
                className={`calendar-item ${
                  item.format('DD-MM-YYYY') === moment().format('DD-MM-YYYY')
                    ? 'today'
                    : ''
                } ${item.day() === 6 || item.day() === 0 ? 'isWeekend' : ''} ${
                  !isSelectedMonth(item) ? 'selected-month' : ''
                }`}
              >
                {item.format('D')}
                {console.log(toDayEvents)}
                {toDayEvents[idx] && (
                  <div className="today-events">
                    {toDayEvents[idx].map((event, index) => (
                      <p key={index} className='event-item' style={{backgroundColor: event.bgColor}}>{event.header} {toDayEvents[idx].length > 1 &&  <span>+{toDayEvents[idx].length}</span>}</p>
                    ))}
                  </div>
                )}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default CalendarPage;
