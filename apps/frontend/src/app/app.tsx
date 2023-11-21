import { Route, Routes } from 'react-router-dom';
import { StartPage } from './pages/start/start.page';
import { NotFoundPage } from './pages/not-found/not-found.page';

export function App() {
  return (
    <Routes>
      <Route path={'/'} element={<StartPage />} />
      <Route path='*' element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
