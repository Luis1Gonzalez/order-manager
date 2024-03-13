
import { ControlProvider } from "@/context/controlProvider";
import "@/styles/globals.css";
import "@/styles/others.css";

export default function App({ Component, pageProps }) {
  return (
    <ControlProvider>
      <Component {...pageProps} />
    </ControlProvider>
  );
}
