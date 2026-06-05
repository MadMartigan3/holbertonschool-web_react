import { useCallback, useEffect, useReducer } from 'react';
import axios from 'axios';
import Notifications from '../Notifications/Notifications';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Login from '../Login/Login';
import CourseList from '../CourseList/CourseList';
import { getLatestNotification } from '../utils/utils';
import BodySection from '../BodySection/BodySection';
import BodySectionWithMarginBottom from '../BodySection/BodySectionWithMarginBottom';
import { appReducer, initialState, APP_ACTIONS } from './appReducer';

function App() {
  const [state, dispatch] = useReducer(appReducer, initialState);
  const { displayDrawer, user, notifications, courses } = state;

  useEffect(() => {
    let isMounted = true;
    const fetchNotifications = async () => {
      try {
        const response = await axios.get('/notifications.json');
        if (!isMounted) return;
        const data = response.data.map((n) =>
          n.html ? { ...n, html: { __html: getLatestNotification() } } : n
        );
        dispatch({ type: APP_ACTIONS.SET_NOTIFICATIONS, payload: data });
      } catch (error) {
        if (process.env.NODE_ENV !== 'production') console.error(error);
      }
    };
    fetchNotifications();
    return () => { isMounted = false; };
  }, []);

  useEffect(() => {
    let isMounted = true;
    const fetchCourses = async () => {
      try {
        const response = await axios.get('/courses.json');
        if (isMounted) dispatch({ type: APP_ACTIONS.SET_COURSES, payload: response.data });
      } catch (error) {
        if (process.env.NODE_ENV !== 'production') console.error(error);
      }
    };
    fetchCourses();
    return () => { isMounted = false; };
  }, [user]);

  const handleDisplayDrawer = useCallback(() => {
    dispatch({ type: APP_ACTIONS.TOGGLE_DRAWER });
  }, []);

  const handleHideDrawer = useCallback(() => {
    dispatch({ type: APP_ACTIONS.TOGGLE_DRAWER });
  }, []);

  const logIn = useCallback((email, password) => {
    dispatch({ type: APP_ACTIONS.LOGIN, payload: { email, password } });
  }, []);

  const logOut = useCallback(() => {
    dispatch({ type: APP_ACTIONS.LOGOUT });
  }, []);

  const markNotificationAsRead = useCallback((id) => {
    console.log(`Notification ${id} has been marked as read`);
    dispatch({ type: APP_ACTIONS.MARK_NOTIFICATION_READ, payload: id });
  }, []);

  return (
    <>
      <Notifications
        displayDrawer={displayDrawer}
        notifications={notifications}
        handleDisplayDrawer={handleDisplayDrawer}
        handleHideDrawer={handleHideDrawer}
        markNotificationAsRead={markNotificationAsRead}
      />
      <div className="App">
        <Header user={user} logOut={logOut} />

        <main className="App-body">
          {!user.isLoggedIn ? (
            <BodySectionWithMarginBottom title="Log in to continue">
              <Login logIn={logIn} />
            </BodySectionWithMarginBottom>
          ) : (
            <BodySectionWithMarginBottom title="Course list">
              <CourseList courses={courses} />
            </BodySectionWithMarginBottom>
          )}

          <BodySection title="News from the School">
            <p>ipsum Lorem ipsum dolor sit amet consectetur, adipisicing elit. Similique, asperiores architecto blanditiis fuga doloribus sit illum aliquid ea distinctio minus accusantium, impedit quo voluptatibus ut magni dicta. Recusandae, quia dicta?</p>
          </BodySection>
        </main>

        <Footer user={user} />
      </div>
    </>
  );
}

export default App;
