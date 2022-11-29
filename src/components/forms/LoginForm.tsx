import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { VStack } from "@chakra-ui/layout";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginThunk } from "src/store/authenticationSlice";
import { AppDispatch } from "src/store";
import { useToastHook } from "src/utils/hooks/useToast";

const LoginForm = () => {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { success, error } = useToastHook();

  const submitHandler = async () => {
    setLoading(true);
    if (!email || !password) {
      error("Please Fill all the Feilds");
      setLoading(false);
      return;
    }

    dispatch(loginThunk({ email, password }))
      .unwrap()
      .then(() => {
        success("Login Successful");
        setLoading(false);
        navigate("/home/conversations");
      })
      .catch((err: any) => {
        console.log(err);
        setLoading(false);
      });
  };

  return (
    <VStack spacing="10px">
      <FormControl id="loginEmail" isRequired>
        <FormLabel color="white">Email Address</FormLabel>
        <Input
          variant="filled"
          sx={{ backgroundColor: "var(--input-background)", color: "white" }}
          _hover={{ backgroundColor: "var(--input-background)" }}
          value={email}
          type="email"
          placeholder="Enter Your Email Address"
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>
      <FormControl id="loginPassword" isRequired>
        <FormLabel color="white">Password</FormLabel>
        <InputGroup size="md">
          <Input
            variant="filled"
            sx={{ backgroundColor: "var(--input-background)", color: "white" }}
            _hover={{ backgroundColor: "var(--input-background)" }}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type={show ? "text" : "password"}
            placeholder="Enter password"
          />
          <InputRightElement width="4.5rem">
            <Button
              sx={{
                backgroundColor: "var(--main-form-background)",
                color: "white",
              }}
              _hover={{ backgroundColor: "#5f5f5f" }}
              h="1.75rem"
              size="sm"
              onClick={handleClick}
            >
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <Button
        colorScheme="blue"
        width="100%"
        style={{ marginTop: 15 }}
        onClick={submitHandler}
        isLoading={loading}
      >
        Login
      </Button>
      <Button
        variant="solid"
        colorScheme="red"
        width="100%"
        onClick={() => {
          setEmail("guest@example.com");
          setPassword("123456");
        }}
      >
        Get Guest User Credentials
      </Button>
    </VStack>
  );
};

export default LoginForm;
