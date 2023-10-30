import { useEffect } from 'react';
import './styles/App.css';

import Home from './pages/Home';
import { useDispatch } from 'react-redux';
import { login } from './Store/authSlice';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const username = sessionStorage.getItem("username");
    const password = sessionStorage.getItem("password");
    if (username && password) {
      dispatch(login({ username, password }));
    }
  }, []);
  return <div className="App">
    <section>
      <Home/>
    </section>
  </div>;
}

export default App;
