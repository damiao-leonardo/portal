import React,{useState} from 'react';
import { Header } from "../../Components/Header";
import { ProductionTable } from "../../Components/ProductionTable";
import Modal from 'react-modal';
import { Content } from "./styles";
import { EditProductModal } from "../../Components/EditProductModal";

Modal.setAppElement('#root');

interface Product {
    id: string;
    product: string;
    category: string;
    provider: string;
    value: number;
}

const Dashboard: React.FC = () => {

    const [isEditProductModalOpen, setIsEditProductModalOpen] = useState(false);
    const [productEdit, setProductEdit] = useState<Product>({} as Product);

    function handleOpenEditProductModal(productEdit: Product) {
        setProductEdit(productEdit);
        setIsEditProductModalOpen(true);
    }

    function handleCloseEditProductModal() {
        setIsEditProductModalOpen(false);
    }

    return (
        <>
          <Header/>
          <Content>
              <ProductionTable onOpenEditProductModal={handleOpenEditProductModal}/>
          </Content>
          <EditProductModal product={productEdit} isOpen={isEditProductModalOpen} onRequestClose={handleCloseEditProductModal}/>
        </>
    );
}

export default Dashboard;