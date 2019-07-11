import React from "react";
import styled from "styled-components";
import FatText from "../../Components/FatText";
import PropTypes from "prop-types";
import Loader from "../../Components/Loader";
import UserCard from "../../Components/UserCard"
import SquarePost from "../../Components/SquarePost"

const Wrapper = styled.div`
    height:50vh;
`;

const Section = styled.div`
  margin-bottom: 50px;
  display: grid;
  grid-gap: 25px;
  grid-template-columns: repeat(4, 160px);
  grid-template-rows: 160px;
  grid-auto-rows: 160px;
`;

const PostSection = styled(Section)`
  grid-template-columns: repeat(4, 200px);
  grid-template-rows: 200px;
  grid-auto-rows: 200px;
`;

const NoFoundWrapper = styled.div`
    width:100vw;
    height:20vh;
    display:flex;
    justify-content:center;
`


const SearchPresenter = ({searchKeyword, loading, data}) => {

    if (loading ===true){
        return (<Wrapper>
            <Loader/>
        </Wrapper>);
    } else if ((searchKeyword === undefined)||searchKeyword.length ===1 ){
        return <FatText text={"Keyword should be longer than 1"}/>
    } else if (data){
        console.log(data.searchPost)
        return (
            <Wrapper>
              
                {data.searchUser.length === 0 ? (
                  <NoFoundWrapper>
                      <FatText text="No User Found" />
                  </NoFoundWrapper>
                ) : (
                  <Section>  
                  {data.searchUser.map(user => (
                    <UserCard
                      key={user.id}
                      userName={user.userName}
                      isFollowing={user.isFollowing}
                      url={user.avatar}
                      isSelf={user.isSelf}
                      id={user.id}
                    />
                  ))}
                  </Section>
                )}
              
                {data.searchPost.length === 0 ? (
                    <NoFoundWrapper>
                        <FatText text="No Post Found" />
                    </NoFoundWrapper>
                  
                ) : (
                <PostSection>  
                  {data.searchPost.map(post => (
                    <SquarePost
                      key={post.id}
                      likeCount={post.likeCount}
                      commentCount={post.commentCount}
                      file={post.files[0]}
                    />
                  ))}
                </PostSection>
                )}
              
            </Wrapper>
          );
    } 
};

SearchPresenter.propTypes = {
    searchKeyword:PropTypes.string,
    loading:PropTypes.bool
}


export default SearchPresenter;