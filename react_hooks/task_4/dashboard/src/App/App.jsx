import { useState, useCallback, useEffect } from 'react';
import axios from 'axios';
import Notifications from '../Notifications/Notifications';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Login from '../Login/Login';
import CourseList from '../CourseList/CourseList';
import newContext from '../Context/context';
import BodySection from '../BodySection/BodySection';
import BodySectionWithMarginBottom from '../BodySection/BodySectionWithMarginBottom';

const coursesList = [
  { id: 1, name: 'ES6', credit: 60 },
  { id: 2, name: 'Webpack', credit: 20 },
  { id: 3, name: 'React', credit: 40 },
];

function App() {
  const [displayDrawer, setDisplayDrawer] = useState(true);
  const [user, setUser] = useState(newContext._currentValue.user);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    axios.get('/notifications.json').then((response) => {
      setNotifications(response.data);
    });
  }, []);

  const handleDisplayDrawer = useCallback(() => {
    setDisplayDrawer(true);
  }, []);

  const handleHideDrawer = useCallback(() => {
    setDisplayDrawer(false);
  }, []);

  const logIn = useCallback((email, password) => {
    setUser({ email, password, isLoggedIn: true });
  }, []);

  const logOut = useCallback(() => {
    setUser({ email: '', password: '', isLoggedIn: false });
  }, []);

  const markNotificationAsRead = useCallback((id) => {
    console.log(`Notification ${id} has been marked as read`);
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  }, []);

  const contextValue = { user, logOut };

  return (
    <newContext.Provider value={contextValue}>
      <Notifications
        displayDrawer={displayDrawer}
        notifications={notifications}
        handleDisplayDrawer={handleDisplayDrawer}
        handleHideDrawer={handleHideDrawer}
        markNotificationAsRead={markNotificationAsRead}
      />
      <div className="App">
        <Header />

        <main className="App-body">
          {!user.isLoggedIn ? (
            <BodySectionWithMarginBottom title="Log in to continue">
              <Login logIn={logIn} />
            </BodySectionWithMarginBottom>
          ) : (
            <BodySectionWithMarginBottom title="Course list">
              <CourseList courses={coursesList} />
            </BodySectionWithMarginBottom>
          )}

          <BodySection title="News from the School">
            <p>ipsum Lorem ipsum dolor sit amet consectetur, adipisicing elit. Similique, asperiores architecto blanditiis fuga doloribus sit illum aliquid ea distinctio minus accusantium, impedit quo voluptatibus ut magni dicta. Recusandae, quia dicta?</p>
          </BodySection>
        </main>

        <Footer />
      </div>
    </newContext.Provider>
  );
}

export default App;
