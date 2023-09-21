import React, { useState, useEffect } from 'react';
import '../assets/styles/CalendarPage.css';
import { BiLeftArrow, BiRightArrow } from 'react-icons/bi';
import moment from 'moment/moment';
import { useSelector } from 'react-redux';
import AddEvent from './AddEvent';
import ViewNotes from './ViewNotes';

const CalendarPage = ({ setThisDay, thisDay, currentEvent, setCurrentEvent }) => {

  const [today, setToday] = useState(moment());
  const [toDayEvents, setToDayEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState();

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

  const day = today.clone().startOf('month').startOf('week').subtract(0, 'day');
  const calendar = [...Array(35)].map(() => day.add(1, 'day').clone());
  const isSelectedMonth = (day) => today.isSame(day, 'month');

  const prevHandler = () => {
    setToday((prev) => prev.clone().subtract(1, 'month'));
  };

  const todayHandler = () => {
    setToday(moment());
  };

  const nextHandler = () => {
    const nextMonth = today.clone().add(1, 'month');
    const nextCalendar = [...Array(35)].map(() => day.add(1, 'day').clone());
    setToday(nextMonth);
    setToDayEvents(getToDayEvents(nextCalendar));
  };

  const events = useSelector((state) => {
    return state.events;
  });

  const getToDayEvents = (calendar) => {
    const eventsByDay = calendar.map((day) => {
      const filteredEvents = events.filter((event) => day.format('DD.MM.YYYY') === event.date);
      return filteredEvents;
    });
    return eventsByDay;
  };

  useEffect(() => {
    setToDayEvents(getToDayEvents(calendar));
  }, [today, events]);

  const handleCalendarItemClick = (date) => {
    setThisDay(moment(date, 'DD-MM-YYYY'));
  };

  return (
    <div className="CalendarPage">
      <div className="blur"
      onClick={() => {
        document.querySelectorAll('.calendar-item').forEach((item) => {
          item.classList.remove('calendar_item-popup');
          item.classList.remove('active');
        });
        document.querySelector('.AddEvent').classList.remove('close');
        document.querySelector('.popup').classList.remove('show');
        document.querySelector('.blur').style.opacity = 0;
        document.querySelector('.blur').style.transform = 'scale(0)';
        document.querySelector('.RightBar').style.zIndex = 4;
        document.querySelector('.AddEvent').classList.add('close');
        setThisDay(moment())
      }}></div>
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
              className={`calendar-item 
                ${
                  item.format('DD-MM-YYYY') === moment().format('DD-MM-YYYY') ? 'today' : ''
                } 
                ${item.day() === 6 || item.day() === 0 ? 'isWeekend' : ''} ${
                !isSelectedMonth(item) ? 'selected-month' : ''}
                ${
                  item.isBefore(moment().add(-1,'day'), day) ? 'prevDays' : ''
                }
                `}
              onClick={(e) => {
                document.querySelectorAll('.calendar-item').forEach((item) => {
                  item.classList.remove('calendar_item-popup');
                  item.classList.remove('active')
                });

                  if(e.target.classList.contains('calendar-item')) {
                    e.target.classList.add('active')
                    e.target.classList.add('calendar_item-popup');
                  } else {
                    e.target.parentElement.parentElement.classList.add('active')
                    e.target.parentElement.parentElement.classList.add('calendar_item-popup');
                  }

                document.querySelector('.blur').style.opacity = 1;
                document.querySelector('.blur').style.transform = 'scale(1)';
                handleCalendarItemClick(item.format('DD-MM-YYYY'));
                document.querySelector('.RightBar').style.zIndex = 1;
              }}
            >
              {item.format('D')}
              {toDayEvents[idx] && (
                <div className="today-events">
                  {toDayEvents[idx].slice(0, 2).map((event, index) => (
                    <p
                      key={index}
                      className="event-item"
                      style={{ backgroundColor: event.bgColor}}
                    >
                      {event.header.length > 7 ? event.header.slice(0, 7) : event.header}
                    </p>
                  ))}
                  {toDayEvents[idx].length > 2 && <span>+{toDayEvents[idx].length - 2}</span>}
                </div>
              )}
              <div className='popup'
              onClick={(e) => {
                e.stopPropagation();
              }}>
                <button
                className='popup-add-btn'
                  onClick={(e) => {
                    document.querySelector('.AddEvent').style.zIndex = 111;
                    document.querySelectorAll('.calendar-item').forEach((item) => {
                      item.classList.remove('calendar_item-popup');
                      item.classList.remove('active');
                    });
                    document.querySelector('.AddEvent').classList.remove('close');
                    document.querySelector('.popup').classList.remove('show');
                    document.querySelector('.blur').style.opacity = 0;
                    document.querySelector('.blur').style.transform = 'scale(0)';
                    document.querySelector('.popup').classList.remove('show');
                    e.target.classList.remove('calendar_item-popup');
                  }}
                >
                  Добавить
                </button>
                {toDayEvents[idx] && (
                <div className="today-events">
                  {toDayEvents[idx].map((event, index) => (
                    <div 
                        key={index}
                        className="event-item-flex"
                        style={{ backgroundColor: event.bgColor }}
                        onClick={() => {
                          setCurrentEvent(event)
                          document.querySelector('.ViewNotes').classList.remove('close')
                          document.querySelectorAll('.calendar-item').forEach((item) => {
                            item.classList.remove('calendar_item-popup');
                            item.classList.remove('active');
                          });
                          document.querySelector('.popup').classList.remove('show');
                          document.querySelector('.blur').style.opacity = 0;
                          document.querySelector('.blur').style.transform = 'scale(0)';
                          document.querySelector('.popup').classList.remove('show');
                        }}
                        >
                      <div className="event-item-left">
                        <p className='event-header'>{event.header.length > 7 ? event.header.slice(0, 7) : event.header}</p>
                        <p className='event-text'>{event.text.length > 7 ? event.header.slice(0, 7) : event.header}</p>
                      </div>
                      <div className="event-item-right">
                        <p>{event.date}</p>
                        <p className='event-time'>{event.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              </div>
            </div>
          ))}
      </div>
      <AddEvent thisDay={thisDay} setThisDay={setThisDay} setSelectedDate={setSelectedDate} selectedDate={thisDay ? moment(thisDay, 'DD-MM-YYYY') : moment()} />
      <ViewNotes events={events} currentEvent={currentEvent} setCurrentEvent={setCurrentEvent}/>
    </div>
  );
};

export default CalendarPage;
