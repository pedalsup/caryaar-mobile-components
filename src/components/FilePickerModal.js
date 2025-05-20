import React from "react";
import { CommonModal, Pressable, InfoRow, Spacing } from "./";
import theme from "../theme";
import { images } from "../assets";

/**
 * Default upload method options shown in the modal.
 */
const DEFAULT_OPTIONS = [
  { label: "Camera", value: "camera", icon: images.file_camera },
  { label: "Photo Gallery", value: "gallery", icon: images.file_gallery },
  { label: "Documents", value: "document", icon: images.file_documents },
];

/**
 * A reusable modal component for picking file upload methods such as
 * Camera, Gallery, or Documents.
 *
 * @component
 * @param {Object} props - Component props
 * @param {boolean} props.isVisible - Controls the modal visibility
 * @param {Function} props.onClose - Callback when the modal is closed
 * @param {Function} props.onSelect - Callback when an option is selected (returns the selected value)
 * @param {string} [props.title="Choose Upload Method"] - Title of the modal
 * @param {Array} [props.options=DEFAULT_OPTIONS] - List of selectable options
 * @param {boolean} [props.autoCloseOnSelect=true] - Whether to auto-close modal on selection
 * @param {string} [props.iconTintColor=theme.colors.primary] - Tint color for icons
 *
 * @example
 * <FilePickerModal
 *   isVisible={showPicker}
 *   onClose={() => setShowPicker(false)}
 *   onSelect={(value) => handleFilePick(value)}
 * />
 */
const FilePickerModal = ({
  isVisible,
  onClose,
  onSelect,
  title = "Choose Upload Method",
  options = DEFAULT_OPTIONS,
  autoCloseOnSelect = true,
  iconTintColor = theme.colors.primary,
  restModalProp,
}) => {
  /**
   * Handles the selection of an option.
   * Calls `onSelect` and optionally closes the modal.
   *
   * @param {string} value - Selected option value
   */
  const handleSelect = (value) => {
    onSelect?.(value);
    if (autoCloseOnSelect) {
      onClose?.();
    }
  };

  return (
    <CommonModal
      isVisible={isVisible}
      onModalHide={onClose}
      isScrollableContent
      isPrimaryButtonVisible={false}
      isTextCenter={false}
      title={title}
      {...restModalProp}
    >
      {options.map(({ label, value, icon }) => (
        <Pressable
          key={value}
          onPress={() => handleSelect(value)}
          style={{ height: 45, justifyContent: "center" }}
        >
          <InfoRow
            iconSource={icon}
            text={label}
            iconStyle={{ tintColor: iconTintColor }}
            textProp={{ hankenGroteskSemiBold: true }}
          />
        </Pressable>
      ))}
      <Spacing />
    </CommonModal>
  );
};

export default FilePickerModal;
