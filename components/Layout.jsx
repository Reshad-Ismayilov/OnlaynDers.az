import Header from "./Header/Header";
import "../app/globals.css";
import Footer from "./Footer/Footer";
import Context from "./login-register/Context";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";

export default function Layout({ children }) {
  const { isAuthenticated, refreshToken } = useAuth();
  const router = useRouter();
  const { pathname } = router;

  // Bu səhifələrdə Layout (Header və Footer) göstərilməsin
  const excludedRoutes = ["/login", "/register"];
  const isExcluded = excludedRoutes.includes(pathname);

  // auth yoxlaması (əgər ehtiyac varsa)
  useEffect(() => {
    if (pathname.startsWith("/dashboard") && !refreshToken) {
      // router.push("/")  // istəyə görə yönləndir
    }
  }, [pathname, isAuthenticated, router, refreshToken]);

  if (isExcluded) {
    // Header və Footer olmadan render et
    return <>{children}</>;
  }

  return (
    <Context>
      <Header />
      <main>{children}</main>
      {/* <Footer /> */}
    </Context>
  );
}
