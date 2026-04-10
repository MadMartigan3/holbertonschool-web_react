import { render } from '@testing-library/react';
import BodySectionWithMarginBottom from './BodySectionWithMarginBottom';
import BodySection from './BodySection';

describe('BodySectionWithMarginBottom', () => {
  it('contains a div with the class bodySectionWithMargin', () => {
    const { container } = render(
      <BodySectionWithMarginBottom title="test"><p>child</p></BodySectionWithMarginBottom>
    );
    expect(container.querySelector('.bodySectionWithMargin')).toBeInTheDocument();
  });

  it('renders the BodySection component', () => {
    const { container } = render(
      <BodySectionWithMarginBottom title="test"><p>child</p></BodySectionWithMarginBottom>
    );
    expect(container.querySelector('.bodySection')).toBeInTheDocument();
  });
});
