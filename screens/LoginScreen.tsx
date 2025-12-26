import {
  View,
  Text,
  Platform,
  TextInput,
  TouchableOpacity,
  ToastAndroid,
  Alert,
} from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeftIcon, EyeIcon, EyeSlashIcon } from 'react-native-heroicons/solid';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from 'configs/FirebaseConfig';

export default function LoginScreen() {
  const [showPassword, setShowPassword] = React.useState(false);
  const navigation = useNavigation<NavigationProp<any, any>>();

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const showMessage = (message: string) => {
    if (Platform.OS === 'android') {
      ToastAndroid.show(message, ToastAndroid.SHORT);
    } else if (Platform.OS === 'ios') {
      Alert.alert('Notice', message);
    } else {
      window.alert(message); // Web
    }
  };
  const OnSignIn = () => {
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    if (trimmedEmail === '') {
      showMessage('Please enter your email');
      return;
    }

    if (trimmedPassword === '') {
      showMessage('Please enter your password');
      return;
    }

    if (trimmedPassword.length < 6) {
      showMessage('Password must be at least 6 characters');
      return;
    }

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // ...
        console.log(user);
        navigation.navigate('HomeScreen');
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
        console.log(errorMessage, errorCode);

        if (errorCode === 'auth/invalid-credential') {
          showMessage('Invalid email or password ');
        }
      });
  };

  return (
    <SafeAreaView className="relative flex-1 bg-neutral-100">
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        activeOpacity={0.4}
        className="ml-5 flex h-10 w-10 items-center justify-center rounded-lg border border-neutral-300"
        style={{ marginTop: Platform.OS === 'ios' ? 0 : 20 }}>
        <ChevronLeftIcon size={22} color="black" />
      </TouchableOpacity>

      <View className="flex">
        <Text className="ml-6 mt-9 text-3xl font-bold">Welcome Back,</Text>
        <Text className="ml-6 mt-1 text-3xl font-bold">Glad to see you, Again!</Text>
      </View>

      <View className="mt-0 flex">
        <View className="flex ">
          <TextInput
            className="m-7 h-12 rounded-lg border border-neutral-300 bg-white p-4"
            placeholder="Enter your email"
            placeholderTextColor="#9CA3AF"
            textContentType="emailAddress"
            autoCapitalize="none"
            keyboardType="email-address"
            keyboardAppearance="dark"
            autoCorrect={false}
            onChangeText={(text) => setEmail(text)}
            value={email}
            style={{ marginTop: 40, marginBottom: 18 }}
          />
        </View>
        <View className="relative mx-7">
          <TextInput
            className="h-12 rounded-lg border border-neutral-300 bg-white pl-4 pr-12"
            placeholder="Enter your password"
            placeholderTextColor="#9CA3AF"
            secureTextEntry={!showPassword}
            autoCapitalize="none"
            autoCorrect={false}
            onChangeText={(text) => setPassword(text)}
            value={password}
            keyboardAppearance="dark"
            keyboardType="ascii-capable"
          />
          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2">
            {showPassword ? (
              <EyeIcon size={22} color="#6B7280" />
            ) : (
              <EyeSlashIcon size={22} color="#6B7280" />
            )}
          </TouchableOpacity>
        </View>
      </View>

      <View className="flex items-center">
        <TouchableOpacity
          onPress={OnSignIn}
          className="mt-6 flex h-[50px] w-[87%] items-center justify-center rounded-lg bg-neutral-900"
          style={{ marginBottom: 20 }}
          activeOpacity={0.9}>
          <Text className=" text-center text-lg font-bold text-white">Login</Text>
        </TouchableOpacity>
      </View>

      <View className="my-6 flex-row items-center px-6">
        <View className="h-[1px] flex-1 bg-neutral-300" />
        <Text className="mx-3 text-neutral-500">or Login with</Text>
        <View className="h-[1px] flex-1 bg-neutral-300" />
      </View>

      <View className="flex-row items-center justify-center gap-2.5">
        <Text className="rounded-xl border border-neutral-300 px-6 py-4">Google</Text>
        <Text className="rounded-xl border border-neutral-300 px-6 py-4">Facebook</Text>
        <Text className="rounded-xl border border-neutral-300 px-6 py-4">Apple</Text>
      </View>

      <View className="absolute bottom-10 w-full flex-row items-center justify-center">
        <Text className="mr-1 text-neutral-500">Don't have an account?</Text>
        <TouchableOpacity activeOpacity={0.6} onPress={() => navigation.navigate('SignUp')}>
          <Text className="text-neutral-900">Register Now</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
