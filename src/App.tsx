import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import { styled } from 'styled-components';
import Header from '@/components/common/Header';
import NotFound from '@/components/common/NotFound';
import Button from './components/common/Button';
import Detail from '@/components/detail/Detail';

const App = () => {
  const [count, setCount] = useState(0);

  const onClick = () => {
    setCount((prev) => prev + 1);
  };

  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/detail' element = {<Detail />}></Route>
          {/* <Route path="/" element={<Main />}></Route> */}
          {/* 상단에 위치하는 라우트들의 규칙을 모두 확인, 일치하는 라우트가 없는경우 처리 */}
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
        <Counter onClick={onClick}>{count}</Counter>
        <Button green="true" />
        <Button lightgreen="true" />
        <Button red="true" />
      </BrowserRouter>
    </div>
  );
};

const Counter = styled.div``;

export default App;
