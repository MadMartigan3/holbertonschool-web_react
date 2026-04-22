import { render, screen } from '@testing-library/react';
import CourseListRow from './CourseListRow';

describe('CourseListRow', () => {
  test('renders one <th> with colSpan=2 when isHeader=true and textSecondCell=null', () => {
    const { container } = render(
      <table>
        <thead>
          <CourseListRow isHeader textFirstCell="Available courses" textSecondCell={null} />
        </thead>
      </table>
    );
    const th = container.querySelector('th');
    expect(th).not.toBeNull();
    expect(th).toHaveAttribute('colspan', '2');
    expect(th).toHaveTextContent('Available courses');
  });

  test('renders two <th> when isHeader=true and textSecondCell is provided', () => {
    render(
      <table>
        <thead>
          <CourseListRow isHeader textFirstCell="Course name" textSecondCell="Credit" />
        </thead>
      </table>
    );
    const headers = screen.getAllByRole('columnheader');
    expect(headers).toHaveLength(2);
    expect(headers[0]).toHaveTextContent('Course name');
    expect(headers[1]).toHaveTextContent('Credit');
  });

  test('renders two <td> inside a <tr> when isHeader=false', () => {
    render(
      <table>
        <tbody>
          <CourseListRow textFirstCell="ES6" textSecondCell={60} />
        </tbody>
      </table>
    );
    const cells = screen.getAllByRole('cell');
    expect(cells).toHaveLength(2);
    expect(cells[0]).toHaveTextContent('ES6');
    expect(cells[1]).toHaveTextContent('60');
  });
});