import { useSelector } from 'react-redux';
import '../assets/styles/RightBar.css'
import { useState } from 'react';
import moment from 'moment';

const RightBar = ({thisDayEvents, thisDay, currentEvent, setCurrentEvent}) => {

    const [isUpcomingEvents, setIsUpcomingEvents] = useState(false);

    const allEvents = useSelector((state) => {
        return state.events
    })
    
    const upcomingEvents = [...Array(7)].map((_, index) => {
        return {
          event: allEvents.filter(
            (item) => item.date === moment().add(index, 'day').clone().format('DD.MM.YYYY')
          )
        };
      });
      const todayEvents = allEvents.filter((item) => item.date === moment().format('DD.MM.YYYY'));

    return(
        <div className="RightBar">
            {
                thisDayEvents.length > 0  ? 
                <>
                <div className="buttons">
                        <button className={isUpcomingEvents ? 'todayEvents' : 'todayEvents active'} onClick={() => {setIsUpcomingEvents(!isUpcomingEvents)}}>Сегодняшние </button>
                        <button className={isUpcomingEvents ? 'upcomingEvents active' : 'upcomingEvents'} onClick={() => {setIsUpcomingEvents(!isUpcomingEvents)}}>Ближайшие</button>
                    </div>
                    <h1>События  {thisDay}</h1>
                    <div className='events'>
                        {
                            thisDayEvents ? 
                            thisDayEvents.map((item) =>
                                <div className='event' 
                                style={{ backgroundColor: item.bgColor }} 
                                key={item.id}
                                onClick={() => {
                                    setCurrentEvent(item)
                                    document.querySelector('.ViewNotes').classList.remove('close')
                                    document.querySelectorAll('.calendar-item').forEach((item) => {
                                        item.classList.remove('calendar_item-popup');
                                        item.classList.remove('active');
                                    });
                                    document.querySelector('.popup').classList.remove('show');
                                    document.querySelector('.blur').style.opacity = 0;
                                    document.querySelector('.blur').style.transform = 'scale(0)';
                                    document.querySelector('.popup').classList.remove('show');
                                }}>
                                    <div className="event-top">
                                    <h2 className="event-header">{item.header}</h2>
                                    <div className="date">{item.date}</div>
                                    </div>
                                    <p className="event-text">{item.text}</p>
                                </div>
                            )
                                
                            :''
                        }
                    </div>
                </>
                :
                <>
                    <div className="buttons">
                        <button className={isUpcomingEvents ? 'todayEvents' : 'todayEvents active'} onClick={() => {setIsUpcomingEvents(!isUpcomingEvents)}}>Сегодняшние </button>
                        <button className={isUpcomingEvents ? 'upcomingEvents active' : 'upcomingEvents'} onClick={() => {setIsUpcomingEvents(!isUpcomingEvents)}}>Ближайшие</button>
                    </div>
                    <h1>{isUpcomingEvents ? 'Ближайшие события' : 'Сегодняшние события'}</h1>
                    <div className='events'>
                        {
                            isUpcomingEvents ? 
                            upcomingEvents.map((item) =>
                            item.event.length > 0 ? (
                                item.event.map((item) => (
                                <div className='event' 
                                style={{ backgroundColor: item.bgColor }} 
                                key={item.id}
                                onClick={() => {
                                    setCurrentEvent(item)
                                    document.querySelector('.ViewNotes').classList.remove('close')
                                    document.querySelectorAll('.calendar-item').forEach((item) => {
                                        item.classList.remove('calendar_item-popup');
                                        item.classList.remove('active');
                                    });
                                    document.querySelector('.popup').classList.remove('show');
                                    document.querySelector('.blur').style.opacity = 0;
                                    document.querySelector('.blur').style.transform = 'scale(0)';
                                    document.querySelector('.popup').classList.remove('show');
                                }}>
                                    <div className="event-top">
                                    <h2 className="event-header">{item.header}</h2>
                                    <div className="date">{item.date}</div>
                                    </div>
                                    <p className="event-text">{item.text}</p>
                                </div>
                                ))
                            ) : (
                                ''
                            )
                                
                            ) : todayEvents.map((item) => 
                                <div className='event' style={{backgroundColor: item.bgColor}} key={item.id}
                                onClick={() => {
                                    setCurrentEvent(item)
                                    document.querySelector('.ViewNotes').classList.remove('close')
                                    document.querySelectorAll('.calendar-item').forEach((item) => {
                                        item.classList.remove('calendar_item-popup');
                                        item.classList.remove('active');
                                    });
                                    document.querySelector('.popup').classList.remove('show');
                                    document.querySelector('.blur').style.opacity = 0;
                                    document.querySelector('.blur').style.transform = 'scale(0)';
                                    document.querySelector('.popup').classList.remove('show');
                                }}>
                                    <div className="event-top">
                                        <h2 className="event-header">{item.header}</h2>
                                        <div className="date">{item.time}</div>
                                    </div>
                                    <p className="event-text">{item.text}</p>
                                </div>
                            ) 
                        }
                    </div>
                </>
            }
        </div>
    );
}

export default RightBar;