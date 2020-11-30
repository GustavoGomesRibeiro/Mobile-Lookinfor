import { NavigationContainer } from '@react-navigation/native';



const Drawer = createDrawerNavigator();

function Drawer() {
    return (
        <NavigationContainer>
            {/* <Drawer.Navigator initialRouteName="Home"> */}
            <Drawer.Navigator>
            <Drawer.Screen name="Settings" component={Settings} />
            {/* <Drawer.Screen name="Notifications" component={NotificationsScreen} /> */}
            </Drawer.Navigator>
        </NavigationContainer>
    )
};

export default Drawer;