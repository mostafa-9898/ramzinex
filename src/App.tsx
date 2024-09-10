import { Outlet, Route, Routes } from "react-router-dom"
import { lazy, Suspense } from "react";
import Loading from "./components/Loading";

// Components
const CoinsListPage = lazy(() => import("./pages/CoinsListPage"));
const CoinDetailPage = lazy(() => import("./pages/CoinDetailPage"));
const ErrorPage = lazy(() => import("./pages/ErrorPage"));

function App() {

  const SuspenseLayout = () => (
    <Suspense fallback={<Loading />}>
      <Outlet />
    </Suspense>
  );

  return (
    <Routes>
      <Route element={<SuspenseLayout />}>
        <Route path='/' element={<CoinsListPage />} />
        <Route path=":id" element={<CoinDetailPage />} />
        <Route path="/error" element={<ErrorPage />} />
      </Route>
    </Routes>
  )
}

export default App
