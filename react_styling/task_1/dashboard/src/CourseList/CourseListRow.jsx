const headerStyle = { backgroundColor: 'var(--color-table-header)', opacity: 0.66 };
const rowStyle = { backgroundColor: 'var(--color-table-rows)', opacity: 0.45 };

function CourseListRow({ isHeader = false, textFirstCell = '', textSecondCell = null }) {
  if (isHeader) {
    if (textSecondCell === null) {
      return (
        <tr style={headerStyle}>
          <th colSpan={2} className="border border-gray-400 text-center">{textFirstCell}</th>
        </tr>
      );
    }
    return (
      <tr style={headerStyle}>
        <th className="border border-gray-400">{textFirstCell}</th>
        <th className="border border-gray-400">{textSecondCell}</th>
      </tr>
    );
  }

  return (
    <tr style={rowStyle}>
      <td className="border border-gray-400 pl-2">{textFirstCell}</td>
      <td className="border border-gray-400 pl-2">{textSecondCell}</td>
    </tr>
  );
}

export default CourseListRow;
