import { connect } from 'react-redux';
import React from 'react';
import { login, resetToken } from '../actions';
import { Box, Flex, Heading, Stack, Input, Button, Text, Icon } from '@chakra-ui/core';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';

const Login = ({ loginUser, token, isLoggingIn, loginError, resetToken }) => {
	let history = useHistory();
	const { handleSubmit, register, errors } = useForm();
	const onSubmit = (values, e) => {
		loginUser(values);
		e.target.reset();
	};
	return (
		<Box className="App">
			<Flex minH="100vh" width="full" align="center" justifyContent="center">
				<Flex
					as="form"
					flexDir="column"
					bg="white"
					width="60%"
					alignItems="center"
					p="5rem"
					onSubmit={handleSubmit(onSubmit)}
				>
					<Heading color="teal.400" textAlign="center" mb="3rem">
						Login into Account
					</Heading>
					<Stack spacing="2" alignSelf="center" width="50%">
						<Box>
							<Input
								name="email"
								ref={register({
									required: 'Required',
									pattern: {
										value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
										message: 'invalid email address'
									}
								})}
								placeholder="Email"
								size="lg"
								bg="gray.100"
							/>
							{errors.email && <Text color="red.500" fontSize="10px">{`*${errors.email.message}`}</Text>}
						</Box>
						<Box>
							<Input
								type="password"
								name="password"
								placeholder="Password"
								ref={register({
									required: 'Required',
									minLength: {
										value: 4,
										message: 'password must be 4 character long!'
									}
								})}
								size="lg"
								bg="gray.100"
							/>
							{errors.password && (
								<Text color="red.500" fontSize="10px">{`*${errors.password.message}`}</Text>
							)}
						</Box>
					</Stack>
					<Button
						isLoading={isLoggingIn}
						loadingText="LOGGING IN"
						variantColor="teal"
						mt="2rem"
						width="50%"
						size="lg"
						type="submit"
					>
						LOGIN
					</Button>
					<Button
						variantColor="teal"
						variant="link"
						rightIcon="arrow-forward"
						mt="2rem"
						onClick={() => {
							resetToken();
							history.push('/signup');
						}}
					>
						Sign Up
					</Button>
					{!isLoggingIn && token && <Icon name="check-circle" mt="1rem" size="50px" color="green.600" />}
					{!isLoggingIn && token && <Box color="green.600">{"Auth Sucessfull"}</Box>}
					{!isLoggingIn && (loginError && loginError.message) && <Icon name="check-circle" mt="1rem" size="50px" color="red.600" />}
					{!isLoggingIn && (loginError && loginError.message) && <Box color="red.600">{`${loginError.message}`}</Box>}
				</Flex>
			</Flex>
		</Box>
	);
};

const mapStateToProps = (state) => {
	return {
		token: state.token,
		isLoggingIn: state.isLoggingIn,
		loginError: state.loginErrors,
	};
};

const mapDispatchToProps = {
	loginUser: login,
	resetToken: resetToken
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
