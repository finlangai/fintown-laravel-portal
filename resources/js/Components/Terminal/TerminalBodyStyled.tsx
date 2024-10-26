import styled from "styled-components";

export const TerminalBody = styled.div`
  &::-webkit-scrollbar {
    width: 4px;
    opacity: 0.1;
  }

  &::-webkit-scrollbar-track {
    background: none;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #c9c9c9;
    border-radius: 10px;
    size: 4px;
  }
`;
