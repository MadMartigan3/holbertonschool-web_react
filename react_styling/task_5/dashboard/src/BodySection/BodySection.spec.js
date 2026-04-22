import { render, screen } from '@testing-library/react';
import BodySection from './BodySection';

describe('BodySection', () => {
  test('renders a heading with the title prop', () => {
    render(
      <BodySection title="test-title">
        <p>child</p>
      </BodySection>
    );
    expect(screen.getByRole('heading', { level: 2, name: 'test-title' })).toBeInTheDocument();
  });

  test('renders any number of children passed to it', () => {
    render(
      <BodySection title="title">
        <p>child 1</p>
        <p>child 2</p>
        <span>child 3</span>
      </BodySection>
    );
    expect(screen.getByText('child 1')).toBeInTheDocument();
    expect(screen.getByText('child 2')).toBeInTheDocument();
    expect(screen.getByText('child 3')).toBeInTheDocument();
  });
});