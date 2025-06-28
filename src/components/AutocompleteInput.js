import React, { useState, useRef, useEffect } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import debounce from "lodash.debounce";
import { Input, Pressable, Text } from "./";

const AutocompleteInput = React.forwardRef(
  (
    {
      restProps = {},
      fetchSuggestions,
      debounceTime = 800,
      suggestionTextKey = "name",
      onSelectSuggestion,
      style,
      value,
      suggestionItemStyle,
      suggestionContainerStyle,
      containerStyle,
      ...overrideProps
    },
    ref
  ) => {
    const [inputValue, setInputValue] = useState(value || "");
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);

    useEffect(() => {
      if (value !== inputValue) {
        setInputValue(value || "");
      }

      if (!inputValue?.trim()) {
        setShowSuggestions(false);
      }
    }, [value]);

    const debouncedFetch = useRef(
      debounce(async (text) => {
        if (!text) {
          setSuggestions([]);
          return;
        }
        try {
          const results = await fetchSuggestions(text);
          setSuggestions(results || []);
          setShowSuggestions(true);
        } catch (e) {
          console.error("Autocomplete fetch error:", e);
          setSuggestions([]);
        }
      }, debounceTime)
    ).current;

    const getNestedValue = (obj, path) =>
      path.split(".").reduce((acc, part) => acc?.[part], obj);

    const handleSelect = (item) => {
      const selectedText = getNestedValue(item, suggestionTextKey) || "";
      setInputValue(selectedText);
      onSelectSuggestion?.(item);
      setShowSuggestions(false);
    };

    const combinedProps = {
      ...restProps,
      ...overrideProps,
      value: inputValue,
      onChangeText: (text) => {
        setInputValue(text);
        overrideProps?.onChangeText?.(text);
        debouncedFetch(text);
      },
      ref,
    };

    return (
      <View style={[styles.container, containerStyle]}>
        <Input
          {...combinedProps}
          onBlur={() => {
            // setTimeout(() => setShowSuggestions(false), 100);
          }}
        />

        {showSuggestions && inputValue !== "" && suggestions.length > 0 && (
          <View style={[styles.dropdown, suggestionContainerStyle]}>
            <FlatList
              data={suggestions}
              keyExtractor={(item, index) =>
                `${suggestionTextKey} - ${item.id || index}`
              }
              keyboardShouldPersistTaps="handled"
              nestedScrollEnabled
              renderItem={({ item, index }) => (
                <Pressable
                  style={[
                    styles.suggestionItem,
                    suggestionItemStyle,
                    {
                      borderBottomWidth:
                        index === suggestions.length - 1 ? 0 : 1,
                    },
                  ]}
                  onPress={() => handleSelect(item)}
                >
                  <Text size="small" lineHeight="small">
                    {getNestedValue(item, suggestionTextKey)}
                  </Text>
                </Pressable>
              )}
            />
          </View>
        )}
      </View>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  dropdown: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginTop: 2,
    maxHeight: 200,
    backgroundColor: "#fff",
    zIndex: 100,
  },
  suggestionItem: {
    height: 45,
    borderBottomColor: "#eee",
    justifyContent: "center",
    paddingHorizontal: 10,
  },
});

export default AutocompleteInput;
