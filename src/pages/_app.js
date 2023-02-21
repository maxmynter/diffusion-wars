import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <div className="bg-900">
      <Component {...pageProps} />
    </div>
  );
}
