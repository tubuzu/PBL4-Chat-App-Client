import React from "react";
import styled from "styled-components";
import NotFoundImg from "src/assets/404.svg";

const PageContainer = styled.div`
  height: 100%;
  width: 100%;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
`;

function NotFoundPage() {
  return (
    <PageContainer>
      <img src={NotFoundImg} alt="" style={{ height: "20rem" }} />
    </PageContainer>
  );
}

export default NotFoundPage;
