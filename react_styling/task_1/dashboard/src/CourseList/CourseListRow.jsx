function CourseListRow({ isHeader = false, textFirstCell = '', textSecondCell = null }) {
  if (isHeader) {
    if (textSecondCell === null) {
      return (
        <tr className="bg-table-header opacity-[0.66]">
          <th colSpan={2} className="border border-gray-400 text-center">{textFirstCell}</th>
        </tr>
      );
    }
    return (
      <tr className="bg-table-header opacity-[0.66]">
        <th className="border border-gray-400">{textFirstCell}</th>
        <th className="border border-gray-400">{textSecondCell}</th>
      </tr>
    );
  }

  return (
    <tr className="bg-table-rows opacity-[0.45]">
      <td className="border border-gray-400 pl-2">{textFirstCell}</td>
      <td className="border border-gray-400 pl-2">{textSecondCell}</td>
    </tr>
  );
}

export default CourseListRow;
