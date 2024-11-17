import React from 'react';
import { Image } from "expo-image";
import Button from 'components/ui/Button';
import {View, Text, SafeAreaView, StyleSheet, StatusBar, TouchableOpacity, Pressable} from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';

const data = [
  {
    title: 'Hungry?',
    text: 'But you have to walk all the way to place an order?',
    image: require('@/assets/images/onboarding-illustration1.png'),
  },
  {
    title: 'Problem Solved',
    text: 'Thanks to SC: FoodCourt you can now order meals from your favorite vendors on your way there!',
    image: require('@/assets/images/onboarding-illustration2.png'),
  },
  {
    title: 'What are you waiting for?',
    text: 'Get your meals when you want it.',
    image: require('@/assets/images/onboarding-illustration3.png'),
  },
];

type Item = typeof data[0];

const styles = StyleSheet.create({
  title: {
    fontSize: 25,
    fontWeight:'bold',
    marginTop: 20,
    color: '#5C5C5C',
    textAlign: 'center',
  },
  text: {
    fontSize: 15,
    marginTop: 5,
    color: '#5C5C5C',
    textAlign: 'center',
  },
  paginationContainer: {
    position: 'absolute',
    bottom: 18,
    left: 16,
    right: 16,
  },
  paginationDots: {
    height: 100,
    marginHorizontal: 160,
    marginVertical: 140,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    width: 30,
    height: 8,
    borderRadius: 5,
    marginHorizontal: 4,
  },
});

export default class OnboardingPage extends React.Component {

  slider: AppIntroSlider | null = null;

  state = {
    skipPressed: false,
  };

  _renderItem = ({ item }: { item: Item }) => {
    return (
      <View style={{backgroundColor:'#fff', flex: 1}}>
        <Image
                source={item.image}
                style={{ height: '77%', width: '100%', resizeMode: 'stretch',}}
            />
        <View style={{paddingHorizontal:30}}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.text}>{item.text}</Text>
        </View>
      </View>
    );
  };

  _keyExtractor = (item: Item) => item.text;


  _renderPagination = (activeIndex: number) => {
    const { skipPressed } = this.state;
    return (
      <View style={styles.paginationContainer}>
        <SafeAreaView>
          <View style={styles.paginationDots}>
            {data.length > 1 &&
              data.map((_, i) => (
                <TouchableOpacity
                  key={i}
                  style={[
                    styles.dot,
                    i === activeIndex
                      ? {backgroundColor: 'red', width: 70}
                      : {backgroundColor: '#fff'},
                  ]}
                  onPress={() => this.slider?.goToSlide(i, true)}
                />
              ))}
          </View>

          {/* SKIP BUTTON */}
          <View>
            {activeIndex !== data.length - 1 && !skipPressed && (  
            <View style={{alignSelf:'flex-end', padding :20}}>
              <Pressable
                onPress={() =>{
                  this.slider?.goToSlide(data.length - 1, true);
                  this.setState({ skipPressed: true });
                }}>
                <Text style={{color: 'red', fontWeight: '600', fontSize: 16,}}>Skip</Text>
              </Pressable>
            </View>
            )}

            {/* GET STARTED BUTTON */}
            {activeIndex === data.length - 1 && !skipPressed && (  
              <View style={{ width:'100%', alignItems: "center", marginBottom: 12}}>
                <Button
                  title="Get Started"
                  onPress={() => {
                        // Handle button press
                  }}
                  buttonStyle={{backgroundColor:'#fe0000',width:160, marginBottom:10}}
                  titleStyle={{color:'#fff', fontSize:18, fontWeight:'bold'}}
                  />
            </View>
            )}
          </View>
        </SafeAreaView>
      </View>
    );
  };

  render() {
    return (
      <View style={{flex: 1}}>
        <StatusBar translucent backgroundColor="transparent" />
        <AppIntroSlider
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem}
          data={data}
          renderPagination={this._renderPagination}
          ref={(ref) => (this.slider = ref!)}
        />
      </View>
    );
  }
}