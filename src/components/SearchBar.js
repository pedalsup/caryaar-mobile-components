// components/SearchBarWithFilter.js
import React, { useCallback, useMemo, useState, useEffect } from "react";
import { View, Image, StyleSheet } from "react-native";
import _ from "lodash";
import { Input, Pressable, Spacing } from "./";
import images from "../assets/images";
import theme from "../theme";

const SearchBar = ({
  value,
  defaultValue,
  debounceDelay,
  debounceOptions,
  onChangeText = () => {},
  onCancelIconPress,
  onSubmitEditing,
  onFilterPress = () => {},
  onAddButtonPress,
  searchPlaceHolder = "Search",
  enableBlurOnSubmit = true,
  enableBlurOnInputBlur = false,
  showAddBtn = false,
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
    return () => debouncedResults.cancel();
  }, [value, defaultValue, debouncedResults]);

  const isEmpty = _.isEmpty(searchText);

  return (
    <View style={styles.searchRow}>
      <View style={styles.searchInputWrapper}>
        <Input
          leftIconName={images.icSearch}
          isLeftIconVisible
          inputContainerBackgroundColor="#222222"
          inputContainerBackgroundColorFocused="#222222"
          themeColor={theme.colors.textSecondary}
          placeholder={searchPlaceHolder}
          onChangeText={handleChange}
          value={searchText}
          isRightIconVisible={!isEmpty}
          rightIconName={images.cancel}
          rightIconColor={theme.colors.primary}
          onRightIconPress={handleCancel}
          onBlur={() => {
            if (enableBlurOnInputBlur) {
              handleBlur();
            }
          }}
          onSubmitEditing={onSubmitPressed}
          rightIcnDisable={false}
          returnKeyType={"search"}
        />
      </View>

      {showAddBtn && (
        <Pressable style={styles.addBtnWrapper} onPress={onAddButtonPress}>
          <Image source={images.icAdd} style={styles.addIcon} />
        </Pressable>
      )}
    </View>
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

export default React.memo(SearchBar);
