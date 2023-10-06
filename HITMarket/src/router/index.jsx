import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { TestPage } from '@/pages/testPage';
import MarketPage from '@/pages/marketPage';
import SellPage from '@/pages/sellPage';
import MinePage from '@/pages/minePage';
import MessagePage from '@/pages/messagePage';
import NewPostPage from '@/pages/newPostPage';



const AppRouter = () => {

    return (
        <Router>
            <Routes>
                <Route
                    element={<MarketPage />}
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
                <Route
                    element={<NewPostPage />}
                    path="/newPost" />
            </Routes>
        </Router>
    );

}

export default AppRouter;