import { connect } from 'react-redux'
import React from 'react';
import { signup } from "../actions";
import {
  Box,
  Flex,
  Heading,
  Stack,
  Input,
  Button
} from '@chakra-ui/core';
import { useState } from 'react';

const SignUp = ({
  signupUser,
  token
}) => {
  const  [user, setUser] = useState ({
    userName: "",
    email: "",
    password: ""
  })
  // console.log("token change : ",user)
	return (
		<Box className="App">
			<Flex minH="100vh" width="full" align="center" justifyContent="center">
				<Flex flexDir="column" bg="white" width="60%" alignItems="center" p="5rem">
					<Heading color="teal.400" textAlign="center" mb="3rem">
						Create Account
					</Heading>
					<Stack spacing="2" alignSelf="center" width="50%">
						<Input name="name" value={user.userName} placeholder="Name" size="lg" bg="gray.100" onChange={(e) => setUser({...user, userName: e.target.value})}/>
						<Input name="email" value={user.email} placeholder="Email" size="lg" bg="gray.100" onChange={(e) => setUser({...user, email: e.target.value})}/>
						<Input type="password" name="password" value={user.password} placeholder="Password" size="lg" bg="gray.100" onChange={(e) => setUser({...user, password: e.target.value})}/>
					</Stack>
					<Button mt="2rem" width="50%" bg="teal.400" color="white" size="lg" onClick={() => signupUser(user)}>
						SIGN UP
					</Button>
				</Flex>
			</Flex>
		</Box>
	);
};

const mapStateToProps = (state) => {
  return {
    token: state.token
  }
}

const mapDispatchToProps = {
  signupUser: signup
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUp)
