import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {Card, Spacing, Text} from '.';
import { theme } from '../theme';


/**
 * A flexible, reusable information card with icon, title, subtitle, and optional badge.
 *
 * @param {Object} props
 * @param {string} props.title - Main text or description.
 * @param {string} props.subTitle - Supporting text or subtitle.
 * @param {string} props.timeline - Supporting timeline.
 * @param {ImageSourcePropType} props.imgSource - Image/icon for the card.
 * @param {boolean} [props.showBadge] - Whether to display a status badge.
 * @param {Object} [props.containerStyle] - Custom style for the card container.
 */
const NotificationCard = ({
  title,
  subTitle,
  imgSource,
  showBadge,
  containerStyle,
  timeline,
  iconContainerStyle,
}) => {
  return (
    <Card cardContainerStyle={[styles.card, containerStyle]}>
      <View style={[styles.iconContainer, iconContainerStyle]}>
        {showBadge && <View style={styles.badge} />}
        <Image resizeMode="contain" source={imgSource} style={styles.icon} />
      </View>
      <View style={styles.textContainer}>
        <Text
          lineHeight={theme.typography.lineHeights.small}
          hankenGroteskRegular={true}>
          {title}
        </Text>
        {subTitle && (
          <>
            <Spacing size={8} />
            <Text
              lineHeight={'caption'}
              size={'caption'}
              color={theme.colors.textLabel}>
              {subTitle}
            </Text>
          </>
        )}
        {timeline && (
          <>
            <Spacing size={8} />
            <Text
              lineHeight={'caption'}
              size={'caption'}
              color={theme.colors.textLabel}>
              {timeline}
            </Text>
          </>
        )}
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    marginTop: 10,
  },
  badge: {
    height: 7,
    width: 7,
    backgroundColor: theme.colors.primary,
    borderRadius: 10,
    right: 6,
  },
  iconContainer: {
    marginRight: 12,
    flexDirection: 'row',
    // alignItems: 'center',
  },
  icon: {
    width: theme.sizes.icons.xl,
    height: theme.sizes.icons.xl,
  },
  textContainer: {
    flex: 1,
  },
});

export default React.memo(NotificationCard);
