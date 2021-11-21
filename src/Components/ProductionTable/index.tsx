import { useProducts } from "../../hooks/useProducts";
import { Container } from "./styles";

interface Product {
    id: string;
    product: string;
    category: string;
    provider: string;
    value: number;
}

interface ProductionTableProps{
    onOpenEditProductModal: (product: Product) => void;
}
  
export function ProductionTable({onOpenEditProductModal} : ProductionTableProps){

    const { products,removeProduct } = useProducts();
    
    return (
       <Container>
           <table>
               <thead>
                   <tr>
                       <th>Nome</th>
                       <th>Categoria</th>
                       <th>Fornecedor</th>
                       <th>Valor</th>
                       <th>Editar</th>
                       <th>Remover</th>
                   </tr>
               </thead>
               <tbody>
                   
               {(products.length > 0) ?  
                    products.map(product => {
                            return (
                                <tr key={product.id}>
                                <td>{product.product}</td>
                                <td>{product.category}</td>
                                <td>{product.provider}</td>
                                <td>
                                    {new Intl.NumberFormat('pt-BR', {
                                        style: 'currency', 
                                        currency: 'BRL'
                                    }).format(product.value)}
                                </td>
                                <td>
                                    <button type="button" onClick={() => onOpenEditProductModal(product)} ><span>Editar</span></button>
                                </td>
                                <td>
                                    <button type="button" onClick={() => removeProduct(product)}><span>Remover</span></button>
                                </td>
                            </tr>
                       )
                    }) 
                :  <tr>
                     <td className="not-text" colSpan={6}>Nenhum produto encontrado</td>
                   </tr>
                   }
               </tbody>
           </table>
       </Container>
    );
}