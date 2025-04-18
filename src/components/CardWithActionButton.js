import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import theme from '../theme';
import { Pressable, Text } from './';

const CardWithActionButton = ({
  description,
  icon,
  buttonLabel,
  onPress,
  containerStyle,
  wrapperBgColor = '#d8eefc',
  btnBgColor = '#1f97f1',
  isBlack = false,
  buttonStyle,
  arrowIcon,
  showButton = true,
  iconStyle,
  contentPadding = 16,
  gap = 12,
  textProps = {},
  buttonTextProps = {},
  themeColor='white'
}) => {
  return (
    <View style={[styles.container, { backgroundColor: wrapperBgColor }, containerStyle]}>
      {/* Top Section: Icon + Text */}
      <View style={[styles.topRow, { padding: contentPadding, gap }]}>
        {icon && 
            <Image source={icon}style={[styles.iconWrapper, iconStyle]}/>
        }
        <Text size={'small'} style={styles.description} {...textProps}>
          {description}
        </Text>
      </View>

      {/* Optional Button */}
      {showButton && (
        <Pressable
          style={[styles.button, { backgroundColor: btnBgColor }, buttonStyle]}
          onPress={onPress}
          disabled={!onPress}>
          <Text
            hankenGroteskExtraBold={true}
            size={'caption'}
            color={themeColor}
            {...buttonTextProps}>
            {buttonLabel?.toUpperCase()}
          </Text>
          {arrowIcon && (
            <Image
              source={arrowIcon}
              style={styles.arrowRight}
              tintColor={themeColor}
            />
          )}
        </Pressable>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: theme.sizes.borderRadius.card,
    overflow: 'hidden',
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconWrapper: {
    width: 40,
    height: 40,
    backgroundColor:'white',
    borderRadius:20,
    justifyContent:'center',
    alignItems:'center'
  },
  description: {
    flex: 1,
  },
  button: {
    flexDirection: 'row',
    paddingVertical: 8,
    paddingHorizontal: 16,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  arrowRight: {
    height: 20,
    width: 20,
  },
  icon:{
    height: 20,
    width: 20,
    resizeMode:"contain"
  }
});

export default CardWithActionButton;
