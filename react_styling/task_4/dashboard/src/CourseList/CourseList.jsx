import CourseListRow from './CourseListRow';
import WithLogging from '../HOC/WithLogging';

const containerStyle = { margin: '40px auto' };
const tableStyle = { width: '100%', borderCollapse: 'collapse' };

function CourseList({ courses = [] }) {
  if (courses.length === 0) {
    return (
      <div style={containerStyle} className="w-full wide:w-4/5">
        <table id="CourseList" style={tableStyle} className="w-full border-collapse">
          <tbody>
            <CourseListRow isHeader={true} textFirstCell="No course available yet" />
          </tbody>
        </table>
      </div>
    );
  }

  return (
    <div style={containerStyle}>
      <table id="CourseList" style={tableStyle} className="w-full border-collapse">
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
    </div>
  );
}

export default WithLogging(CourseList);
