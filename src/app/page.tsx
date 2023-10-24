import PrivateRoute from "@/components/PrivateRoute/PrivateRoute";
// import Table from "@/components/Table";

import dynamic from "next/dynamic";

const DynamicTable = dynamic(() => import("@/components/Table"), {
  loading: () => <p>Loading...</p>,
  ssr: false,
});

export default function Home() {
  return (
    // <PrivateRoute>
    <>
      <DynamicTable />
    </>
    // {/* </PrivateRoute> */}
  );
}
