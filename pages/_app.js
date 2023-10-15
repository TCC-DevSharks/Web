// import Sidebar from "@/components/Sidebar";
import Head from 'next/head';
import '../styles/globals.css';

export default function App({ Component, pageProps }) {
  return (
    <div>
      <Head>
        <script src="https://kit.fontawesome.com/121a930925.js" crossOrigin="anonymous"></script>
      </Head>
      {/* <Sidebar /> */}
      <Component {...pageProps} />
    </div>
  );
}


// export default App;
// 