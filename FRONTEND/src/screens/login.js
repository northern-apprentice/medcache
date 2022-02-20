import React, { useState, useCallback } from "react";
import { Box, Text, Heading, VStack, FormControl, Input, Link, Button, HStack, Center, NativeBaseProvider } from "native-base";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useDispatch } from 'react-redux';
import { Icon } from 'native-base';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import { login } from "../actions/user/loginAction";


export default function Login({ navigation }) {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [error, setError] = useState(false);
    const dispatchLogin = useDispatch()



    const onSubmit = (event) => {
        event.preventDefault();
        console.log("running");
        console.log(emailError);
        var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
        if (!pattern.test(email)) {
            setEmailError("Please enter valid email address.");
        }
        if (pattern.test(email)) {
            setEmailError("");
        }

        if (password && password.length == 0) {
            setPasswordError("Invalid password")
        }
        if (password && password.length > 0) {
            setPasswordError("");
        }

        if (emailError || passwordError) {
            setError(true);
        } else {
            setError(false);
        }

        if (!error) {
            sendLoginRequest();
        }
    }

    const sendLoginRequest = () => {
        console.log("sending login request");
        const headers = {
            "Content-Type": "application/json"
        }

        const data = {
            email: email,
            password: password
        }
       dispatchLogin(login(data, headers, navigation));
    }

    return (
        <KeyboardAwareScrollView>
            <NativeBaseProvider>
                <Center flex={1} px="3">
                    <Center w="100%">
                        <Box safeArea p="2" py="8" w="90%" maxW="290">
                            <Heading size="lg" fontWeight="600" color="coolGray.800" _dark={{
                                color: "warmGray.50"
                            }}>
                                Welcome
                            </Heading>
                            <Heading mt="1" _dark={{
                                color: "warmGray.200"
                            }} color="coolGray.600" fontWeight="medium" size="xs">
                                Sign in to continue!
                            </Heading>

                            <VStack space={3} mt="5">
                                <FormControl
                                    isRequired
                                    isInvalid={emailError}>
                                    <FormControl.Label>Email ID</FormControl.Label>
                                    <Input size="xl"
                                        onChangeText={(text) => setEmail(text)} />
                                    {emailError &&
                                        <FormControl.ErrorMessage
                                            leftIcon={<Icon as={FontAwesome} name="exclamation" size="xs" />}>
                                            {emailError}
                                        </FormControl.ErrorMessage>}
                                </FormControl>
                                <FormControl
                                    isRequired
                                    isInvalid={passwordError}>
                                    <FormControl.Label>Password</FormControl.Label>
                                    <Input type="password" size="xl"
                                        onChangeText={(text) => setPassword(text)} />
                                    {passwordError &&
                                        <FormControl.ErrorMessage
                                            leftIcon={<Icon as={FontAwesome} name="exclamation" size="xs" />}>
                                            {passwordError}
                                        </FormControl.ErrorMessage>}
                                    <Link _text={{
                                        fontSize: "xs",
                                        fontWeight: "500",
                                        color: "indigo.500"
                                    }} alignSelf="flex-end" mt="1">
                                        Forget Password?
                                    </Link>
                                </FormControl>
                                <Button
                                    mt="2"
                                    colorScheme="indigo"
                                    onPress={(event) => onSubmit(event)}
                                >
                                    Sign in
                                </Button>
                                <HStack mt="6" justifyContent="center">
                                    <Text fontSize="sm" color="coolGray.600" _dark={{
                                        color: "warmGray.200"
                                    }}>
                                        I'm a new user.{" "}
                                    </Text>
                                    <Link
                                        _text={{
                                            color: "indigo.500",
                                            fontWeight: "medium",
                                            fontSize: "sm"
                                        }}
                                        onPress={() => navigation.navigate("Register")}
                                    >
                                        Sign Up
                                    </Link>
                                </HStack>
                            </VStack>
                        </Box>
                    </Center>
                </Center>
            </NativeBaseProvider>
        </KeyboardAwareScrollView>
    );
};
