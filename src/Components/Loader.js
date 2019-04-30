import React from "react";
import styled, { keyframes } from "styled-components";
const Animation = keyframes`

  0%, 100% {
    animation-timing-function: cubic-bezier(0.5, 0, 1, 0.5);
  }
  0% {
    transform: rotateY(0deg);
  }
  50% {
    transform: rotateY(1800deg);
    animation-timing-function: cubic-bezier(0, 0.5, 0.5, 1);
  }
  100% {
    transform: rotateY(3600deg);
  }
`;

const LoaderWrapper = styled.div`
  display: flex;
  justify-content:center;
  align-items:center;
  transform: translateZ(1px);
`;

const LoadingSpin = styled.div`
  
  width: 36px;
  height: 36px;
  margin-top: 10px;
  border-radius: 50%;
  background: #eef;
  animation: ${Animation} 2.4s cubic-bezier(0, 0.2, 0.8, 1) infinite;
`;

export default () => (
  <LoaderWrapper>
      <LoadingSpin/>
  </LoaderWrapper>
);