import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #2c3e50;
`;


export const Image = styled.Image`
width: 150px;
height: 150px;
border-radius: 100px;
`;


export const TextInput = styled.TextInput`
    margin-top: 10px;
    width: 300px ;
    background-color: white;
    font-size: 16px;
    font-weight: bold;
    border-radius: 10px;
`;


export const SignInButton = styled.TouchableOpacity`
 width: 300px;
 height: 42px;
 background-color: #3498db;
 border-radius: 10px;
 align-items: center;
 justify-content: center;
 margin-top: 10px;
`;

export const SignInButtonText = styled.Text`
  color: #FFF;
  font-weight: bold;
  font-size: 15px;
`;


export const ForgotPasswd = styled.Text`
  color: #FFF;
  font-weight: bold;
  font-size: 15px;
`;

export const CreateNewAccount = styled.Text`
  color: #FFF;
  font-weight: bold;
  font-size: 15px;
`;


