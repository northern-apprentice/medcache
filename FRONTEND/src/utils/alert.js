import React, { useState } from "react";
import { Collapse, Alert, IconButton, HStack, VStack, CloseIcon, Text, Center, NativeBaseProvider } from "native-base";

export default function AppAlert(props) {
    const [open, setOpen] = useState(props.isOpen)
    return (
        <NativeBaseProvider>
            <Center>
                <Collapse isOpen={props.isOpen}>
                    <Alert w="100%" status={props.status}>
                        <VStack space={2} flexShrink={1} w="100%">
                            <HStack flexShrink={1} space={2} justifyContent="space-between">
                                <HStack space={2} flexShrink={1}>
                                    <Alert.Icon mt="1" />
                                    <Text fontSize="md" color="coolGray.800">
                                        {props.message}
                                    </Text>
                                </HStack>
                                <IconButton variant="unstyled" icon={<CloseIcon size="3" color="coolGray.600" />} onPress={() => setOpen(false)}/>
                            </HStack>
                        </VStack>
                    </Alert>
                </Collapse>
            </Center>
        </NativeBaseProvider>
    )
}
