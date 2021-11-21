import { createContext, ReactNode, useContext, useState,useEffect } from 'react'
import { v4 as uuid } from 'uuid';

interface Products {  
    id: string;
    product: string;
    category: string;
    provider: string;
    value: number;
}

interface ProductsProviderProps{
    children: ReactNode
}

interface ProductInput {
    product: string;
    category: string;
    provider: string;
    value: number;
}

interface ProductContextData {
    products: Products[],
    createProduct: (products : ProductInput) => Promise<void>,
    editProduct: (products: Products) => void,
    removeProduct: (products: Products) => void
}

const ProductsContext = createContext<ProductContextData>(
    {} as ProductContextData
);

export function ProductsProvider ({children}: ProductsProviderProps) {
    const [products, setProduct] = useState<Products[]>([]);
    
    useEffect(() => {
        // função responsavel por buscar todos os
        // produtos do localstorage e salvar dentro de products ( variavel responsavel por ser repassada )
        const productList = JSON.parse(localStorage.getItem('products') || '{}');
        if(productList){
            setProduct(productList);
        }
    }, []);

    async function createProduct(productionInput : ProductInput) {
       // Função recebe um object ja validado do formulario, adiciona um ID unico ao mesmo
       // e adiciona ele no localStorage
       const id = uuid();
       const newProducst = {...productionInput,id}
       localStorage.setItem("products", JSON.stringify([ ...products,newProducst]));   
       setProduct([...products, newProducst]);
    }

    function editProduct(productEdit : Products) {
       // Função recebe um object ja validado do formulario, faz um filtro em busca 
       // do index dele dentro da lista de produtos, apos encontrar substitui ele pelo
       // novo objeto a ser armazenado
       const productsStorage = JSON.parse(localStorage.getItem('products') || '{}');
       products[productsStorage.findIndex((item : Products) => item.id === productEdit.id)] = productEdit;
       setProduct(products);
       localStorage.setItem("products", JSON.stringify(products))            
    }


    function removeProduct(productEdit : Products) {
       // Função recebe um object, faz um filtro em busca 
       // do index dele dentro da lista de produtos, apos encontrar remove o item da lista 
       // e atualiza a lista de produtos
        const productsStorage = JSON.parse(localStorage.getItem('products') || '{}');
        const newsProducts = productsStorage.filter((item : Products) => {
            return (item.id !== productEdit.id)
        });
        setProduct(newsProducts);
        localStorage.setItem("products", JSON.stringify(newsProducts))    
        
    }

    return ( 
        // função responsavel por prover( fornecer) os produtos 
        //e as funções de criar, editar e remover entre as paginas da aplicação
        <ProductsContext.Provider value={{products,createProduct,editProduct,removeProduct}}>
            {children}
        </ProductsContext.Provider>)
}

export function useProducts(){
    // função responsavel para facilitar no importação do context API
    return useContext(ProductsContext);
}