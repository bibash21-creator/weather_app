export default function Footer() {
  return (
    <footer className="w-full bg-black/30 backdrop-blur-md border-t border-white/10 px-6 py-4 text-center text-white/70 mt-6 flex flex-col md:flex-row items-center justify-between">
      <p>
        © {new Date().getFullYear()} WeatherDash. Built with Next.js +
        OpenWeather API.
      </p>
      <p className="mt-2">
        Made by <span className="text-white">Bibash</span> 
      </p>
    </footer>
  );
}
