import React,{useRef,useCallback} from 'react';
import { useHistory } from 'react-router-dom';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import Input from '../../Components/Input';
import * as Yup from 'yup';
import getValidationErrors from '../../utils/getValidationErrors';

import postImg from '../../assets/logo.png';

import {Container,Content,Image} from './styles';
import { useProducts } from '../../hooks/useProducts';


interface ProductFormData {
    product: string;
    category: string;
    provider: string;
    value: number;
}

const NewProduct: React.FC = () => {

  const formRef = useRef<FormHandles>(null);

  const history = useHistory();

  const { createProduct } = useProducts();

  const handleSubmit = useCallback(async (data: ProductFormData) => {
    try{
        formRef.current?.setErrors({});
    
        const schema = Yup.object().shape({
            product: Yup.string().required('Nome obrigatório'),
            category: Yup.string().required('Categoria obrigatória'),
            provider: Yup.string().required('Fornecedor obrigatório'),
            value: Yup.number().typeError('Valor do produto obrigatório').min(0, 'Min value 0.')
        });
        await schema.validate(data,{
            abortEarly: false
        });

        createProduct(data);
        history.push('/');
      
    } catch(err){
        if (err instanceof Yup.ValidationError) {
            const errors = getValidationErrors(err);
            formRef.current?.setErrors(errors);
        }   
    }
},[]);

return (
        <>
        <Container>
          <Image> 
            <img src={postImg} alt="post" />
          </Image>
          <Content>
            <h5>Novo Produto</h5>
            <Form ref={formRef} onSubmit={handleSubmit}>
                  <Input name="product"  type="text" placeholder="Produto"  />
                  <Input name="category"  type="text"  placeholder="Categoria" /> 
                  <Input name="provider"  type="text"  placeholder="Fornecedor" /> 
                  <Input name="value"  type="number"  placeholder="Valor" /> 
                  <button type="submit">Salvar</button>
            </Form>
          </Content>
        </Container>
        </>
    );
}

export default NewProduct;