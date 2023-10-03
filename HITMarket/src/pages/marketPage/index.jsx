import MainFrame from '@/components/mainFrame';

const MarketPage = () => {
    return (
        <MainFrame pageState={'market'} >
            <div>MarketPage</div>
            <div>{window.screen.height}</div>
            <div>{window.screen.width}</div>
        </MainFrame>
    );
}

export default MarketPage;