import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
//! Global Styles
body{
  background-color: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.textColor};
}

//! Styles for the UPPER MENU
.upper-menu{
  color: ${({ theme }) => theme.textColor};
}

.time-mode {
  cursor: pointer;
  transition: all 250ms;
}
.time-mode:hover {
  color: ${({ theme }) => theme.cursor};
}

//! Styles for the TYPING BOX COMPONENT
  .type-box{
    color: ${({ theme }) => theme.typeBoxText};
  }

  .test-over {
    color: ${({ theme }) => theme.textColor};
  }

  .correct {
    color: ${({ theme }) => theme.correct};
  }

  .incorrect {
    color: ${({ theme }) => theme.incorrect};
  }

.current {
    border-left: 1px solid ${({ theme }) => theme.cursor};
    animation: blinking-cursor 2120ms ease infinite;

    @keyframes blinking-cursor {
      0% {
        border-left-color: ${({ theme }) => theme.cursor};
      }
      25% {
        border-left-color: transparent;
      }
      50% {
        border-left-color: ${({ theme }) => theme.cursor};
      }
      75% {
        border-left-color: transparent;
      }
      100% {
        border-left-color: ${({ theme }) => theme.cursor};
      }
    }
  }

  .current-right {
    border-right: 1px solid ${({ theme }) => theme.cursor};
    animation: blinking-cursor-right 2120ms ease infinite;

    @keyframes blinking-cursor-right {
      0% {
        border-right-color: ${({ theme }) => theme.cursor};
      }
      25% {
        border-right-color: transparent;
      }
      50% {
        border-right-color: ${({ theme }) => theme.cursor};
      }
      75% {
        border-right-color: transparent;
      }
      100% {
        border-right-color: ${({ theme }) => theme.cursor};
      }
    }
  }

  .stats{
    color:${({ theme }) => theme.cursor};
  }
`;
