import React from 'react';
import {
  View,
  // Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Image,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import {NativeBaseProvider, Text, VStack, Center} from 'native-base';
import {useDispatch, useSelector} from 'react-redux';
import Button from '../components/Button';
import Input from '../components/Input';
import {onLogin} from '../redux/actions/auth';

const Login = ({navigation}) => {
  const {auth} = useSelector(state => state);
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const dispatch = useDispatch();
  const doLogin = async () => {
    dispatch(onLogin(username, password));
    await alert(auth.token);
  };
  return (
    <NativeBaseProvider>
      <SafeAreaView>
        <ImageBackground
          source={require('../assets/bgLogin.png')}
          resizeMode="cover"
          style={styles.pageBackground}>
          <ScrollView>
            <View style={styles.fullPage}>
              <Text bold fontSize={'4xl'} color={'white'}>
                LET'S EXPLORE THE WORLD
              </Text>
              <VStack space={4} style={styles.formInput}>
                {auth?.isError && (
                  <Center h={39} bg={'rose.100'} rounded={'md'}>
                    <Text fontSize={'md'} color={'danger.600'}>
                      {auth.errMsg}
                    </Text>
                  </Center>
                )}
                <Input
                  placeholder={'Username'}
                  variant={'pink'}
                  onChangeText={setUsername}
                />
                <Input
                  placeholder={'Password'}
                  secureTextEntry={true}
                  variant={'pink'}
                  onChangeText={setPassword}
                />
                <TouchableOpacity
                  onPress={() => navigation.navigate('ResetPassword')}>
                  <Text style={styles.link}>Forgot password?</Text>
                </TouchableOpacity>
                <Button variant={'blue'} onPress={() => doLogin()}>
                  Login
                </Button>
                <Button>
                  <Image
                    source={require('../assets/googleIcon.png')}
                    style={styles.logo}
                  />
                  Login with Google
                </Button>
              </VStack>
              <View>
                <Text style={styles.textWhite}>
                  Don’t have account?
                  <Text
                    underline
                    color={'white'}
                    onPress={() => navigation.navigate('Signup')}>
                    Sign up now
                  </Text>
                </Text>
              </View>
            </View>
          </ScrollView>
        </ImageBackground>
      </SafeAreaView>
    </NativeBaseProvider>
  );
};

const styles = StyleSheet.create({
  fullPage: {
    display: 'flex',
    height: '100%',
    maxWidth: 400,
    justifyContent: 'center',
    padding: 12,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  pageBackground: {
    height: '100%',
  },
  textWhite: {
    color: 'white',
  },
  formInput: {
    marginTop: 200,
  },
  link: {
    color: 'white',
    textDecorationLine: 'underline',
    marginTop: 20,
    marginBottom: 20,
  },
  logo: {
    width: 16,
    height: 16,
    paddingRight: 20,
  },
});

export default Login;
