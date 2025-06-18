/* eslint-disable react-native/no-inline-styles */
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Image, StyleSheet, View } from "react-native";
import _ from "lodash";
import images from "../assets/images";
import theme from "../theme";
import { Input, Pressable, Spacing, Text, SearchBar } from "./";

const ImageHeader = ({
  profileImage = "",
  titleText = "CarYaar",
  subTittle = "",
  searchPlaceHolder = "Search",
  hideSubHeader = false,
  showSearch = true,
  hideProfileIcon = false,
  showAddBtn = false,
  value,
  defaultValue,
  debounceDelay,
  debounceOptions,
  onChangeText = () => {},
  onCancelIconPress,
  onSubmitEditing,
  onAddButtonPress,
  onFilterPress = () => {},
  onLeftIconPress,
  onRightIconPress,
  rightIconName,
  enableBlurOnSubmit = true,
  enableBlurOnInputBlur = false,
}) => {
  const [searchText, setSearchText] = useState("");

  const debouncedResults = useMemo(() => {
    if (typeof onChangeText !== "function") return () => {};
    return _.debounce(
      onChangeText,
      debounceDelay || 1000,
      debounceOptions || { maxWait: 2000, trailing: true }
    );
  }, [debounceDelay, debounceOptions, onChangeText]);

  const handleChange = useCallback(
    (text) => {
      const textValue = text?.replace(/\s\s+/g, " ");
      setSearchText(textValue);

      if (_.isEmpty(textValue)) {
        onChangeText?.(textValue);
      } else if (debounceDelay?.toString() === "0") {
        onChangeText?.(textValue);
      } else {
        debouncedResults(textValue);
      }
    },
    [debouncedResults, debounceDelay, onChangeText]
  );

  const handleBlur = useCallback(
    (text) => {
      const finalText =
        typeof text === "string" ? text.trim() : searchText.trim();
      handleChange(finalText);
    },
    [searchText, handleChange]
  );

  const handleCancel = useCallback(() => {
    if (!_.isEmpty(searchText)) {
      handleChange("");
      onCancelIconPress?.();
    }
  }, [searchText, handleChange, onCancelIconPress]);

  const onSubmitPressed = () => {
    const trimmedText = searchText.trim();
    if (onSubmitEditing) {
      onSubmitEditing?.(trimmedText);
    } else if (enableBlurOnSubmit) {
      handleBlur(trimmedText);
    }
  };

  useEffect(() => {
    setSearchText(value || defaultValue || "");
    return () => {
      debouncedResults.cancel();
    };
  }, [value, defaultValue, debouncedResults]);

  const isEmpty = _.isEmpty(searchText);

  return (
    <>
      <View style={styles.header}>
        <View style={styles.profileRow}>
          {!hideProfileIcon && (
            <Pressable onPress={onLeftIconPress}>
              <Image
                defaultSource={images.placeholder_image}
                source={
                  profileImage
                    ? { uri: profileImage }
                    : images.placeholder_image
                }
                style={styles.avatar}
              />
            </Pressable>
          )}
          <Text
            hankenGroteskExtraBold
            size={28}
            lineHeight="h2"
            color={theme.colors.primaryLight}
          >
            {titleText}
          </Text>
          <Pressable style={styles.bell} onPress={onRightIconPress}>
            <Image
              source={rightIconName || images.notificationOutline}
              style={styles.bellIcon}
            />
          </Pressable>
        </View>
      </View>

      {!hideSubHeader && (
        <View style={styles.subHeader}>
          <View style={styles.subHeaderTopRow}>
            <Text hankenGroteskExtraBold color="white" size="h2">
              {subTittle}
            </Text>
            <Pressable onPress={onFilterPress}>
              <Image
                resizeMode="contain"
                source={images.filter}
                style={styles.filterIcon}
              />
            </Pressable>
          </View>

          {showSearch && (
            <>
              <Spacing size="md" />
              <SearchBar
                value={value}
                defaultValue={defaultValue}
                debounceDelay={debounceDelay}
                debounceOptions={debounceOptions}
                onChangeText={onChangeText}
                onCancelIconPress={onCancelIconPress}
                onSubmitEditing={onSubmitEditing}
                onFilterPress={onFilterPress}
                onAddButtonPress={onAddButtonPress}
                searchPlaceHolder={searchPlaceHolder}
                enableBlurOnSubmit={enableBlurOnSubmit}
                enableBlurOnInputBlur={enableBlurOnInputBlur}
                showAddBtn={showAddBtn}
              />
            </>
          )}
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: theme.colors.primaryBlack,
    paddingHorizontal: theme.sizes.padding,
    paddingVertical: theme.sizes.spacing.smd,
  },
  profileRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  avatar: {
    width: theme.sizes.icons.xl,
    height: theme.sizes.icons.xl,
    borderRadius: theme.sizes.borderRadius.jumbo,
  },
  bell: {
    width: theme.sizes.icons.xl,
    height: theme.sizes.icons.xl,
    backgroundColor: theme.colors.gray900,
    borderRadius: theme.sizes.borderRadius.jumbo,
    justifyContent: "center",
    alignItems: "center",
  },
  bellIcon: {
    height: 24,
    width: 24,
  },
  subHeader: {
    backgroundColor: theme.colors.primaryBlack,
    paddingHorizontal: theme.sizes.padding,
    paddingBottom: theme.sizes.padding,
    paddingTop: 12,
  },
  subHeaderTopRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  filterIcon: {
    height: 24,
    width: 24,
  },
  searchRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  searchInputWrapper: {
    flex: 1,
  },
  addBtnWrapper: {
    marginLeft: 15,
  },
  addIcon: {
    height: 48,
    width: 48,
    resizeMode: "contain",
  },
});

export default React.memo(ImageHeader);
