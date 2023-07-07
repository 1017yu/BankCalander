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
      navigator(`/detail/q=${searchValue}`);
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
    <div>
      <StyledSearchCategory
        placeholder="카테고리 검색"
        value={searchValue}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
      />
      <button onClick={handleSearch}>검색</button>
    </div>
  );
};

export default SearchCategory;

const StyledSearchCategory = styled.input``;