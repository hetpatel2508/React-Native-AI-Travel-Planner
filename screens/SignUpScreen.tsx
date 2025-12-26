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
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from 'configs/FirebaseConfig';

export default function SignUpScreen() {
  const navigation = useNavigation<NavigationProp<any, any>>();

  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [fullName, setFullName] = React.useState('');

  const showMessage = (message: string) => {
    if (Platform.OS === 'android') {
      ToastAndroid.show(message, ToastAndroid.SHORT);
    } else if (Platform.OS === 'ios') {
      Alert.alert('Notice', message);
    } else {
      window.alert(message); // Web
    }
    // npm install react-native-toast-message

    // import Toast from 'react-native-toast-message';

    // Toast.show({
    //   type: 'error',
    //   text1: 'Passwords do not match',
    // });
  };

  const OnCreateAccount = () => {
    const trimmedEmail = email.trim();
    const trimmedFullName = fullName.trim();

    if (trimmedEmail === '') {
      showMessage('Please enter your email');
      return;
    }

    if (trimmedFullName === '') {
      showMessage('Please enter your full name');
      return;
    }

    if (password === '') {
      showMessage('Please enter your password');
      return;
    }

    if (confirmPassword === '') {
      showMessage('Please confirm your password');
      return;
    }

    if (password.length < 6) {
      showMessage('Password must be at least 6 characters');
      return;
    }

    if (password !== confirmPassword) {
      showMessage('Passwords do not match');
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;
        // ...
        console.log(user);
        navigation.navigate('Login');
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
        console.log(errorMessage + errorCode);
      });
  };

  return (
    <SafeAreaView className="relative flex-1 bg-neutral-100">
      {/* Back Button */}
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        activeOpacity={0.4}
        className="ml-5 h-10 w-10 items-center justify-center rounded-lg border border-neutral-300"
        style={{ marginTop: Platform.OS === 'ios' ? 0 : 20 }}>
        <ChevronLeftIcon size={22} color="black" />
      </TouchableOpacity>

      {/* Heading */}
      <View>
        <Text className="ml-6 mt-9 text-3xl font-bold">Create Account,</Text>
        <Text className="ml-6 mt-1 text-3xl font-bold">Let's get started!</Text>
      </View>

      {/* Inputs */}
      <View className="mt-0 flex">
        {/* Full Name */}
        <TextInput
          className="m-7 h-12 rounded-lg border border-neutral-300 bg-white p-4"
          placeholder="Enter your full name"
          placeholderTextColor="#9CA3AF"
          textContentType="name"
          autoCapitalize="words"
          style={{ marginTop: 40, marginBottom: 0 }}
          onChangeText={(text) => setFullName(text)}
          value={fullName}
        />
        <TextInput
          className="m-7 h-12 rounded-lg border border-neutral-300 bg-white p-4"
          placeholder="Enter your email"
          placeholderTextColor="#9CA3AF"
          textContentType="emailAddress"
          autoCapitalize="none"
          keyboardType="email-address"
          style={{ marginTop: 16, marginBottom: 16 }}
          onChangeText={(text) => setEmail(text)}
          value={email}
        />

        {/* Password */}

        <View className="relative mx-7 mb-4">
          <TextInput
            className="h-12 rounded-lg border border-neutral-300 bg-white pl-4 pr-12"
            placeholder="Create password"
            placeholderTextColor="#9CA3AF"
            secureTextEntry={!showPassword}
            autoCapitalize="none"
            autoCorrect={false}
            keyboardAppearance="dark"
            keyboardType="ascii-capable"
            onChangeText={(text) => setPassword(text)}
            value={password}
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

        {/* Confirm Password */}
        <View className="relative mx-7">
          <TextInput
            className="h-12 rounded-lg border border-neutral-300 bg-white pl-4 pr-12"
            placeholder="Confirm password"
            placeholderTextColor="#9CA3AF"
            secureTextEntry={!showConfirmPassword}
            autoCapitalize="none"
            autoCorrect={false}
            keyboardAppearance="dark"
            keyboardType="ascii-capable"
            // style={{ marginTop: 16, marginBottom: 0 }}
            onChangeText={(text) => setConfirmPassword(text)}
            value={confirmPassword}
          />
          <TouchableOpacity
            onPress={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2">
            {showConfirmPassword ? (
              <EyeIcon size={22} color="#6B7280" />
            ) : (
              <EyeSlashIcon size={22} color="#6B7280" />
            )}
          </TouchableOpacity>
        </View>
      </View>

      {/* Sign Up Button */}
      <View className="flex items-center">
        <TouchableOpacity
          onPress={OnCreateAccount}
          className="mt-6 h-[50px] w-[87%] items-center justify-center rounded-lg bg-neutral-900"
          activeOpacity={0.9}>
          <Text className="text-lg font-bold text-white">Sign Up</Text>
        </TouchableOpacity>
      </View>

      {/* Divider */}
      <View className="my-6 flex-row items-center px-6">
        <View className="h-[1px] flex-1 bg-neutral-300" />
        <Text className="mx-3 text-neutral-500">or Sign up with</Text>
        <View className="h-[1px] flex-1 bg-neutral-300" />
      </View>

      {/* Social */}
      <View className="flex-row items-center justify-center gap-2.5">
        <Text className="rounded-xl border border-neutral-300 px-6 py-4">Google</Text>
        <Text className="rounded-xl border border-neutral-300 px-6 py-4">Facebook</Text>
        <Text className="rounded-xl border border-neutral-300 px-6 py-4">Apple</Text>
      </View>

      {/* Footer */}
      <View className="absolute bottom-10 w-full flex-row items-center justify-center">
        <Text className="mr-1 text-neutral-500">Already have an account?</Text>
        <TouchableOpacity activeOpacity={0.6} onPress={() => navigation.navigate('Login')}>
          <Text className="text-neutral-900">Login Now</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
