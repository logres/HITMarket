import MainFrame from '@/components/mainFrame';


const MarketPage = () => {

    const content = [1,2,3,4,5,6,7,8,9,10,
        11,12,3,42,42,43124,213,213,123,123,21,321,321,321,3,123,21,321,3,213,21,321,3,123,21,3213,12,1,1,1,1,1,1
    ];

    return (
        <MainFrame pageState={'market'} >
            <div>MarketPage</div>
            <div>{window.screen.height}</div>
            <div>{window.screen.width}</div>
            {content.map(item=>(<div>{item}</div>))}
        </MainFrame>
    );
}

export default MarketPage;