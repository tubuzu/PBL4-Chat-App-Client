import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { VStack } from "@chakra-ui/layout";
import { useToast } from "@chakra-ui/toast";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { registerThunk } from "src/store/authenticationSlice";

const Signup = () => {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const toast = useToast();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [username, setUsername] = useState();
  const [firstname, setFirstname] = useState();
  const [lastname, setLastname] = useState();
  const [email, setEmail] = useState();
  const [confirmpassword, setConfirmpassword] = useState();
  const [password, setPassword] = useState();
  // const [rawAvatar, setRawAvatar] = useState();
  // const [avatar, setAvatar] = useState();
  const [loading, setLoading] = useState(false);

  const submitHandler = async () => {
    setLoading(true);
    // const data = new FormData();
    // data.append("file", rawAvatar);
    // data.append("upload_preset", "chat-app");
    // data.append("cloud_name", "tubuzu-cloud");
    // fetch("https://api.cloudinary.com/v1_1/tubuzu-cloud/image/upload", {
    //   method: "post",
    //   body: data,
    // })
    //   .then((res) => res.json())
    //   .then((data) => {
    //     setAvatar(data.url.toString());
    //     // console.log(data.url.toString());
    //     setAvatarLoading(false);
    //     return data.url.toString();
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //     setAvatarLoading(false);
    //     return '';
    //   });
    if (!username || !firstname || !lastname || !email || !password || !confirmpassword) {
      toast({
        title: "Please Fill all the Fields",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      setLoading(false);
      return;
    }
    if (password !== confirmpassword) {
      toast({
        title: "Passwords Do Not Match",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      return;
    }

    dispatch(registerThunk({ username, firstname, lastname, email, password }))
      .unwrap()
      .then(({ data }) => {
        console.log(data);
        toast({
          title: "Registration Successful",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
        setLoading(false);
        navigate("/home/conversations");
      })
      .catch((err) => {
        console.log(err);
        toast({
          title: "Error Occured!",
          description: err.response.data.message,
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
        setLoading(false);
      })
  };

  // const postDetails = (ava) => {
  //   setRawAvatar(ava)
  //   if (ava === undefined) {
  //     toast({
  //       title: "Please Select an Image!",
  //       status: "warning",
  //       duration: 5000,
  //       isClosable: true,
  //       position: "top",
  //     });
  //     return;
  //   }
  //   if (ava.type !== "image/jpeg" && ava.type !== "image/png") {
  //     toast({
  //       title: "Please Select an Image!",
  //       status: "warning",
  //       duration: 5000,
  //       isClosable: true,
  //       position: "top",
  //     });
  //     return;
  //   }
  // };

  return (
    <VStack spacing="5px">
      <FormControl id="username-name" isRequired>
        <FormLabel color="white">Username</FormLabel>
        <Input
          variant="filled"
          sx={{ backgroundColor: 'var(--input-background)', color: 'white' }}
          _hover={{ backgroundColor: 'var(--input-background)' }}
          placeholder="Enter Your User Name"
          onChange={(e) => setUsername(e.target.value)}
        />
      </FormControl>
      <FormControl id="first-name" isRequired>
        <FormLabel color="white">First name</FormLabel>
        <Input
          variant="filled"
          sx={{ backgroundColor: 'var(--input-background)', color: 'white' }}
          _hover={{ backgroundColor: 'var(--input-background)' }}
          placeholder="Enter Your First Name"
          onChange={(e) => setFirstname(e.target.value)}
        />
      </FormControl>
      <FormControl id="last-name" isRequired>
        <FormLabel color="white">Last name</FormLabel>
        <Input
          variant="filled"
          sx={{ backgroundColor: 'var(--input-background)', color: 'white' }}
          _hover={{ backgroundColor: 'var(--input-background)' }}
          placeholder="Enter Your Last Name"
          onChange={(e) => setLastname(e.target.value)}
        />
      </FormControl>
      <FormControl id="registerEmail" isRequired>
        <FormLabel color="white">Email Address</FormLabel>
        <Input
          variant="filled"
          sx={{ backgroundColor: 'var(--input-background)', color: 'white' }}
          _hover={{ backgroundColor: 'var(--input-background)' }}
          type="email"
          placeholder="Enter Your Email Address"
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>
      <FormControl id="registerPassword" isRequired>
        <FormLabel color="white">Password</FormLabel>
        <InputGroup size="md">
          <Input
            variant="filled"
            sx={{ backgroundColor: 'var(--input-background)', color: 'white' }}
            _hover={{ backgroundColor: 'var(--input-background)' }}
            type={show ? "text" : "password"}
            placeholder="Enter Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <InputRightElement width="4.5rem">
            <Button sx={{ backgroundColor: 'var(--main-form-background)', color: 'white' }} _hover={{ backgroundColor: '#5f5f5f' }} h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <FormControl id="registerComfirmPassword" isRequired>
        <FormLabel color="white">Confirm Password</FormLabel>
        <InputGroup size="md">
          <Input
            variant="filled"
            sx={{ backgroundColor: 'var(--input-background)', color: 'white' }}
            _hover={{ backgroundColor: 'var(--input-background)' }}
            type={show ? "text" : "password"}
            placeholder="Confirm password"
            onChange={(e) => setConfirmpassword(e.target.value)}
          />
          <InputRightElement width="4.5rem">
            <Button sx={{ backgroundColor: 'var(--main-form-background)', color: 'white' }} _hover={{ backgroundColor: '#5f5f5f' }} h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      {/* <FormControl id="avatar">
        <FormLabel color="white">Upload your Avatar</FormLabel>
        <Input
          variant="filled"
          sx={{
            backgroundColor: 'var(--input-background)', color: 'white', height: 'fit-content', 'input#file-upload-button': {
              backgroundColor: 'black'
            }
          }}
          _hover={{ backgroundColor: 'var(--input-background)' }}
          type="file"
          p={1.5}
          accept="image/*"
          onChange={(e) => postDetails(e.target.files[0])}
        />
      </FormControl> */}
      <Button
        colorScheme="blue"
        width="100%"
        style={{ marginTop: 15 }}
        onClick={submitHandler}
        isLoading={loading}
      >
        Sign Up
      </Button>
    </VStack>
  );
};

export default Signup;
