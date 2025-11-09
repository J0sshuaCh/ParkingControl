export default function Header() {
  return (
    <header className="bg-white shadow p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">🚗 Parking Control</h1>
      <button className="bg-blue-600 text-white px-3 py-1 rounded">
        Cerrar sesión
      </button>
    </header>
  );
}
