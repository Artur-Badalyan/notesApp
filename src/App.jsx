import { useSelector, useDispatch } from 'react-redux';
import WebFont from 'webfontloader';
import './App.css';
import Login from './components/login';
import { useEffect } from 'react';
import AppPage from './components/AppPage';

function App() {

  useEffect(() => {
    WebFont.load({
      google: {
        families: ['JetBrains Mono']
      }
    });
  })

  const currentUser = useSelector((state) => {
      return state.currentUser
  })

  const dispatch = useDispatch()

  return (
    <div className="App">
      <div className="container">
        {
          currentUser.user ? <AppPage/> : <Login />
        }
      </div>
    </div>
  );
}

export default App;
