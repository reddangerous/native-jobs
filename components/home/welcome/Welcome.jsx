import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList,
} from "react-native";
import { useRouter } from "expo-router";
//import { MaterialCommunityIcons } from 'react-native-vector-icons';
import styles from "./welcome.style";
import { icons, SIZES } from "../../../constants";

const jobTypes = ["Full-time", "Part-time", "Contractor"];

const Welcome = ({ searchTerm, setSearchTerm, handleClick }) => {
  const router = useRouter();
  const [activeJobType, setActiveJobType] = useState("Full-time");
  // lets define times, morning, evening night and a hi icon
  const currentHour = new Date().getHours();

  const time = {
    morning: {
      greeting: "Good morning",

    },
    evening: {
      greeting: "Good evening",
    },
    afternoon:{
    },
    night: {
      greeting: "Good night",
    },
    default: {
      greeting: "Hello there",}
   
  };

  let currentTime;

  if (currentHour >= 6 && currentHour < 12) {
    currentTime = time.morning;
  }else if(currentHour>=12 && currentHour <18){
    currentTime=time.afternoon;
  }
  
  else if (currentHour >= 18 && currentHour < 21) {
    currentTime = time.evening;
  } else if (currentHour >= 21 || currentHour < 6) {
    currentTime = time.night;
  } else {
    currentTime = time.default;
  }
  return (
    <View>
      <View style={styles.container}>
       
          <Text style={styles.userName}>{currentTime.greeting}</Text>
        
        <Text style={styles.welcomeMessage}>Find your perfect job</Text>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchWrapper}>
          <TextInput
            style={styles.searchInput}
            value={searchTerm}
            onChangeText={(text) => setSearchTerm(text)}
            placeholder='What are you looking for?'
          />
        </View>

        <TouchableOpacity style={styles.searchBtn} onPress={handleClick}>
          <Image
            source={icons.search}
            resizeMode='contain'
            style={styles.searchBtnImage}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.tabsContainer}>
        <FlatList
          data={jobTypes}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.tab(activeJobType, item)}
              onPress={() => {
                setActiveJobType(item);
                router.push(`/search/${item}`);
              }}
            >
              <Text style={styles.tabText(activeJobType, item)}>{item}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item}
          contentContainerStyle={{ columnGap: SIZES.small }}
          horizontal
        />
      </View>
    </View>
  );
};

export default Welcome;