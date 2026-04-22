export default function CourseListRow({
  isHeader = false,
  textFirstCell = "",
  textSecondCell = null,
}) {
  const headerBg = "rgba(222, 181, 181, 0.66)";
  const rowBg = "rgba(205, 205, 205, 0.45)";

  const rowStyle = {
    backgroundColor: isHeader ? headerBg : rowBg,
  };

  const cellClass = "border border-gray-400 pl-2 text-black";

  if (isHeader) {
    if (textSecondCell === null) {
      return (
        <tr style={rowStyle}>
          <th colSpan="2" className={`${cellClass} font-bold`}>
            {textFirstCell}
          </th>
        </tr>
      );
    }
    return (
      <tr style={rowStyle}>
        <th className={`${cellClass} font-bold w-[70%]`}>{textFirstCell}</th>
        <th className={`${cellClass} font-bold`}>{textSecondCell}</th>
      </tr>
    );
  }

  return (
    <tr style={rowStyle}>
      <td className={cellClass}>{textFirstCell}</td>
      <td className={cellClass}>{textSecondCell}</td>
    </tr>
  );
}