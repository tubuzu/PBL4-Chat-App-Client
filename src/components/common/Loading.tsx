import React from "react";
import { Spinner } from "@chakra-ui/react";
import styled from "styled-components";

const Container = styled.div`
  height: 100%;
  width: 100%;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default function Loading() {
  return (
    <Container>
      <Spinner
        thickness="4px"
        speed="0.65s"
        color="white.500"
        size="xl"
      />
    </Container>
  );
}
