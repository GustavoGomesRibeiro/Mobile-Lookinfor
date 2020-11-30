import React, { useEffect, useState } from 'react';
import { StyleSheet, Image, View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import { requestPermissionsAsync, getCurrentPositionAsync } from 'expo-location';
import { MaterialIcons } from '@expo/vector-icons'
import apiService from '../Services/apiServices';
// import { Header, Left } from 'native-base';

// pegando uma prop´riedade chamada navigation
function Main({ navigation }) {
    const [devs, setDevs] = useState([]);
    const [currentRegion, setCurrentRegion] = useState(null);
    const [techs, setTechs] = useState('');

    useEffect(() => {
        async function loadInitialPosition() {
            const { granted } = await requestPermissionsAsync();
            if (granted) {
                const { coords } = await getCurrentPositionAsync({
                    enableHighAccuracy: true,
                });
                const { latitude, longitude } = coords;
                setCurrentRegion({
                    latitude,
                    longitude,
                    latitudeDelta: 0.04,
                    longitudeDelta: 0.04,
                })
            }
        }
        loadInitialPosition();
    }, []);

    async function loadDevs() {
        const { latitude, longitude } = currentRegion;

        const response = await apiService.get('/search', {
            params: {
                latitude,
                longitude,
                techs,
            }
        });

        console.log(response.data.devs)
        setDevs(response.data.devs);
    }

    // Executa qnd o usuario mexer no mapa fazendo buscar nova localizacao
    function handleRegionChanged(region) {
        console.log(region)
        setCurrentRegion(region);
    }

    if (!currentRegion) {
        return null;
    }

    return (
        <>
            {/* <Header style={{zIndex: 0}}>
                <Left>
                    <MaterialIcons onPress={() => this.props.navigation.openDrawer()} name='menu' size={20} />
                </Left>
            </Header> */}
            <MapView onRegionChangeComplete={handleRegionChanged} initialRegion={currentRegion} style={styles.map}>
                {devs.map(dev => (
                    <Marker 
                    key={dev._id} 
                    coordinate={{ 
                            longitude: dev.location.coordinates[0],
                            latitude: dev.location.coordinates[1],
                        }}>
                        <Image style={styles.avatar} source={{ uri: dev.avatar_url }} />

                        <Callout onPress={() => {
                            //Navegacao
                            navigation.navigate('Profile', { github_username: dev.github_username });
                        }}>
                            <View style={styles.callout}>
                                <Text style={styles.textUser}>{dev.name}</Text>
                                <Text style={styles.textBio}>{dev.bio}</Text>
                                <Text style={styles.textTech}>{dev.techs.join(', ')}</Text>
                            </View>
                        </Callout>
                    </Marker>
                ))}
            </MapView>
            <KeyboardAvoidingView behavior='position'>
                <View style={styles.searchForm}>
                    <TextInput style={styles.searchInput}
                        placeholder='Buscar dev por techs'
                        placeholderTextColor='#999'
                        autoCapitalize='words'
                        autoCorrect={false}
                        value={techs}
                        onChangeText={setTechs}
                    />
                    <TouchableOpacity onPress={loadDevs} style={styles.loadButton}>
                        <MaterialIcons name='my-location' size={20} color='#FFF' />
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </>
    );
}


// Estilo
const styles = StyleSheet.create({
    map: {
        flex: 1
    },
    avatar: {
        width: 54,
        height: 54,
        borderRadius: 4,
        borderWidth: 4,
        borderColor: '#FFF',
    },
    callout: {
        width: 260,
    },
    textUser: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    textBio: {
        color: '#666',
        marginTop: 5,
    },
    textTech: {
        marginTop: 5,
    },
    searchForm: {
        position: "absolute",
        bottom: 20,
        left: 20,
        right: 20,
        zIndex: 5,
        flexDirection: "row",
        height: 100,
    },
    searchInput: {
        flex: 1,
        height: 55,
        backgroundColor: '#FFF',
        color: '#333',
        borderRadius: 25,
        padding: 20,
        fontSize: 16,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset: {
            width: 4,
            height: 4,
        },
        elevation: 2,
    },
    loadButton: {
        width: 50,
        height: 50,
        backgroundColor: '#fc6963',
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 15,
    },
})

export default Main;