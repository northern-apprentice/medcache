import React, { useState } from 'react';
import { StyleSheet, SafeAreaView, View } from 'react-native';
import { Button } from 'native-base';


export default function Vendors({ navigation }) {

    const [vendors, setVendors] = useState([
        { name: 'Vendor 1', category: 'Category 1', id: 1 },
        { name: 'Vendor 2', category: 'Category 2', id: 2 },
        { name: 'Vendor 3', category: 'Category 3', id: 3 },
        { name: 'Vendor 4', category: 'Category 4', id: 4 }
    ])
    return (
        <View style={styles.container}>

            <Button
                size="lg"
                variant="solid"
                colorScheme="secondary"
                style={styles.button}
                onPress={() => navigation.navigate('Login')}
            >
                Login
            </Button>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        marginHorizontal: 1,
    },
    button: {
        margin: '5%'
    }
});
