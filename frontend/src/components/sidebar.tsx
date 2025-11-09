export default function Sidebar() {
  return (
    <aside className="w-64 bg-gray-800 text-white p-4">
      <ul>
        <li className="mb-2 hover:bg-gray-700 p-2 rounded">Dashboard</li>
        <li className="mb-2 hover:bg-gray-700 p-2 rounded">Usuarios</li>
        <li className="mb-2 hover:bg-gray-700 p-2 rounded">Vehículos</li>
        <li className="mb-2 hover:bg-gray-700 p-2 rounded">Reportes</li>
      </ul>
    </aside>
  );
}
