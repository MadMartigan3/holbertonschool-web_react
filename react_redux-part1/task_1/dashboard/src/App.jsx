import { useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import Notifications from './components/Notifications/Notifications';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Login from './pages/Login/Login';
import CourseList from './pages/CourseList/CourseList';
import BodySection from './components/BodySection/BodySection';
import BodySectionWithMarginBottom from './components/BodySectionWithMarginBottom/BodySectionWithMarginBottom';
import { login, logout } from './features/auth/authSlice';
import { fetchNotifications, markNotificationAsRead, showDrawer, hideDrawer } from './features/notifications/notificationsSlice';
import { setCourses } from './features/courses/coursesSlice';

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const { displayDrawer, notifications } = useSelector((state) => state.notifications);
  const { courses } = useSelector((state) => state.courses);

  useEffect(() => {
    dispatch(fetchNotifications());
  }, [dispatch]);

  useEffect(() => {
    let isMounted = true;
    const fetchCourses = async () => {
      try {
        const response = await axios.get('/courses.json');
        if (isMounted) dispatch(setCourses(response.data));
      } catch (error) {
        if (process.env.NODE_ENV !== 'production') console.error(error);
      }
    };
    fetchCourses();
    return () => { isMounted = false; };
  }, [dispatch, user.isLoggedIn]);

  const handleDisplayDrawer = useCallback(() => {
    dispatch(showDrawer());
  }, [dispatch]);

  const handleHideDrawer = useCallback(() => {
    dispatch(hideDrawer());
  }, [dispatch]);

  const logIn = useCallback((email, password) => {
    dispatch(login({ email, password }));
  }, [dispatch]);

  const logOut = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);

  const handleMarkNotificationAsRead = useCallback((id) => {
    dispatch(markNotificationAsRead(id));
  }, [dispatch]);

  return (
    <>
      <Notifications
        displayDrawer={displayDrawer}
        notifications={notifications}
        handleDisplayDrawer={handleDisplayDrawer}
        handleHideDrawer={handleHideDrawer}
        markNotificationAsRead={handleMarkNotificationAsRead}
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
