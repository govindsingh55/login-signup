import { connect } from 'react-redux'
import React from 'react';
import {
  Box,
  Flex,
  Heading,
  Stack,
  Input,
  Button
} from '@chakra-ui/core';

const Login = ({
  dispatch,
  token
}) => {
  console.log("token change : ",token)
	return (
		<Box className="App">
			<Flex minH="100vh" width="full" align="center" justifyContent="center">
				<Flex flexDir="column" bg="white" width="60%" alignItems="center" p="5rem">
					<Heading color="teal.400" textAlign="center" mb="3rem">
						Login into Account
					</Heading>
					<Stack spacing="2" alignSelf="center" width="50%">
						<Input name="email" placeholder="Email" size="lg" bg="gray.100" />
						<Input name="password" placeholder="Password" size="lg" bg="gray.100" />
					</Stack>
					<Button mt="2rem" width="50%" bg="teal.400" color="white" size="lg" onClick={() => dispatch({type: "SET_TOKEN", payload: { token: "fajlgsd" }})}>
						LOGIN
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

export default connect(
  mapStateToProps,
)(Login)
