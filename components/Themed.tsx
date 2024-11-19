/**
 * Learn more about Light and Dark modes:
 * https://docs.expo.io/guides/color-schemes/
 */

import { Text as DefaultText, useColorScheme, View as DefaultView, Dimensions, View, ScrollView } from 'react-native';

import Colors from '../constants/Colors';
import { SafeAreaView } from 'react-native-safe-area-context';
import useThemeColor from '../hooks/useThemeColor';

type ThemeProps = {
  lightColor?: string;
  darkColor?: string;
};

type ScrollProps = {
  scrollBg?: string;
  scrollBottomPadding?: number;
}

export type TextProps = ThemeProps & DefaultText['props'];
export type ViewProps = ThemeProps & ScrollProps & DefaultView['props'];

const { height } = Dimensions.get('screen');

export function Text(props: TextProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

  return <DefaultText style={[{ color }, style]} {...otherProps} />;
}

export function Page(props: ViewProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');

  return (
    <ScrollView
      style={{ backgroundColor: props.scrollBg || '#FFF', flex: 1 }}
      contentInset={{ bottom: 10 }}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{paddingBottom: props.scrollBottomPadding || 40}}
      bounces={false}
    >
      <View>
        <DefaultView style={[{ backgroundColor, minHeight: height }, style]} {...otherProps} />
      </View>
    </ScrollView>
  )
}
