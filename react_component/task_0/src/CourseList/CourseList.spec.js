import { render, screen } from '@testing-library/react';
import CourseList from './CourseList';

const courses = [
  { id: 1, name: 'ES6', credit: 60 },
  { id: 2, name: 'Webpack', credit: 20 },
  { id: 3, name: 'React', credit: 40 },
];

describe('CourseList', () => {
  it('renders 5 rows when given an array of courses', () => {
    render(<CourseList courses={courses} />);
    expect(screen.getAllByRole('row')).toHaveLength(5);
  });

  it('renders 1 row when given an empty array', () => {
    render(<CourseList />);
    expect(screen.getAllByRole('row')).toHaveLength(1);
  });
});
