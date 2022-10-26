
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import styled from "styled-components"
import { fetchCoins } from "../api";
import { Helmet } from "react-helmet";
import { useSetRecoilState } from "recoil";
import { isDarkAtom } from "../atom";
const Title = styled.h1`
    color : ${props => props.theme.accentColor};
    font-size: 48px;
`;

const Container = styled.div`
    padding: 0px 20px;
    max-width: 480px;
    margin : 0 auto;
`;

const Loader = styled.span`
    text-align: center;
`;

const Header = styled.header`
height: 10vh;
display: flex;
justify-content: center;
align-items: center;
`;

const CoinList = styled.ul``;

const Img = styled.img`
    width: 35px;
    height: 35px;
    margin-right: 10px;
`;

const Coin = styled.li`
background-color: white;
color:${ props => props.theme.textColor};
margin-bottom: 10px;
padding : 20px;
border-radius: 15px;
a {
    transition: color 0.2s ease-in;
    display: flex;
    align-items: center;
}
&:hover {
    a {
        color : ${props => props.theme.accentColor};
    };
};
`;


interface ICoin { 

    id: string,
    name: string,
    symbol: string,
    rank: number,
    is_new: boolean,
    is_active: boolean,
    type: string,
    
}

interface ICoinProps  {
}

function Coins() {
    const { isLoading, data } = useQuery<ICoin[]>("allCoins", fetchCoins);
    const setDarkAtom = useSetRecoilState(isDarkAtom);
    const toggleDarkAtom = () => setDarkAtom(prev => !prev);
    // const [coins, setCoins] = useState<CoinInterface[]>([]);
    // const [loading, setLoading] = useState(true);
    // useEffect(() => {
    //     (async () => {
    //         const responce = await fetch("https://api.coinpaprika.com/v1/coins");
    //         const json = await responce.json();
    //         setCoins(json.slice(0, 100));
    //         setLoading(false);
    //     })()
    // }, [])
    return (
        <Container>
            <Helmet>
                <title>코인</title>
            </Helmet>
            <Header>
                <Title>코인</Title>
                <button onClick={toggleDarkAtom}>Toggle Mode</button>
            </Header>
            {isLoading ?  (<Loader>Loading...</Loader>) : (<CoinList>
                {data?.slice(0, 100).map(coin => <Coin key={coin.id}>
                    <Link to={`/${coin.id}`} state= {coin} >
                        <Img src={`https://cryptocurrencyliveprices.com/img/${coin.id}.png`} />
                        {coin.name} &rarr;
                    </Link>
                </Coin>)}
            </CoinList>)}
        </Container>
    )
}

export default Coins