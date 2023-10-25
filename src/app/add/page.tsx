import AddTableRowForm from "@/components/AddTableRowForm";
import Header from "@/components/Header";
import PrivateRoute from "@/components/PrivateRoute/PrivateRoute";

const Add = () => {
  return (
    <PrivateRoute>
      <Header />
      <AddTableRowForm action="POST" selectedId={null} />
    </PrivateRoute>
  );
};

export default Add;
