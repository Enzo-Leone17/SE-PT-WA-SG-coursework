export default function Login({ setAuth }) {
  const handleLogin = (event) => {
    event.preventDefault();
    setAuth(true);
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-600 px-4" onSubmit={handleLogin}>
      <form className="w-full max-w-md space-y-4 bg-white p-6 rounded shadow">
        <h2 className="text-xl font-bold text-center text-black">Login</h2>
        <input
          className="w-full p-2 border rounded border-black text-black"
          type="text"
          placeholder="Username"
        />
        <input
          className="w-full p-2 border rounded border-black text-black"
          type="password"
          placeholder="Password"
        />
        <button
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded"
          type="submit"
        >
          Login
        </button>
      </form>
    </div>
  );
}
