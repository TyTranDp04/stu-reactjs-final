import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import './App.css';
import { USER_INFO_KEY } from './constants';
import RouterApp from './routes';

function App() {
  const userInfo = useSelector(state => state.users.userInfoState);
  const user = userInfo?.data?.user?.email;
  
  useEffect(() => {
    if (!user) {
      document.cookie = `accesToken=${null}`;
      // localStorage.removeItem(USER_INFO_KEY);
    }
  }, [user]);

  return (
    <div className="App">
      <RouterApp />
    </div>
  );
}

export default App;
