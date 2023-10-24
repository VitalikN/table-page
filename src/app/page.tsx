import { Balls } from "@/components/Balls";
import PrivateRoute from "@/components/PrivateRoute/PrivateRoute";

import dynamic from "next/dynamic";

const DynamicTable = dynamic(() => import("@/components/Table"), {
  loading: () => <Balls />,
  ssr: false,
});

export default function Home() {
  return (
    <PrivateRoute>
      <DynamicTable />
    </PrivateRoute>
  );
}
