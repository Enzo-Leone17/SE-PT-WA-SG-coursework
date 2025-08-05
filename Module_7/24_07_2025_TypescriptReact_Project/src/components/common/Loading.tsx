

function Loading() {
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      <p className="ml-4 text-lg font-medium text-white">Loading...</p>
    </div>
  );
}

export default Loading;
