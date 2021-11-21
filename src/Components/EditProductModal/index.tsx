import { useRef, useCallback } from 'react';
import Modal from 'react-modal';
import { useProducts } from '../../hooks/useProducts';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import Input from '../Input';
import * as Yup from 'yup';

import {Container } from './styles';
import getValidationErrors from '../../utils/getValidationErrors';

interface Product {
    id: string;
    product: string;
    category: string;
    provider: string;
    value: number;
}


interface EditProductModalProps{
    isOpen: boolean;
    onRequestClose: () => void;
    product: Product;
}

export function EditProductModal({isOpen,onRequestClose,product} : EditProductModalProps) {

    const { editProduct } = useProducts();

    const formRef = useRef<FormHandles>(null);

    const handleEditProduct = useCallback(async (data: Product) => {

        // Formulario com validação para editar um produto especifico
        try{
            formRef.current?.setErrors({});
            
            // validação do objeto Data
            const schema = Yup.object().shape({
                product: Yup.string().required('Nome obrigatório'),
                category: Yup.string().required('Categoria obrigatória'),
                provider: Yup.string().required('Fornecedor obrigatório'),
                value: Yup.number().typeError('Valor do produto obrigatório').min(0, 'Min value 0.')
            });
            await schema.validate(data,{
                abortEarly: false
            });
            editProduct(data);
            onRequestClose();
          
        } catch(err){
            if (err instanceof Yup.ValidationError) {
                const errors = getValidationErrors(err);
                formRef.current?.setErrors(errors);
            }   
        }
    },[]);

    return(
    <Modal
          isOpen={isOpen}
          onRequestClose={onRequestClose}
          overlayClassName="react-modal-overlay"
          className="react-modal-content"
          >
               <button className="react-modal-close" type="button" onClick={onRequestClose}>X</button>  
                <Container >
                    <h2>Editar Produto</h2>
                    <Form ref={formRef} onSubmit={handleEditProduct}>
                        <Input name="id" disabled value={product.id}  type="text"   />
                        <Input name="product" defaultValue={product.product}  type="text" placeholder="Produto"  />
                        <Input name="category" defaultValue={product.category} type="text"  placeholder="Categoria" /> 
                        <Input name="provider" defaultValue={product.provider} type="text"  placeholder="Fornecedor" /> 
                        <Input name="value" defaultValue={product.value} type="number"  placeholder="Valor" /> 
                        <button type="submit">Salvar</button>
                    </Form>
                </Container> 
     </Modal>
    );
    
}