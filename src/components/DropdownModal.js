// @ts-nocheck
import React from 'react';
import {
  Dimensions,
  FlatList,
  StyleSheet,
  View
} from 'react-native';
import { CommonModal, RadioButton } from '.';
import theme from '../theme';

const screenHeight = Dimensions.get('window').height;

/**
 * DropdownModal - A reusable dropdown modal with selectable options.
 *
 * @param {Object} props - Component props
 * @param {boolean} props.visible - Modal visibility status
 * @param {Array<Object>} props.data - List of options (array of objects)
 * @param {string} props.selectedItem - Currently selected item's label
 * @param {function} props.onSelect - Function called when an item is selected (item, index)
 * @param {function} props.onClose - Function called when the modal is closed
 * @param {string} [props.title='Select Option'] - Title displayed at the top of the modal
 * @param {boolean} [props.showCloseIcon=true] - Whether to show a close icon in the modal
 * @param {function} [props.customItemRenderer] - Custom renderer for each item (optional)
 * @param {boolean} [props.showPrimaryButton=false] - Whether to show a primary button at the bottom
 * @param {function} [props.onPrimaryPress] - Function called when primary button is pressed
 * @param {Object} [props.containerStyle] - Custom style for the modal container
 * @param {string} [props.keyValue='label'] - Key to display in the list items
 * @param {string} [props.primaryButtonLabel] - Label text for the primary button
 * @param {Object} [props.rest] - Additional props passed to the CommonModal
 * @returns {JSX.Element} Rendered DropdownModal component
 */
const DropdownModal = ({
  visible,
  data = [],
  selectedItem,
  onSelect,
  onClose =() => {},
  title = 'Select Option',
  showCloseIcon = true,
  customItemRenderer,
  showPrimaryButton = false,
  onPrimaryPress,
  containerStyle,
  keyValue = 'label',
  primaryButtonLabel,
  ...rest
}) => {
  /**
   * Render each item in the dropdown list.
   * @param {{item: Object, index: number}} param0 - Item data and index
   * @returns {JSX.Element} Rendered list item
   */
  const renderItem = ({ item, index }) => {
    const label = item[keyValue];
    if (customItemRenderer) {
      return customItemRenderer(item, index);
    }

    return (
      <RadioButton
        key={index}
        label={label}
        selected={selectedItem === label}
        onPress={() => {
          onSelect(item, index);
          onClose();
        }}
        marginBottom={theme.sizes.spacing.md}
      />
    );
  };

  return (
    <CommonModal
      isVisible={visible}
      onModalHide={onClose}
      title={title}
      showCloseIcon={showCloseIcon}
      isScrollableContent={false}
      isPrimaryButtonVisible={showPrimaryButton}
      onPressPrimaryButton={onPrimaryPress}
      primaryButtonLabel={primaryButtonLabel}
      isTextCenter={false}
      {...rest}
    >
      <View style={[styles.container, containerStyle]}>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(_, index) => index.toString()}
          style={styles.list}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </CommonModal>
  );
};

export default DropdownModal;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    marginTop: 10,
  },
  list: {
    maxHeight: screenHeight * 0.4,
  },
});
