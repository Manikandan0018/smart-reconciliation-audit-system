export default function SummaryCard({ title, value }) {
  return (
    <div className="p-4 bg-white shadow rounded">
      <p className="text-sm text-gray-500">{title}</p>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
}
