
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import EditablePage from "../../components/EditablePage/EditablePage";

const B2BBookstores = () => {
    const navigate = useNavigate();

  useEffect(() => {
    navigate("/bookstore");
  }, [navigate]);

  return (
    <EditablePage
      slug="clpublishing-b2b-bookstores"
      title="B2B Bookstores"
      placeholder="Information about B2B Bookstores..."
    />
  );
};

export default B2BBookstores;
