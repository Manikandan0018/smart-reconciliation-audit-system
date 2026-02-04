export default function AuthLoader({ text }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md bg-white/40">
      <div className="flex flex-col items-center gap-4">
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 rounded-full border-4 border-black/10"></div>
          <div className="absolute inset-0 rounded-full border-4 border-black border-t-transparent animate-spin"></div>
        </div>
        <p className="text-gray-800 font-medium">{text}</p>
      </div>
    </div>
  );
}
