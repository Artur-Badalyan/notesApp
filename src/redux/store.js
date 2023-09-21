import { createStore } from 'redux';

const reducer = (state = initialState, action) => {
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
      return {
        ...state,
        events: [
          ...state.events,
          {
            id: Math.random(),
            header: action.payload.header,
            text: action.payload.text,
            date: action.payload.date,
            time: action.payload.time,
            bgColor: action.payload.bgColor ? action.payload.bgColor : '#FF4EED'
          }
        ]
      };

      case 'DELETE-EVENT':
      return {
        ...state,
        events: [
          ...state.events.filter((event) => event.id !== action.payload.id)
        ]
      };

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

      

      return {
        ...state,
        events: updatedEvents,
      };

    default:
      return state;
  }
};

const initialState = {
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
    events: [
      
    ],
  };

const store = createStore(reducer);

export default store;
