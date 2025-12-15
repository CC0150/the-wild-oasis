import styled from "styled-components";

export const StyledChatWindow = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: 500px;
  height: 100vh;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  z-index: 2000;
  box-shadow: -5px 0 15px rgba(0, 0, 0, 0.05);
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    "Helvetica Neue", Arial, sans-serif;
`;

export const ChatHeader = styled.div`
  background: #fff;
  border-bottom: 1px solid var(--color-grey-100);
  padding: 16px 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-shrink: 0;
`;

export const ChatBody = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 24px;
  background-color: #fff;

  /* 使用 auto 避免流式输出时的滚动冲突 */
  scroll-behavior: auto;

  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.1);
    border-radius: 3px;
  }
`;

export const ChatFooter = styled.div`
  padding: 20px 24px;
  background-color: #fff;
  border-top: 1px solid var(--color-grey-50);
  flex-shrink: 0;
`;

export const MarkdownWrapper = styled.div`
  word-break: break-word;
  overflow-wrap: break-word;
  font-size: 14px;
  line-height: 1.6;

  & img {
    max-width: 100%;
    border-radius: 8px;
    margin: 8px 0;
  }
  & pre {
    max-width: 100%;
    overflow-x: auto;
    background: #f1f5f9;
    padding: 8px;
    border-radius: 4px;
  }
  & p {
    margin-bottom: 0.5em;
  }
  & p:last-child {
    margin-bottom: 0;
  }
  & ul,
  & ol {
    padding-left: 20px;
  }
`;
