function OpportunityTable({ opportunities, onDelete }) {
  return (
    <div className="bg-[#181818] border border-zinc-800 rounded-xl overflow-hidden">
      <table className="w-full text-left">
        <thead className="bg-[#0A0A0A] text-gray-400">
          <tr>
            <th className="p-4">Title</th>
            <th className="p-4">Type</th>
            <th className="p-4">Organization</th>
            <th className="p-4">Deadline</th>
            <th className="p-4">Status</th>
            <th className="p-4">Action</th>
          </tr>
        </thead>

        <tbody>
          {opportunities.map((item) => (
            <tr key={item.id} className="border-t border-zinc-800">
              <td className="p-4">{item.title}</td>
              <td className="p-4 text-[#F4B400]">{item.type}</td>
              <td className="p-4">{item.organization}</td>
              <td className="p-4">{item.deadline}</td>
              <td className="p-4">{item.status}</td>
              <td className="p-4">
                <button
                  onClick={() => onDelete(item.id)}
                  className="text-red-400 hover:text-red-500"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}

          {opportunities.length === 0 && (
            <tr>
              <td className="p-6 text-gray-400" colSpan="6">
                No opportunities added yet.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default OpportunityTable;