import { createAppContainer } from 'react-navigation';
import { MaterialIcons } from '@expo/vector-icons';
import { createDrawerNavigator, createStackNavigator } from 'react-navigation';
// import { createStackNavigator } from 'react-navigation-stack';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import {
//     createSwitchNavigator,
//     createAppContainer,
//     createDrawerNavigator,
//     createBottomTabNavigator,
//     createStackNavigator
//   } from 'react-navigation';
// import {  createDrawerNavigator  } from 'react-navigation-drawer';
// import { createDrawerNavigator   } from 'react-navigation-stack';

import Login from '../pages/Login';
import Main from '../pages/Main';
import Profile from '../pages/Profile';
import Settings from '../pages/Settings';


const Routes = createAppContainer(
    createStackNavigator({
        Login:{
            screen: Login,
            navigationOptions: {
                header: null,
            }
        },
        Main: {
            screen: Main,   //o MAIN sempre deve ser passado, pois voce esta chamando ele do pages/Main            
            navigationOptions: {
                title: 'LookingFor',
                // realizar alteracao da pag main, como por exemplo trocar titulo da pagina
            },
        },
        Profile: {
            screen: Profile,
            navigationOptions: {
                title: 'Perfil Github'
            }
        },
    }, {
        defaultNavigationOptions: {
            headerBackTitleVisible: false,
            headerTintColor: '#FFF',
            headerStyle: {
                backgroundColor: '#24292E'
            },
        }
    }),
    // createDrawerNavigator({
    //     Main: { screen: Main }
    // }, {
    //     drawerPosition: 'left',
    //     initialRouteName: 'Main',
    //     drawerWidth: 200,
    //     navigationOptions: ({navigation}) => ({
    //     headerLeft: (
    //         <MaterialIcons
    //           style={{ paddingLeft: 10 }}
    //           onPress={() => navigation.openDrawer()}
    //           name="menu"
    //           size={30}
    //         />
    //       ),
    //       })
    // //   headerMode: 'float',
    // //   navigationOptions: ({navigation}) => ({
    // //     headerLeft: (
    // //         <MaterialIcons
    // //           style={{ paddingLeft: 10 }}
    // //           onPress={() => navigation.openDrawer()}
    // //           name="menu"
    // //           size={30}
    // //         />
    // //       ),
    // //     headerStyle: {backgroundColor: '#4C3E54'},
    // //     title: 'Welcome!',
    // //     headerTintColor: 'white',
    // //   })
    // })
);


export default Routes;
