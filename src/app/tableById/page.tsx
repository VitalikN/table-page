import Header from "@/components/Header";
import PrivateRoute from "@/components/PrivateRoute/PrivateRoute";
import TableById from "@/components/TableById";

const TableByIdPage = () => {
  return (
    <PrivateRoute>
      <Header />
      <TableById />
    </PrivateRoute>
  );
};

export default TableByIdPage;
