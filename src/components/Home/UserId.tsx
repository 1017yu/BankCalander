import { useState } from 'react'
import styled from 'styled-components';
import Home from './Home';

function UserId() {
    const initialUserId = localStorage.getItem('userId') || ''; // userId가 localStroage에 있으면 가져오고, 없으면 빈 값이다.
    const initialIsSubmit = !!localStorage.getItem('userId'); // localStorage에 userId가 없으면 false, 있으면 true가 된다.
    const [userId, setUserId] = useState(initialUserId);
    const [isSubmit, setIsSubmit] = useState(initialIsSubmit)

    const handleUserId = (e: React.ChangeEvent<HTMLInputElement>)=> {
        setUserId(e.target.value);
    };

    const setLocalStorage = () => {
      localStorage.setItem('userId', userId);
      setIsSubmit(true);
    };

    const DeleteLocalStorage = () => {
      localStorage.clear();
      setIsSubmit(false);
      setUserId(''); // 로그아웃을 하면 userId값을 빈 값으로 변경
    }

   

  return (
    <Wrapper>
        {isSubmit ? 
       <>
        <LogOutForm onSubmit={DeleteLocalStorage}>
          <User>{userId}님 환영합니다.</User>
          <LogOutButton type='submit'>로그아웃</LogOutButton>
        </LogOutForm>
        <Home />
       </> : 
        <>
          <LogInForm onSubmit={setLocalStorage}>
            <LogInInput onChange={handleUserId} type="text" placeholder='사용자명을 입력해주세요.'/>
            <LogInButton type='submit' disabled={!userId}>로그인</LogInButton>
          </LogInForm>
          <Home />
        </>
        }
    </Wrapper>
  );
}

const Wrapper = styled.div `
  display: flex;
  justify-content: center;
  padding: 20px;
  align-items: center;
  flex-direction: column;
`;

const User = styled.span `
  font-weight: bold;
`;

const LogOutForm = styled.form `
  height: 25px;
  
`;

const LogOutButton = styled.button `
  margin-left: 10px;
  border-radius: 8px;
  font-weight: bold;

  &:hover {
    background-color: #000;
    color: #fff;
  }
`;

const LogInForm = styled.form `
  height: 25px;
`;

const LogInInput = styled.input `
  line-height: 1.3;
`;

const LogInButton = styled.button `
margin-left: 10px;
border-radius: 8px;
font-weight: bold;

&:hover {
  background-color: #000;
  color: #fff;
}
`;

export default UserId