import React from "react";
import {
  Image,
  StyleSheet,
  View,
  ViewStyle,
  ImageStyle,
  ImageSourcePropType,
} from "react-native";
import images from "../assets/images";
import { Pressable, Text } from "./";
import theme from "../theme";

type ImageUploadButtonProps = {
  label?: string,
  btnLabel: string,
  onPress?: () => void,
  handleImagePick: () => void,
  image?: string,
  wrapperStyle?: ViewStyle,
  uploadBoxStyle?: ViewStyle,
  imageStyle?: ImageStyle,
  previewHeight?: number,
};

const ImageUploadButton = ({
  label,
  btnLabel,
  onPress,
  handleImagePick,
  image,
  wrapperStyle,
  uploadBoxStyle,
  imageStyle,
  previewHeight = 90,
  isError,
  statusMsg,
  statusTextColor,
  statusMsgStyle,
  viewImage,
  isDocument,
  fileType,
  onDeletePress,
  isView,
}: ImageUploadButtonProps) => {
  const renderImageContent = () => {
    if (image) {
      return (
        <>
          {isDocument ? (
            <View style={[styles.dashedWrapper, { height: previewHeight }]}>
              <Image
                source={images.applicationSolid} // your document icon here
                style={styles.documentIcon}
              />
              <Text size={"small"}>{fileType}</Text>
            </View>
          ) : (
            <Image
              source={{ uri: image }}
              style={[
                styles.imagePreview,
                { height: previewHeight },
                imageStyle,
              ]}
            />
          )}
          {!isView && (
            <Pressable onPress={onDeletePress} style={styles.deleteIcon}>
              <Image source={images.icDelete} style={styles.iconOverlay} />
            </Pressable>
          )}
        </>
      );
    }

    return (
      <Pressable style={[uploadBoxStyle]} onPress={handleImagePick}>
        <View style={[styles.dashedWrapper, { height: previewHeight }]}>
          <Image source={images.icUpload} style={styles.icon} />
          <Text type="helper-text" size="caption" textAlign="center">
            {btnLabel}
          </Text>
        </View>
      </Pressable>
    );
  };
  return (
    <View style={[styles.container, wrapperStyle]}>
      {label ? <Text type="label">{label}</Text> : null}

      <Pressable style={[styles.uploadBox, uploadBoxStyle]} onPress={viewImage}>
        {renderImageContent()}
      </Pressable>

      {isError ? (
        <Text
          type={"status"}
          lineHeight={theme.typography.lineHeights.small}
          style={[
            { alignSelf: "flex-start" },
            {
              color:
                statusTextColor ?? isError
                  ? theme.colors.error
                  : theme.colors.success,
            },
            statusMsgStyle,
          ]}
        >
          {statusMsg}
        </Text>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  label: {},
  uploadBox: {
    borderRadius: 12,
    backgroundColor: "#F9F9F9",
    padding: 7,
    marginTop: theme.sizes.spacing.sm,
  },
  dashedWrapper: {
    borderWidth: 1.5,
    borderStyle: "dashed",
    borderColor: "#5DB4F2",
    borderRadius: 12,
    backgroundColor: "#E9F4FD",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
  },
  imagePreview: {
    width: "100%",
    borderRadius: 8,
    resizeMode: "cover",
  },
  icon: {
    width: 28,
    height: 28,
    marginBottom: 8,
  },
  documentIcon: {
    width: 30,
    height: 30,
    resizeMode: "contain",
    marginBottom: 5,
  },

  deleteIcon: {
    position: "absolute",
    top: 0,
    right: 0,
    height: 28,
    width: 28,
  },
  iconOverlay: {
    width: 28,
    height: 28,
  },
});

export default React.memo(ImageUploadButton);
