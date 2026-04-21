// src/CourseList/CourseList.spec.js
import { render, screen } from '@testing-library/react';
import CourseList from './CourseList';

const courses = [
  { id: 1, name: 'ES6', credit: 60 },
  { id: 2, name: 'Webpack', credit: 20 },
  { id: 3, name: 'React', credit: 40 },
];

describe('CourseList', () => {
  test('renders 5 rows total when it receives a courses array (2 headers + 3 body)', () => {
    render(<CourseList courses={courses} />);
    const rows = screen.getAllByRole('row');
    expect(rows).toHaveLength(5);
  });

  test('renders 1 row in tbody when it receives an empty array', () => {
    const { container } = render(<CourseList courses={[]} />);
    const tbody = container.querySelector('tbody');
    expect(tbody.querySelectorAll('tr')).toHaveLength(1);
    expect(tbody).toHaveTextContent(/no course available yet/i);
  });
});