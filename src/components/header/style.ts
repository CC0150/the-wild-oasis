import styled from "styled-components";

export const StyledHeaderMenu = styled.ul`
  display: flex;
  gap: 0.4rem;
`;

export const MenuItem = styled.li`
  position: relative;
`;

// 给 Suspense 的 fallback 做一个简单的容器样式
export const LoadingWrapper = styled.div`
  position: absolute;
  top: 5rem;
  right: 0;
  width: 400px;
  height: 600px; /* 与 AIChatWindow 保持一致 */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: 12px;
  box-shadow: var(--shadow-lg);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;
