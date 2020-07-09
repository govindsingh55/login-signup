import { connect } from 'react-redux';
import React from 'react';
import { signup } from '../actions';
import { Box, Flex, Heading, Stack, Input, Button, Text, Icon } from '@chakra-ui/core';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';

const SignUp = ({ signupUser, token, isSigningUp }) => {
	let history = useHistory();
	const { handleSubmit, register, errors } = useForm();
	const onSubmit = (values, e) => {
		signupUser(values);
		e.target.reset();
	};

	console.log('token change : ', token);
	return (
		<Box className="App">
			<Flex minH="100vh" width="full" align="center" justifyContent="center">
				<Flex as="form" flexDir="column" bg="white" width="60%" alignItems="center" p="5rem" onSubmit={handleSubmit(onSubmit)}>
					<Heading color="teal.400" textAlign="center" mb="3rem">
						Create Account
					</Heading>
					<Stack spacing="2" alignSelf="center" width="50%">
						<Box>
							<Input
								name="userName"
								placeholder="Name"
								size="lg"
                bg="gray.100"
                ref={register({
									required: 'Required',
									minLength: {
										value: 2,
										message: 'name must be 2 character long!'
									}
								})}
							/>
              {errors.userName && (
								<Text color="red.500" fontSize="10px">{`*${errors.userName.message}`}</Text>
							)}
						</Box>
            <Box>
              <Input
                name="email"
                placeholder="Email"
                size="lg"
                bg="gray.100"
                ref={register({
									required: 'Required',
									pattern: {
										value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
										message: 'invalid email address'
									}
								})}
              />
              {errors.email && (
								<Text color="red.500" fontSize="10px">{`*${errors.email.message}`}</Text>
							)}
            </Box>
            <Box>
              <Input
                type="password"
                name="password"
                ref={register({
									required: 'Required',
									minLength: {
										value: 4,
										message: 'password must be 4 character long!'
									}
								})}
                placeholder="Password"
                size="lg"
                bg="gray.100"
              />
							{errors.password && (
								<Text color="red.500" fontSize="10px">{`*${errors.password.message}`}</Text>
							)}
            </Box>
					</Stack>
					<Button
						isLoading={isSigningUp}
						loadingText="SIGNING UP"
            variantColor="teal"
            type="submit"
						mt="2rem"
						width="50%"
						size="lg"
					>
						SIGN UP
					</Button>
					<Button
						variantColor="teal"
						variant="link"
						rightIcon="arrow-forward"
						mt="2rem"
						onClick={() => history.push('/login')}
					>
						Log In
					</Button>
          {!isSigningUp && token && <Icon name="check-circle" mt="1rem" size="50px" color="green.600" />}
				</Flex>
			</Flex>
		</Box>
	);
};

const mapStateToProps = (state) => {
	return {
		token: state.token,
		isSigningUp: state.isSigningUp
	};
};

const mapDispatchToProps = {
	signupUser: signup
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
