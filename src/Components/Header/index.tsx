import { Link } from 'react-router-dom';

import LogoImg from '../../assets/logo.png';

import { Container, Content } from "./styles"

export function Header(){

    return(
        <Container>
           <Content>
                <img src={LogoImg} alt="dt-money"/>
                <Link to='newProduct' >
                    <span>Novo Produto</span>
                </Link>
           </Content> 
        </Container>
    )
}