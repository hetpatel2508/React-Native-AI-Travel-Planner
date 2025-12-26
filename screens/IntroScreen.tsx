import { View, Text, Dimensions, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { auth } from 'configs/FirebaseConfig';
import { onAuthStateChanged, User as UserType } from 'firebase/auth';

const { width, height } = Dimensions.get('window');

export default function IntroScreen() {
  const [user, setUser] = React.useState<UserType | null>(null);

  const navigation = useNavigation<NavigationProp<any, any>>();

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return unsubscribe;
  }, []);

  const handleClick = () => {
    if (user) {
      navigation.navigate('HomeScreen');
    } else {
      navigation.navigate('Login');
    }
  };

  return (
    <View className="flex-1 ">
      <View className="relative w-full items-center justify-center">
        <Image
          source={require('../assets/image-1.jpg')}
          style={{
            width: width,
            height: height * 0.63,
          }}
          resizeMode="cover"
        />

        {/* <LinearGradient
          colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.1)']}
          style={{
            position: 'absolute',
            width: width,
            height: 200,
            bottom: -20,
          }}
        /> */}
      </View>

      {/* Content Section */}
      <View className=" -mt-[10px] flex-1 rounded-t-[30px] bg-neutral-900 px-6 pt-6">
        <Text className="mt-2 text-center text-3xl font-bold text-white">AI Travel Planner</Text>
        <View className="mt-5 flex flex-col items-center">
          <Text className="text-center text-base text-neutral-300">
            "&nbsp;Discover your next adventure effortlessly,
          </Text>
          <Text className="text-center text-base text-neutral-300">
            Personalized Itineraries at your fingertips,
          </Text>
          <Text className="text-center text-base text-neutral-300">
            Travel smarter with AI-Driven insights "
          </Text>
          <TouchableOpacity
            onPress={handleClick}
            className="rounded-full bg-neutral-200  py-3.5"
            activeOpacity={0.5}
            style={{
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.8,
              shadowRadius: 2,
              paddingHorizontal: width * 0.27,
              marginTop: height * 0.068,
            }}>
            <Text className="text-center text-xl font-bold text-black">Get Started</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
