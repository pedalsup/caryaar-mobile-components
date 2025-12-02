import React, { memo, useCallback } from "react";
import { View, StyleSheet, Platform } from "react-native";
import { Text, VehicleImageCard } from ".";
import theme from "../theme";
import { getMimeFromUrl } from "../utils/helper";

const DocumentGroup = ({
  title,
  documents = [],
  isView,
  isDocument,
  viewImage,
  containerStyle,
  rowStyle,
  itemStyle,
  vehicleCardProps = {},
  btnLabel = "Click to Upload\nImage or PDF",
}) => {
  const renderDocument = useCallback(
    (doc, index) => {
      const fileUri = doc?.docObject?.uri;
      const fileType = getMimeFromUrl(fileUri);

      return (
        <View key={index} style={[styles.halfWidth, itemStyle]}>
          <VehicleImageCard
            label={doc.label + (doc?.isRequired ? " *" : "")}
            image={fileUri}
            onDeletePress={doc.onDeletePress}
            viewImage={doc.viewImage}
            fileType={fileType}
            isView={isView}
            btnLabel={doc?.btnLabel || btnLabel}
            uploadMedia={doc.uploadMedia}
            isDocument={
              isDocument && Platform.OS === "android" && fileType !== "image"
            }
            acceptedDocument={doc?.docObject?.selectedDocType}
            {...vehicleCardProps}
          />
        </View>
      );
    },
    [isView, isDocument, itemStyle, vehicleCardProps]
  );

  return (
    <View style={[styles.container, containerStyle]}>
      {title && <Text>{title}</Text>}
      <View style={[styles.rowSpaceBetween, rowStyle]}>
        {documents?.map(renderDocument)}
      </View>
    </View>
  );
};

export default memo(DocumentGroup);

const styles = StyleSheet.create({
  container: {},
  rowSpaceBetween: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: theme.sizes.spacing.smd,
  },
  halfWidth: {
    width: "48%",
    marginBottom: theme.sizes.spacing.smd,
  },
});
