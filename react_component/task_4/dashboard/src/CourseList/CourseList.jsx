import CourseListRow from './CourseListRow';
import WithLogging from '../HOC/WithLogging';
import './CourseList.css';

function CourseList({ courses = [] }) {
  if (courses.length === 0) {
    return (
      <table id="CourseList">
        <tbody>
          <CourseListRow isHeader={true} textFirstCell="No course available yet" />
        </tbody>
      </table>
    );
  }

  return (
    <table id="CourseList">
      <thead>
        <CourseListRow isHeader={true} textFirstCell="Available courses" />
        <CourseListRow isHeader={true} textFirstCell="Course name" textSecondCell="Credit" />
      </thead>
      <tbody>
        {courses.map((course) => (
          <CourseListRow
            key={course.id}
            textFirstCell={course.name}
            textSecondCell={course.credit}
          />
        ))}
      </tbody>
    </table>
  );
}

export default WithLogging(CourseList);
