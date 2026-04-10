import { render, screen } from '@testing-library/react';
import CourseListRow from './CourseListRow';

describe('CourseListRow', () => {
  describe('when isHeader is true', () => {
    it('renders one columnheader with colspan=2 when textSecondCell is null', () => {
      const { container } = render(
        <table><tbody><CourseListRow isHeader={true} textFirstCell="Available courses" /></tbody></table>
      );
      const th = screen.getByRole('columnheader');
      expect(th).toBeInTheDocument();
      expect(th).toHaveAttribute('colspan', '2');
    });

    it('renders two th cells when textSecondCell is not null', () => {
      render(
        <table><thead><CourseListRow isHeader={true} textFirstCell="Course name" textSecondCell="Credit" /></thead></table>
      );
      const headers = screen.getAllByRole('columnheader');
      expect(headers).toHaveLength(2);
    });
  });

  describe('when isHeader is false', () => {
    it('renders two td elements within a tr element', () => {
      const { container } = render(
        <table><tbody><CourseListRow textFirstCell="ES6" textSecondCell={60} /></tbody></table>
      );
      const cells = container.querySelectorAll('td');
      expect(cells).toHaveLength(2);
      expect(cells[0]).toHaveTextContent('ES6');
      expect(cells[1]).toHaveTextContent('60');
    });
  });
});
