import "@/utils/i18n";
import { Provider as ReduxProvider } from "react-redux";
import { appWithTranslation } from "next-i18next";
import store from "@/redux/store";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import api from "@/utils/api";
import Context from "@/components/login-register/Context";
import Layout from "@/components/Layout"; // Default Layout kimi istifadə olunur

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [allowed, setAllowed] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const protectRoute = async () => {
      const path = router.pathname;

      if (path.startsWith("/admin")) {
        try {
          const res = await api.get("auth/me");
          const user = res.data;

          if (user.roleName === "admin") {
            setAllowed(true);
          } else {
            setAllowed(false);
            router.replace("/");
          }
        } catch (err) {
          setAllowed(false);
          router.replace("/");
        } finally {
          setChecking(false);
        }
      } else {
        setAllowed(true);
        setChecking(false);
      }
    };

    protectRoute();
  }, [router.pathname]);

  if (checking || !allowed) return null;

  // Layout funksiyasını komponentdən al, yoxdursa default Layout istifadə et
  const getLayout =
    Component.getLayout ||
    ((page) => (
      <Layout>
        {page}
      </Layout>
    ));

  return (
    <ReduxProvider store={store}>
      <Context>
        {getLayout(<Component {...pageProps} />)}
      </Context>
    </ReduxProvider>
  );
}

export default appWithTranslation(MyApp);
