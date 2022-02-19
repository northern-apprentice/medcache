import React, {useState} from "react";
import { Box, Text, Heading, VStack, FormControl, Input, Link, Button, HStack, Center, NativeBaseProvider } from "native-base";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'


export default function Home({ navigation }) {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [error, setError] = useState(false);


    const onSubmit = (event) => {
        event.preventDefault();
        var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
        if (!pattern.test(email)) {
            setEmailError("Please enter valid email address.");
        }
        if (pattern.test(email)) {
            setEmailError("");
        }

        if (password && password.length==0) {
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
            sendLoginRequest()
        }
    }

    const sendLoginRequest = () =>{
        // to implement
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
                        
                        </Box>
                    </Center>
                </Center>
            </NativeBaseProvider>
        </KeyboardAwareScrollView>
    );
};
