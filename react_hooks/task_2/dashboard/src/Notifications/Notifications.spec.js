import { render, screen, fireEvent } from "@testing-library/react";
import Notifications from "./Notifications";
import { getLatestNotification } from "../utils/utils.js";

describe('Notifications', () => {
  const mockNotifications = [
    { id: 1, type: 'default', value: 'New course available' },
    { id: 2, type: 'urgent', value: 'New resume available' },
    { id: 3, type: 'urgent', html: { __html: '<strong>Urgent requirement</strong> - complete by EOD' } },
  ];

  test('Check the existence of the notifications title Here is the list of notifications', () => {
    render(<Notifications notifications={mockNotifications} displayDrawer={true} />);
    expect(screen.getByText(/Here is the list of notifications/i)).toBeInTheDocument();
  });

  test('Check the existence of the button element in the notifications', () => {
    render(<Notifications notifications={mockNotifications} displayDrawer={true} />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  test('Verify that there are 3 li elements as notifications rendered', () => {
    render(<Notifications notifications={mockNotifications} displayDrawer={true} />);
    expect(screen.getAllByRole('listitem').length).toBe(3);
  });

  test('Check whether clicking the close button logs "Close button has been clicked" to the console.', () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    render(<Notifications notifications={mockNotifications} displayDrawer={true} />);
    fireEvent.click(screen.getByRole('button', { name: /close/i }));
    expect(consoleSpy).toHaveBeenCalledWith('Close button has been clicked');
    consoleSpy.mockRestore();
  });

  test('clicking a notification item calls markNotificationAsRead with the correct id', () => {
    const markNotificationAsRead = jest.fn();
    render(
      <Notifications
        notifications={mockNotifications}
        displayDrawer={true}
        markNotificationAsRead={markNotificationAsRead}
      />
    );
    fireEvent.click(screen.getByText('New resume available'));
    expect(markNotificationAsRead).toHaveBeenCalledWith(2);
  });
});

describe('Notifications - handler props (Task 0)', () => {
  const mockNotifications = [
    { id: 1, type: 'default', value: 'New course available' },
    { id: 2, type: 'urgent', value: 'New resume available' },
    { id: 3, type: 'urgent', html: { __html: '<strong>Urgent requirement</strong> - complete by EOD' } },
  ];

  test('clicking the menu item calls handleDisplayDrawer', () => {
    const handleDisplayDrawer = jest.fn();
    render(
      <Notifications
        notifications={mockNotifications}
        displayDrawer={false}
        handleDisplayDrawer={handleDisplayDrawer}
      />
    );
    fireEvent.click(screen.getByText('Your notifications'));
    expect(handleDisplayDrawer).toHaveBeenCalledTimes(1);
  });

  test('clicking the close button calls handleHideDrawer', () => {
    const handleHideDrawer = jest.fn();
    render(
      <Notifications
        notifications={mockNotifications}
        displayDrawer={true}
        handleHideDrawer={handleHideDrawer}
      />
    );
    fireEvent.click(screen.getByRole('button', { name: /close/i }));
    expect(handleHideDrawer).toHaveBeenCalledTimes(1);
  });
});

describe('Whenever the prop displayDrawer set to false', () => {
  test('Check that the Notifications component doesn t displays the elements', () => {
    const notifications = [
      { id: 1, type: 'default', value: 'New course available' },
      { id: 2, type: 'urgent', value: 'New resume available' },
      { id: 3, type: 'urgent', html: { __html: getLatestNotification() } },
    ];
    render(<Notifications notifications={notifications} displayDrawer={false} />);
    expect(screen.queryByText("Here is the list of notifications")).not.toBeInTheDocument();
    expect(screen.queryAllByRole('listitem')).toHaveLength(0);
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });
});

describe('Whenever the the prop displayDrawer set to true', () => {
  test('Check that the Notifications component displays the elements', () => {
    const notifications = [
      { id: 1, type: 'default', value: 'New course available' },
      { id: 2, type: 'urgent', value: 'New resume available' },
      { id: 3, type: 'urgent', html: { __html: getLatestNotification() } },
    ];
    render(<Notifications notifications={notifications} displayDrawer={true} />);
    expect(screen.queryByText("Here is the list of notifications")).toBeInTheDocument();
    expect(screen.queryAllByRole('listitem')).toHaveLength(3);
    expect(screen.queryByRole('button')).toBeInTheDocument();
  });

  test('Check that the Notifications component displays the elements', () => {
    render(<Notifications notifications={[]} displayDrawer={true} />);
    expect(screen.queryByText("No new notification for now")).toBeInTheDocument();
  });

  describe('Notifications (PureComponent - re-render behavior)', () => {
    test('re-renders when notifications length changes', () => {
      const initial = [
        { id: 1, type: 'default', value: 'A' },
        { id: 2, type: 'default', value: 'B' },
      ];
      const { rerender } = render(<Notifications notifications={initial} displayDrawer={true} />);

      const longer = [
        { id: 1, type: 'default', value: 'A' },
        { id: 2, type: 'default', value: 'B' },
        { id: 3, type: 'default', value: 'C' },
      ];
      rerender(<Notifications notifications={longer} displayDrawer={true} />);
      expect(screen.getByText('C')).toBeInTheDocument();
    });

    test('does not re-render when the same props reference is passed', () => {
      const notifications = [
        { id: 1, type: 'default', value: 'A' },
        { id: 2, type: 'default', value: 'B' },
      ];
      const { rerender } = render(<Notifications notifications={notifications} displayDrawer={true} />);
      rerender(<Notifications notifications={notifications} displayDrawer={true} />);
      expect(screen.getByText('A')).toBeInTheDocument();
      expect(screen.getByText('B')).toBeInTheDocument();
    });
  });
});
