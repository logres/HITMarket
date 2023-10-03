import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { TestPage } from '@/pages/testPage';
import  MarketPage  from '@/pages/MarketPage';
import  SellPage  from '@/pages/SellPage';
import  MinePage  from '@/pages/MinePage';
import MessagePage from '@/pages/MessagePage';



const AppRouter = () => {

    return (
        <Router>
            <Routes>
                <Route
                    element={<TestPage />}
                    path="/"
                />
                <Route
                    element={<TestPage />}
                    path="/test"
                />
                <Route
                    element={<MarketPage />}
                    path="/market"
                />
                <Route
                    element={<SellPage />}
                    path="/sell"
                />
                <Route
                    element={<MessagePage />}
                    path="/message"
                />
                <Route
                    element={<MinePage />}
                    path="/mine"
                />
            </Routes>
        </Router>
    );

}

export default AppRouter;