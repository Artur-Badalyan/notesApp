import { useEffect, useState } from 'react';
import { IoIosArrowBack } from 'react-icons/io';
import '../assets/styles/ViewNotes.css'
import { useDispatch } from 'react-redux';

const ViewNotes = ({events, currentEvent,setCurrentEvent}) => {
    
    const [isEditing, setIsEditing] = useState(false);
    const [currentHeader, setCurrentHeader] = useState(currentEvent ? currentEvent.header : '')
    const [currentText, setCurrentText] = useState(currentEvent ? currentEvent.text : '')

    useEffect(() => {
        setCurrentHeader(currentEvent ? currentEvent.header : '');
        setCurrentText(currentEvent ? currentEvent.text : '');
    }, [currentEvent]);

    const dispatch = useDispatch();

    return(
        <div className="ViewNotes close">
            <div className="view_notes-bg"></div>
            <div className="container">
                <div className="view_notes-top">
                    <div className="top_bar-left">
                        <button className="back"
                        onClick={() => {
                            document.querySelector('.ViewNotes').classList.add('close')
                        }}
                        >Назад</button>
                    </div>
                    <div className="top_bar-right">
                        <input type="text" placeholder="Поиск" className="search-notes" />
                        <button>Поиск</button>
                    </div>
                </div>
                <div className="wrapper">
                    <div className="events">
                        {
                            events.map((event) => {
                                return (
                                <div className="event" 
                                    style={{backgroundColor: event.bgColor}}
                                    onClick={() => {
                                        setCurrentEvent(event)
                                    }}>
                                    
                                    <div className="event-left">
                                        <div className="header">{event.header}</div>
                                        <div className="text">{event.text}</div>
                                    </div>
                                    <div className="event-right">
                                        <div className="date">{event.date}</div>
                                        <div className="time">{event.time}</div>
                                    </div>
                                </div>
                                )
                            })
                        }
                    </div>
                </div>
                {
                    currentEvent ? <div className="showFullEvent">
                    <div className="fullEvent-bg"></div>
                    <div className="container">
                        <div className="view_event-top">
                            <div className="view_event-left">
                                <button className="back"
                                    onClick={() => {
                                        setCurrentEvent()
                                    }}>
                                    <IoIosArrowBack /> Назад
                                </button>
                                {
                                    isEditing ? 
                                    <button className='save' 
                                    onClick={() => {
                                        dispatch({
                                            type: 'EDIT-CURRENT-EVENT',
                                            payload: {
                                              id: currentEvent.id,
                                              header: currentHeader,
                                              text: currentText,
                                              date: currentEvent.date,
                                              time: currentEvent.time,
                                              bgColor: currentEvent.bgColor,
                                            },
                                          });
                                          setIsEditing(false)
                                    }}
                                    >Сохранить</button>
                                    :
                                    <button className="change" 
                                    onClick={() => {
                                        setIsEditing(true)
                                    }}>Изменить</button>
                                }
                            </div>
                            <button className="delete" onClick={() => {
                                dispatch({
                                    type: 'DELETE-EVENT',
                                    payload: {
                                        id: currentEvent.id,
                                        header: currentHeader,
                                        text: currentText,
                                        date: currentEvent.date,
                                        time: currentEvent.time,
                                        bgColor: currentEvent.bgColor,
                                      },
                                })
                                if(events.length > 1) {
                                    setCurrentEvent()
                                } else {
                                    document.querySelector('.ViewNotes').classList.add('close')
                                    setCurrentEvent()
                                }

                            }}>Удалить</button>
                        </div>

                        <div className="view_event-bottom">
                            {
                                isEditing ? 
                                <div className="view_event-left">
                                    <div className="header">
                                        <input 
                                            type="text" 
                                            value={currentHeader ? currentHeader : currentEvent.header} 
                                            placeholder={currentEvent.header}
                                            onChange={(e) => {
                                                setCurrentHeader(e.target.value)
                                            }}/>
                                    </div>
                                    <div className="text">
                                    <textarea
                                        name=""
                                        id=""
                                        cols="30"
                                        rows="10"
                                        value={currentText ? currentText : currentEvent.text}
                                        placeholder={currentEvent.text}
                                        onChange={(e) => {
                                            setCurrentText(e.target.value)
                                        }}
                                    >{currentText ? currentText : currentEvent.text}</textarea>
                                    </div>
                                </div> 
                                :
                                <div className="view_event-left">
                                    <div className="header">{currentHeader ? currentHeader : currentEvent.header}</div>
                                    <div className="text">{currentText ? currentText : currentEvent.text}</div>
                                </div>
                            }
                            <div className="view_event-right">
                                <div className="date">{currentEvent.date}</div>
                                <div className="time">{currentEvent.time}</div>
                            </div>
                        </div>
                        
                    </div>
                </div> : ''
                }
            </div>
        </div>
    );
}

export default ViewNotes;