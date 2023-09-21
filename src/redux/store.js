import { createStore } from 'redux';

const reducer = (state = initialState(), action) => {
  switch (action.type) {
    case 'ADD-NEW-USER':
      return {
        ...state,
        users: [
          ...state.users,
          {
            id: Math.random() * 100,
            userName: action.payload.userName,
            password: action.payload.password
          }
        ]
      };

    case 'SET-CURRENT-USER':
      return {
        ...state,
        currentUser: {
          user: action.payload.user
        }
      };

    case 'ADD-NEW-EVENT':
      const newEvent = {
        id: Math.random(),
        header: action.payload.header,
        text: action.payload.text,
        date: action.payload.date,
        time: action.payload.time,
        bgColor: action.payload.bgColor ? action.payload.bgColor : '#FF4EED'
      };
      const newState = { ...state, events: [...state.events, newEvent ] };

      localStorage.setItem('events', JSON.stringify(newState.events));

      return newState;

    case 'DELETE-EVENT':
      const deleteNewState = {
        ...state,
        events: [
          ...state.events.filter((event) => event.id !== action.payload.id)
        ]
      };
      localStorage.setItem('events', JSON.stringify(deleteNewState.events));

      return deleteNewState;

    case 'EDIT-CURRENT-EVENT':
      const updatedEvents = state.events.map(event => {
        if (event.id === action.payload.id) {
          return {
            ...event,
            header: action.payload.header,
            text: action.payload.text,
            date: action.payload.date,
            time: action.payload.time,
            bgColor: action.payload.bgColor ? action.payload.bgColor : '#FF4EED'
          };
        }
        return event;
      });
      localStorage.setItem('events', JSON.stringify(updatedEvents));

      return {
        ...state,
        events: updatedEvents,
      };

    default:
      return state;
  }
};

const initialState = () => {

  const state = {
    users: [
      {
        id: Math.random() * 100,
        userName: 'artur',
        password: 'artur'
      }
    ],
    currentUser: {
      user: {
        userName: 'artur',
        password: 'artur'
      }
    },
  };

  localStorage.setItem('users', state.users);
  localStorage.setItem('currentUser', state.currentUser.user);
  const events =  localStorage.getItem('events') ? JSON.parse(localStorage.getItem('events')) : [];

  state.events = events;

  return state;
};

const store = createStore(reducer);

export default store;
