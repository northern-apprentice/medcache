import React, { useState } from "react";
import { Box, Text, Heading, VStack, FormControl, Input, Button, Center, NativeBaseProvider } from "native-base";
//import { ProgressViewIOSComponent } from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Icon } from 'native-base';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import axios from 'axios';
import AppAlert from "../utils/alert";
import {BASE_API_URL} from '../config/devConfig';



export default function Register({ navigation }) {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [confirmPasswordError, setConfirmPasswordError] = useState("");
    const [spinner, setSpinner] = useState(false);
    const [error, setError] = useState(false);
    const [status, setStatus] = useState("");
    const [message, setMessage] = useState("");
    const [isOpen, setIsOpen] = useState(false);


    const registerUser = () => {
        var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
        if (!pattern.test(email)) {
            setEmailError("Please enter valid email address.");
        }
        if (pattern.test(email)) {
            setEmailError("");
        }

        if (password && password.length < 8) {
            setPasswordError("Must have 6 or more characters");
        }
        if (password && password.length >= 8) {
            setPasswordError("");
        }

        if (confirmPassword && confirmPassword.length < 8) {
            setConfirmPasswordError("Must have 6 or more characters");
        }
        if (confirmPassword && confirmPassword.length >= 8) {
            setConfirmPasswordError("");
        }

        if (password && confirmPassword && password === confirmPassword) {
            setConfirmPasswordError("");
        }

        if (password && confirmPassword && password != confirmPassword) {
            setConfirmPasswordError('Password do not match');
        }

        if (emailError || passwordError || confirmPasswordError) {
            setError(true);
        } else {
            setError(false);
        }

        if (!error) {
            sendRegisterUser();
        }
    }

    const sendRegisterUser = () => {
        const headers = {
            "Content-Type": "application/json"
        }

        data = {
            email: email,
            password: password
        }
        setSpinner(true);
        var URL = BASE_API_URL + "/user/register"
        axios.post(URL, data, headers)
            .then(res => {
                console.log(data);
                if (res.status == 201) {
                    console.log(res.data);
                    setSpinner(false);
                    setStatus("success");
                    setMessage(res.message);
                    setIsOpen(true);
                    navigation.navigate('Login');
                }
                if (res.status != 200) {
                    setSpinner(false);
                    setStatus("error");
                    setMessage(res.message);
                    setIsOpen(true);
                }
            })
            .catch(err => {
                setSpinner(false);
                setStatus("error");
                setMessage(err);
                setIsOpen(true);
            });
    }


    return (
        <KeyboardAwareScrollView>
            <NativeBaseProvider>
                {/* <StatusBar/> */}
                <Center flex={1} px="3">
                    <Center w="100%">
                        <Box safeArea p="2" w="90%" maxW="290" py="8">
                            <Heading size="lg" color="coolGray.800" _dark={{
                                color: "warmGray.50"
                            }} fontWeight="semibold">
                                Welcome
                            </Heading>
                            <Heading mt="1" color="coolGray.600" _dark={{
                                color: "warmGray.200"
                            }} fontWeight="medium" size="xs">
                                Sign up to continue!
                            </Heading>
                            <AppAlert status={status} message={message} isOpen={isOpen} />
                            <VStack space={3} mt="5">
                                <FormControl
                                    isRequired
                                    isInvalid={emailError}>
                                    <FormControl.Label>Email</FormControl.Label>
                                    <Input
                                        size="xl"
                                        onChangeText={(text) => setEmail(text)}
                                    />
                                    {emailError &&
                                        <FormControl.ErrorMessage
                                            leftIcon={<Icon as={FontAwesome} name="exclamation" size="xs" />}>
                                            {emailError}
                                        </FormControl.ErrorMessage>}
                                </FormControl>

                                {/* passwordError message */}
                                <FormControl
                                    isRequired
                                    isInvalid={passwordError}>
                                    <FormControl.Label>Password</FormControl.Label>
                                    <Input
                                        type="password"
                                        size="xl"
                                        onChangeText={(text) => setPassword(text)}
                                    />

                                    {passwordError &&
                                        <FormControl.ErrorMessage
                                            leftIcon={<Icon as={FontAwesome}
                                                name="exclamation"
                                                size="xs" />}>

                                            {passwordError}
                                        </FormControl.ErrorMessage>}
                                </FormControl>


                                {/* confirmPassword block */}

                                <FormControl
                                    isRequired
                                    isInvalid={confirmPasswordError}>
                                    <FormControl.Label>Confirm Password</FormControl.Label>
                                    <Input
                                        type="password"
                                        size="xl"
                                        onChangeText={(text) => setConfirmPassword(text)}
                                    />

                                    {/* confirmPasswordError message */}
                                    {confirmPasswordError &&
                                        <FormControl.ErrorMessage
                                            leftIcon={<Icon as={FontAwesome}
                                                name="exclamation"
                                                size="xs" />}>

                                            {confirmPasswordError}
                                        </FormControl.ErrorMessage>}
                                </FormControl>

                                <Button
                                    mt="2"
                                    colorScheme="indigo"
                                    onPress={() => registerUser()}
                                >
                                    Sign up
                                </Button>
                            </VStack>
                        </Box>
                    </Center>
                </Center>
            </NativeBaseProvider>
        </KeyboardAwareScrollView>
    )

}
