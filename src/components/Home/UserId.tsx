import { useState } from 'react';
import styled from 'styled-components';

function UserId() {
  const inittialUserId = localStorage.getItem('userId') || '';
  const initialIsSubmit = !!localStorage.getItem('userId'); // localStorage에 userId가 없으면 false, 있으면 true가 된다.
  const [userId, setUserId] = useState(inittialUserId);
  const [isSubmit, setIsSubmit] = useState(initialIsSubmit);

  const handleUserId = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserId(e.target.value);
  };

  const setLocalStorage = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    localStorage.setItem('userId', userId);
    setIsSubmit(true);
    window.location.reload();
  };

  const DeleteLocalStorage = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    localStorage.clear();
    setIsSubmit(false);
    setUserId(''); // 로그아웃을 하면 userId값을 빈 값으로 변경
    window.location.reload();
  };

  return (
    <Wrapper>
      {isSubmit ? (
        <>
          <LogOutForm onSubmit={DeleteLocalStorage}>
            <User>{userId}님 환영합니다.</User>
            <LogOutButton type="submit">로그아웃</LogOutButton>
          </LogOutForm>
        </>
      ) : (
        <>
          <LogInForm onSubmit={setLocalStorage}>
            <LogInInput
              onChange={handleUserId}
              type="text"
              placeholder="사용자명을 입력해주세요."
            />
            <LogInButton type="submit" disabled={!userId}>
              로그인
            </LogInButton>
          </LogInForm>
        </>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  padding: 20px;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
`;

const User = styled.span`
  font-weight: bold;
`;

const LogOutForm = styled.form`
  height: 25px;
`;

const LogOutButton = styled.button`
  margin-left: 10px;
  font-weight: bold;
  border-radius: 8px;

  &:hover {
    color: #fff;
    background-color: #000;
  }
`;

const LogInForm = styled.form`
  height: 25px;
`;

const LogInInput = styled.input`
  line-height: 1.3;
`;

const LogInButton = styled.button`
  margin-left: 10px;
  font-weight: bold;
  border-radius: 8px;

  &:hover {
    color: #fff;
    background-color: #000;
  }
`;

export default UserId;
