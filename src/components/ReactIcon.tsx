import React from "react";
import styled, { keyframes } from "styled-components";

// Keyframes
const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

// Styled Components
const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 10;
  overflow: hidden;
  background: #333;
`;

const ReactOuter = styled.div`
  display: block;
  position: relative;
  left: 50%;
  top: 50%;
  width: 150px;
  height: 50px;
  margin: -75px 0 0 -75px;
  border-radius: 50%;
  animation: ${spin} 10s linear infinite;
  z-index: 11;

  &::before {
    content: "";
    position: absolute;
    top: 0px;
    left: 0px;
    right: 0px;
    bottom: 0px;
    border-radius: 50%;
    border: 3px solid #61dafb;
    transform: rotate(-120deg);
  }

  &::after {
    content: "";
    position: absolute;
    top: 0px;
    left: 0px;
    right: 0px;
    bottom: 0px;
    border-radius: 50%;
    border: 3px solid #61dafb;
  }
`;

const Inner = styled.div`
  position: absolute;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
  border-radius: 50%;
  border: 3px solid #61dafb;
  transform: rotate(120deg);
`;

const InnerDot = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: #61dafb;
  margin-top: -15px;
  margin-left: -15px;
`;

interface ReactIconProps {
  className?: string;
}

const ReactIcon: React.FC<ReactIconProps> = ({ className }) => {
  return (
    <div className={className}>
      <Wrapper>
        <ReactOuter>
          <Inner />
          <InnerDot />
        </ReactOuter>
      </Wrapper>
    </div>
  );
};

export default ReactIcon;
