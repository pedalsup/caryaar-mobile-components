import React, { useImperativeHandle } from "react";
import { StyleSheet, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import images from "../../assets/images";
import {
  Button,
  DropdownModal,
  GroupWrapper,
  Input,
  Spacing,
  Text,
} from "../../components";
import theme from "../../theme";

const LocationDetailsForm = React.forwardRef(
  (
    {
      companyName,
      shopNo,
      buildingName,
      street,
      area,
      stateName,
      pincode,
      cityName,
      onChangeCompanyName,
      onChangeShopNo,
      onChangeBuildingName,
      onChangeStreet,
      onChangeArea,
      onChangePincode,
      onGoogleMapPress,
      handleNextPress,
      contentContainerStyle,
      restCompanyProps,
      restInputProps = {},
      dropdownOptions,
      onSelectState = () => {},
    },
    ref
  ) => {
    const refs = {
      scrollRef: React.useRef(null),
      companyName: React.useRef(null),
      shopOfficeNumber: React.useRef(null),
      buildingName: React.useRef(null),
      street: React.useRef(null),
      area: React.useRef(null),
      state: React.useRef(null),
      pincode: React.useRef(null),
      district: React.useRef(null),
      googleMapLocation: React.useRef(null),
    };

    const focusNext = (key) => {
      refs[key]?.current?.focus();
    };

    const scrollToInput = (key) => {
      if (refs.scrollRef?.current && refs[key]?.current) {
        refs.scrollRef.current.scrollToFocusedInput(refs[key].current, 400);
      }
    };

    useImperativeHandle(ref, () => ({
      refs,
      focusNext,
    }));

    const [showModal, setShowModal] = React.useState(false);

    return (
      <>
        <KeyboardAwareScrollView
          contentContainerStyle={contentContainerStyle}
          ref={refs.scrollRef}
        >
          <GroupWrapper title="Location Details">
            <Input
              ref={refs.companyName}
              label="Company Name"
              leftIconName={images.corporate}
              isLeftIconVisible
              value={companyName}
              onChangeText={(text) => {
                onChangeCompanyName && onChangeCompanyName(text);
                scrollToInput("companyName");
              }}
              returnKeyType="next"
              onSubmitEditing={() => focusNext("shopOfficeNumber")}
              // onFocus={() => scrollToInput("companyName")}
              {...(restInputProps.companyName || {})}
            />
            <Spacing size="md" />
            <Input
              ref={refs.shopOfficeNumber}
              label="Shop/Office No."
              leftIconName={images.corporate}
              isLeftIconVisible
              value={shopNo}
              onChangeText={(text) => {
                onChangeShopNo && onChangeShopNo(text);
                scrollToInput("shopOfficeNumber");
              }}
              returnKeyType="next"
              onSubmitEditing={() => focusNext("buildingName")}
              {...restInputProps}
              // onFocus={() => scrollToInput("shopOfficeNumber")}
              {...(restInputProps.shopOfficeNumber || {})}
            />
            <Spacing size="md" />
            <Input
              ref={refs.buildingName}
              label="Building Name"
              leftIconName={images.corporate}
              isLeftIconVisible
              value={buildingName}
              onChangeText={(text) => {
                onChangeBuildingName && onChangeBuildingName(text);
                scrollToInput("buildingName");
              }}
              returnKeyType="next"
              onSubmitEditing={() => focusNext("street")}
              // onFocus={() => scrollToInput("buildingName")}
              {...(restInputProps.buildingName || {})}
            />
            <Spacing size="md" />
            <Input
              ref={refs.street}
              label="Street"
              leftIconName={images.locationPin}
              isLeftIconVisible
              value={street}
              returnKeyType="next"
              onSubmitEditing={() => focusNext("area")}
              // onFocus={() => scrollToInput("street")}
              onChangeText={(text) => {
                onChangeStreet && onChangeStreet(text);
                scrollToInput("street");
              }}
              {...(restInputProps.street || {})}
            />
            <Spacing size="md" />
            <Input
              ref={refs.area}
              label="Area"
              leftIconName={images.locationPin}
              isLeftIconVisible
              value={area}
              onChangeText={(text) => {
                onChangeArea && onChangeArea(text);
                scrollToInput("area");
              }}
              returnKeyType="next"
              onSubmitEditing={() => focusNext("pincode")}
              // onFocus={() => scrollToInput("area")}
              {...(restInputProps.area || {})}
            />
            <Spacing size="md" />
            <Input
              ref={refs.state}
              label="State"
              leftIconName={images.locationPin}
              isLeftIconVisible
              isAsDropdown
              isRightIconVisible
              value={stateName}
              onPress={() => setShowModal(true)}
              returnKeyType="next"
              // onFocus={() => scrollToInput("state")}
              {...(restInputProps.state || {})}
            />
            <Spacing size="md" />
            <Input
              ref={refs.pincode}
              label="Pincode"
              leftIconName={images.locationPin}
              isLeftIconVisible
              value={pincode}
              onChangeText={(text) => {
                onChangePincode && onChangePincode(text);
                scrollToInput("pincode");
              }}
              rightLabel={cityName}
              // onFocus={() => scrollToInput("pincode")}
              {...(restInputProps.pincode || {})}
            />
            <Spacing size="md" />

            <Text type="label">Google Map Location</Text>
            <View style={styles.mapContainer} onTouchEnd={onGoogleMapPress} />
          </GroupWrapper>

          <Spacing size="xl" />
          <Button label={"Next"} onPress={handleNextPress} />
        </KeyboardAwareScrollView>
        <DropdownModal
          visible={showModal}
          data={dropdownOptions}
          selectedItem={stateName}
          onSelect={(item, index) => {
            onSelectState(item, index);
          }}
          onClose={() => setShowModal(false)}
          title="Select Your State"
        />
      </>
    );
  }
);

const styles = StyleSheet.create({
  wrapper: {
    padding: theme.sizes.padding,
  },
  mapContainer: {
    marginTop: 8,
    backgroundColor: theme.colors.saveGradient[0],
    height: 125,
    borderRadius: 20,
  },
});

export default LocationDetailsForm;
