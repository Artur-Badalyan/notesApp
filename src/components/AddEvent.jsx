import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DatetimeInput from './DatetimeInput';
import moment from 'moment';
import '../assets/styles/AddEvent.css';
import { IoIosArrowBack } from 'react-icons/io';

const AddEvent = ({ thisDay, setThisDay, selectedDate, setSelectedDate }) => {
  const [newHeader, setNewHeader] = useState('');
  const [newText, setNewText] = useState('');
  const [dayColor, setDayColor] = useState('black');
  const [closestDay, setClosestDay] = useState(selectedDate);






  const dispatch = useDispatch();
  const events = useSelector((store) => {
    return store.events;
  });

  const colors = ['#FF784E', '#4E7FFF', '#44b36b', '#FF4E4E', '#c4af4d'];
  const bgColor = colors[Math.floor(Math.random() * colors.length) + 1];

  const handleInputChange = (e) => {
    const inputText = e.target.value.toLowerCase();
    if(inputText.includes('сегодня')){
      const nextDay = moment();
      setThisDay(nextDay);
    } else if (inputText.includes('завтра')) {
      const nextDay = moment().add(1, 'days');
      setThisDay(nextDay);
    } else if (inputText.includes('понедельник')) {
      let nextDay = moment().startOf('week').add(1, 'days');
      if(nextDay.isBefore(moment())) {
        nextDay = moment().endOf('week').add(2, 'days');
        setThisDay(nextDay);
      } else {
        setThisDay(nextDay);
      }
    } else if (inputText.includes('вторник')) {
      let nextDay = moment().startOf('week').add(2, 'days');
      if(nextDay.isBefore(moment())) {
        nextDay = moment().endOf('week').add(3, 'days');
        setThisDay(nextDay);
      } else {
        setThisDay(nextDay);
      }
    } else if (inputText.includes('среду')) {
      let nextDay = moment().startOf('week').add(3, 'days');
      if(nextDay.isBefore(moment())) {
        nextDay = moment().endOf('week').add(4, 'days');
        setThisDay(nextDay);
      } else {
        setThisDay(nextDay);
      }
    } else if (inputText.includes('четверг')) {
      let nextDay = moment().startOf('week').add(4, 'days');
      if(nextDay.isBefore(moment())) {
        nextDay = moment().endOf('week').add(5, 'days');
        setThisDay(nextDay);
      } else {
        setThisDay(nextDay);
      }
    } else if (inputText.includes('пятницу')) {
      let nextDay = moment().startOf('week').add(5, 'days');
      if(nextDay.isBefore(moment())) {
        nextDay = moment().endOf('week').add(6, 'days');
        setThisDay(nextDay);
      } else {
        setThisDay(nextDay);
      }
    } else if (inputText.includes('субботу')) {
      let nextDay = moment().startOf('week').add(6, 'days');
      if(nextDay.isBefore(moment())) {
        nextDay = moment().endOf('week').add(7, 'days');
        setThisDay(nextDay);
      } else {
        setThisDay(nextDay);
      }
    } else if (inputText.includes('воскресение')) {
      let nextDay = moment().startOf('week').add(7, 'days');
      if(nextDay.isBefore(moment())) {
        nextDay = moment().endOf('week').add(0, 'days');
        setThisDay(nextDay);
      } else {
        setThisDay(nextDay);
      }
    }

    let text = document.querySelector('.header_text').innerHTML = e.target.value
    if(text.includes('понедельник')) {
      document.querySelector('.header_text').innerHTML = `${e.target.value.split(' понедельник')[0]} <span>понедельник</span> ${e.target.value.split(' понедельник')[1]}`
    } else if(text.includes('вторник')) {
      document.querySelector('.header_text').innerHTML = `${e.target.value.split(' вторник')[0]} <span>вторник</span> ${e.target.value.split(' вторник')[1]}`
    } else if(text.includes('среду')) {
      document.querySelector('.header_text').innerHTML = `${e.target.value.split(' среду')[0]} <span>среду</span> ${e.target.value.split(' среду')[1]}`
    } else if(text.includes('четверг')) {
      document.querySelector('.header_text').innerHTML = `${e.target.value.split(' четверг')[0]} <span>четверг</span> ${e.target.value.split(' четверг')[1]}`
    } else if(text.includes('пятницу')) {
      document.querySelector('.header_text').innerHTML = `${e.target.value.split('пятницу')[0]} <span>пятницу</span> ${e.target.value.split(' пятницу')[1]}`
    } else if(text.includes('субботу')) {
      document.querySelector('.header_text').innerHTML = `${e.target.value.split(' субботу')[0]} <span>субботу</span> ${e.target.value.split(' субботу')[1]}`
    } else if(text.includes('воскресение')) {
      document.querySelector('.header_text').innerHTML = `${e.target.value.split(' воскресение')[0]} <span>воскресение</span> ${e.target.value.split(' воскресение')[1]}`
    } else if(text.includes('сегодня')) {
      document.querySelector('.header_text').innerHTML = `${e.target.value.split(' сегодня')[0]} <span>сегодня</span> ${e.target.value.split(' сегодня')[1]}`
    } else if(text.includes('завтра')) {
      document.querySelector('.header_text').innerHTML = `${e.target.value.split(' завтра')[0]} <span>завтра</span> ${e.target.value.split(' завтра')[1]}`
    }

    setNewHeader(e.target.value);
  };

  return (
    <div className="AddEvent close">
      <div className="add_event-bg"></div>
      <div className="container">
        <div className="add_event-top">
          <button
            className="back"
            onClick={() => {
              document.querySelectorAll('.calendar-item').forEach((item) => {
                item.classList.remove('calendar_item-popup');
              });
              document.querySelector('.AddEvent').classList.remove('close');
              document.querySelector('.popup').classList.remove('show');
              document.querySelector('.blur').style.opacity = 0;
              document.querySelector('.blur').style.transform = 'scale(0)';
              document.querySelector('.RightBar').style.zIndex = 4;
              document.querySelector('.AddEvent').classList.add('close');
              setThisDay(moment());
              setNewHeader('');
              setNewText('');
            }}
          >
            <IoIosArrowBack />Назад
          </button>
          <button
            className="add"
            onClick={() => {
              dispatch({
                type: 'ADD-NEW-EVENT',
                payload: {
                  header: newHeader,
                  text: newText,
                  date: selectedDate.format('DD.MM.YYYY'),
                  time: selectedDate.format('HH:mm'),
                  bgColor: bgColor,
                },
              });
              document.querySelector('.AddEvent').classList.add('close');
              document.querySelector('.blur').style.opacity = 0;
                document.querySelector('.blur').style.transform = 'scale(0)';
            }}
          >
            Добавить
          </button>
          <div className="date">
            <DatetimeInput
              selectedDate={selectedDate}
              setThisDay={setThisDay}
              thisDay={thisDay}
              onChange={(date) => {
                setClosestDay(date)
                setSelectedDate(date)
              }}
            />
          </div>
        </div>
        <div className="header">
          <p className="header_text"></p>
          <input
            type="text"
            value={newHeader}
            placeholder="Заголовок"
            onInput={handleInputChange}
          />
        </div>
        <div className="text">
          <textarea
            name=""
            id=""
            cols="30"
            rows="10"
            value={newText}
            placeholder="О чем напомнить?"
            onInput={(e) => {
              setNewText(e.target.value);
            }}
          ></textarea>
        </div>
      </div>
    </div>
  );
};

export default AddEvent;
