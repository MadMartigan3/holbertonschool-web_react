import { render, screen } from '@testing-library/react';
import BodySection from './BodySection';

describe('BodySection', () => {
  it('renders a heading with the title prop value', () => {
    render(<BodySection title="test title"><p>child</p></BodySection>);
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('test title');
  });

  it('renders children passed to it', () => {
    render(
      <BodySection title="test">
        <p>first child</p>
        <p>second child</p>
      </BodySection>
    );
    expect(screen.getByText('first child')).toBeInTheDocument();
    expect(screen.getByText('second child')).toBeInTheDocument();
  });
});
