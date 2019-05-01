import React, {useState, useEffect} from "react";
import { useMutation } from "react-apollo-hooks";
import PropTypes from "prop-types";
import useInput from "../../Hooks/useInput";
import PostPresenter from "./PostPresenter";
import {TOGGLE_LIKE} from "./PostQueries";


const PostContainer = ({
    id,
    user,
    files,
    likeCount,
    isLiked,
    comments,
    location,
    caption,
    createdAt
}) =>{
    const [isLikedState, setIsLiked] = useState(isLiked);
    const [likeCountState, setLikeCount] = useState(likeCount);
    const [currentItem, setCurrentItem] = useState(0);
    const toggleLikeMutation = useMutation(TOGGLE_LIKE,{
        variables: {
          postId: id,
        }
    });
    const slide = () => {
        const totalFiles = files.length;
        if (currentItem === totalFiles - 1) {
          setTimeout(() => setCurrentItem(0), 2000);
        } else {
          setTimeout(() => setCurrentItem(currentItem + 1), 2000);
        }
      };
    useEffect(()=>{
        slide();
    }, [currentItem]);
    const comment = useInput("");
    const toggleLike = () => {
        
        if(isLikedState){
            setLikeCount(likeCountState-1);
        } else {
            setLikeCount(likeCountState+1);
        }
        setIsLiked(!isLikedState);
        toggleLikeMutation();
        
      ;
    }



    return <PostPresenter 
    user={user}
    files={files}
    likeCount={likeCountState}
    isLiked={isLikedState}
    comments={comments}
    newComment={comment}
    setIsLiked={setIsLiked}
    setLikeCount={setLikeCount}
    location={location}
    caption={caption}
    createdAt={createdAt}
    currentItem={currentItem}
    toggleLike={toggleLike}
    />;
    
}

PostContainer.propTypes = {
  id: PropTypes.string.isRequired,
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
    avatar: PropTypes.string,
    userName: PropTypes.string.isRequired
  }).isRequired,
  files: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired
    })
  ).isRequired,
  likeCount: PropTypes.number.isRequired,
  isLiked: PropTypes.bool.isRequired,
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      user: PropTypes.shape({
        id: PropTypes.string.isRequired,
        username: PropTypes.string.isRequired
      }).isRequired
    })
  ).isRequired,
  caption: PropTypes.string.isRequired,
  location: PropTypes.string,
  createdAt: PropTypes.string.isRequired        
}

export default PostContainer;