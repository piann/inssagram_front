import React from "react";
import styled from "styled-components";
import FatText from "../../Components/FatText";
import PropTypes from "prop-types";


const Wrapper = styled.div`
    height:50vh;
    text-align:center;
`;



const SearchPresenter = ({searchKeyword, loading, data}) => (
    <Wrapper>
        {((searchKeyword === undefined)||searchKeyword.length ===1 )
        && <FatText text={"keyword should be longer than 1"}/>}
    </Wrapper>
);

SearchPresenter.propTypes = {
    searchKeyword:PropTypes.string,
    loading:PropTypes.bool
}


export default SearchPresenter;