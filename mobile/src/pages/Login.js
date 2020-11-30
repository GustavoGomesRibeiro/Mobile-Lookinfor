import React,{ Component } from 'react';
import { StyleSheet, View, Text, Dimensions, TextInput, TouchableOpacity, AsyncStorage, Alert, KeyboardAvoidingView} from 'react-native';
import Svg, { Image, Circle, ClipPath } from 'react-native-svg';
// import { Asset } from 'expo-asset';
import Animated, {Easing} from 'react-native-reanimated';
import {TapGestureHandler, State} from 'react-native-gesture-handler'
import apiService from '../Services/apiServices';


const { width, height } = Dimensions.get('window');
const {Value, event, block, cond, eq, set, Clock, startClock, stopClock, debug, timing, clockRunning, interpolate, Extrapolate, concat } = Animated 

function runTiming(clock, value, dest) {
    const state = {
        finished: new Value(0),
        position: new Value(0),
        time: new Value (0),
        frameTime: new Value(0),
    };

    const config = {
        duration: 1000,
        toValue: new Value(0),
        easing: Easing.inOut(Easing.ease),
    };

    return block([
        cond(clockRunning(clock), 0, [
            set(state.finished,0),
            set(state.time,0),
            set(state.position,value),
            set(state.frameTime,0),
            set(config.toValue, dest),
            startClock(clock),
        ]),
        timing(clock, state, config),
        cond (state.finished, debug('stop clock', stopClock(clock))),
        state.position,
    ]);
}

class Login extends Component {
    constructor(props){
        super(props)
        
        this.state = {
            username:'',
            password:'',
            token:'',
            error:''
        }

        this.buttonOpacity = new Value(1)
        this.onStateChange = event ([
            {
                nativeEvent: ({state}) => block([
                    cond(eq(state, State.END), 
                    set(this.buttonOpacity,runTiming(new Clock(), 1 ,0))
            )])
            }
        ]);

        this.closeButton = event ([
            {
                nativeEvent: ({state}) => block([
                    cond(eq(state, State.END), 
                    set(this.buttonOpacity,runTiming(new Clock(), 0 ,1))
            )])
            }
        ]);


        this.buttonY = interpolate(this.buttonOpacity,{
            inputRange: [0,1],
            outputRange: [100,0],
            extrapolate: Extrapolate.CLAMP
        });

        this.bgY = interpolate(this.buttonOpacity, {
            inputRange: [0,1],
            outputRange: [-height / 3 - 250, 0],
            extrapolate: Extrapolate.CLAMP
        });

        this.textInputOpacity = interpolate(this.buttonOpacity, {
            inputRange: [0,1],
            outputRange: [1,0],
            extrapolate: Extrapolate.CLAMP
        });
        this.textInputZindex = interpolate(this.buttonOpacity, {
            inputRange: [0,1],
            outputRange: [1,-1],
            extrapolate: Extrapolate.CLAMP
        });
        this.textInputY = interpolate(this.buttonOpacity, {
            inputRange: [0,1],
            outputRange: [0,100],
            extrapolate: Extrapolate.CLAMP
        });
        this.rotateCross = interpolate(this.buttonOpacity, {
            inputRange: [0,1],
            outputRange: [180,360],
            extrapolate: Extrapolate.CLAMP
        });
    }

      handleUsernameChange = (username) => {
        this.setState({ username });
      };
      
      handlePasswordChange = (password) => {
        this.setState({ password });
      };

      login = async () => {
        if (!this.state.username || !this.state.password) {
            Alert.alert('Campos Inválidos', 
                'Preencha usuário e senha para continuar!')
        } else {
          try {
            const { navigation } = this.props
            const response = await apiService.post('/login', {
              username: this.state.username,
              password: this.state.password,
            });
              console.log(response, 'Teste de login')
            await AsyncStorage.setItem('@LookingApp:token', response.data.token);
            this.props.navigation.navigate('Main');
          } catch (err) {
            Alert.alert('Login Inválido',
                        'Houve um problema com o login, verifique suas credenciais!')
          }
        }
      };

