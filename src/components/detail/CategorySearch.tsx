import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

interface SearchCategoryProps {
  onCategorySearch: (value: string) => void;
}

const SearchCategory: React.FC<SearchCategoryProps> = ({ onCategorySearch }) => {
  const navigator = useNavigate();
  const [searchValue, setSearchValue] = useState('');

  const handleSearch = () => {
    if (searchValue.trim() !== '') {
      onCategorySearch(searchValue);
      console.log(searchValue);
    } else {
      navigator(`/`);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <StyledSearch>
      <StyledSearchCategory
        placeholder="카테고리 검색"
        value={searchValue}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
      />
      <StyledButton onClick={handleSearch}>검색</StyledButton>
    </StyledSearch>
  );
};

export default SearchCategory;

const StyledSearch = styled.div `

`

const StyledSearchCategory = styled.input`
  width: 200px;
  height: 30px;
  font-size: 20px;
`;

const StyledButton = styled.button `
  height: 30px;
`