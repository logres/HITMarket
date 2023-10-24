import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { TestPage } from '@/pages/testPage';
import MarketPage from '@/pages/marketPage';
import SellPage from '@/pages/marketPage';
import MinePage from '@/pages/minePage';
import MessagePage from '@/pages/messagePage';
import NewPostPage from '@/pages/newPostPage';
import MarketDetailPage from '@/pages/marketPage/marketDetailPage';
import PersonInfoPage from '@/pages/personInfoPage';
import NewReplyPage from '@/pages/newReplyPage';
import FavoritePage from '@/pages/FavoritePage';
import MyPostPage from '@/pages/MyPostPage';
import LoadingPage from '@/pages/LoadingPage';


const AppRouter = () => {

    return (
        <Router>
            <Routes>
                <Route
                    element={<NewReplyPage />}
                    path="/newReply/:postId" />
                <Route
                    element={<LoadingPage />}
                    path="/"
                />
                <Route
                    element={<TestPage />}
                    path="/test"
                />
                <Route
                    element={<MarketPage kind='buy' key='buy' />}
                    path="/market"
                />
                <Route
                    element={<SellPage kind='sell' key='sell' />}
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
                <Route
                    element={<MarketDetailPage kind='buy' key='buyDetail' />}
                    path="/marketDetail/:postId" />
                <Route
                    element={<MarketDetailPage kind='sell' key='sellDetail' />}
                    path="/sellDetail/:postId" />
                <Route
                    element={<PersonInfoPage />}
                    path="/personInfo/:userId" />
                <Route
                    element={<FavoritePage />}
                    path="/favorite" />
                <Route
                    element={<MyPostPage />}
                    path="/myPost" />
            </Routes>
        </Router>
    );

}

export default AppRouter;