    //ao recarregar a aplicação manter o token
     async componentDidMount(){
        //  const username = JSON.parse(await AsyncStorage.getItem('username', username));
         const token = await AsyncStorage.getItem('@LookingApp:token', token);
        //  const password = await AsyncStorage.getItem('password', password);
      }

    
    render() {
        // const { navigation } = this.props
        return(
            <>
                <View style={{flex: 1, backgroundColor:'white', justifyContent: 'flex-end'}}>
                    <Animated.View style={{...StyleSheet.absoluteFill, transform:[{translateY: this.bgY}]}}>
                        <Svg height={height + 50 } width={width}>
                            <ClipPath id='clip'>
                                <Circle r={height + 50} cx={width / 2}/>
                            </ClipPath>
                            <Image
                            href={require('../assets/destinymen.jpg')}
                            width={width}
                            height={height + 50}
                            preserveAspectRatio='xMidYMid slice'
                            clipPath='url(#clip)'
                            />
                        </Svg>
                    </Animated.View>
                    <View style={{height: height / 3}}>
                        <TapGestureHandler onHandlerStateChange={this.onStateChange}>
                            <Animated.View style={{...styles.button, opacity: this.buttonOpacity, transform: [{translateY: this.buttonY}]}}>
                                <Text style={styles.textoLogin}>Login</Text>
                            </Animated.View>
                        </TapGestureHandler>
                        <Animated.View style={{...styles.buttonGit, opacity: this.buttonOpacity, transform: [{translateY: this.buttonY}]}}>
                            <Text style={styles.textoLoginGit}>Registrar</Text>
                        </Animated.View>
                        <Animated.View style={{ opacity: this.textInputOpacity ,zIndex:this.textInputZindex, transform:[{translateY: this.textInputY}],height: height / 1.1, ...StyleSheet.absoluteFill, top:null, justifyContent: 'center'}}>
                            <TapGestureHandler onHandlerStateChange={this.closeButton}>
                                <Animated.View style={styles.closeButton}>
                                    <Animated.Text style={{fontSize: 15, transform: [{rotate: concat(this.rotateCross, 'deg')}]}}>X</Animated.Text>
                                </Animated.View>
                            </TapGestureHandler>
                            <KeyboardAvoidingView behavior='position'>
                                <TextInput
                                placeholder='Username'
                                style={styles.textInput}
                                placeholderTextColor='black'
                                value={this.state.username}
                                onChangeText={this.handleUsernameChange}
                                autoCapitalize='none'/>
                                
                                <TextInput
                                placeholder='Password'
                                style={styles.textInput}
                                secureTextEntry={true}
                                placeholderTextColor='black'
                                value={this.state.password}
                                onChangeText={this.handlePasswordChange}
                                />
                             </KeyboardAvoidingView>
                            <Animated.View style={styles.button}>
                                <TouchableOpacity
                                onPress={this.login}>
                                    <Text>Login</Text>
                                </TouchableOpacity>
                            </Animated.View>
                        </Animated.View>
                    </View>
                </View>
            </>
        )
    }
}


export default Login;

const styles = StyleSheet.create({
    button: {
        backgroundColor: 'white',
        height: 70,
        marginHorizontal:20,
        borderRadius: 35,
        alignItems: 'center',
        justifyContent: 'center',
        shadowOffset: {width:2, height:2},
        shadowColor: 'black',
        shadowOpacity: 0.2
    }, 
    buttonGit: {
        backgroundColor: '#24292E',
        height: 70,
        marginHorizontal:20,
        borderRadius: 35,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 10
    },
    closeButton: {
        height: 40,
        width: 40,
        backgroundColor: 'white',
        borderRadius: 20,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        top: 165,
        left: width / 2 -20,
        shadowOffset: {width:2, height:2},
        shadowColor: 'black',
        shadowOpacity: 0.2
    }, 
    textoLogin: {
        fontSize:20,
        fontWeight: 'bold'
    },
    textoLoginGit:{
        fontSize:20,
        color: 'white',
        fontWeight: 'bold'  
    },
    textInput: {
        height: 50,
        borderRadius: 25,
        borderWidth: 0.5,
        marginHorizontal: 20,
        paddingLeft:10,
        marginVertical:5,
        borderColor: 'rgba(0,0,0,0.2)'
    }
})