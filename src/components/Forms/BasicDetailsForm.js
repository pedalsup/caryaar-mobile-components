import React from 'react';
import { StyleSheet, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {
  Button,
  DropdownModal,
  GroupWrapper,
  Input,
  Spacing,
} from '../../components';
import theme from '../../theme';
import images from '../../assets/images';

const BasicDetailsForm = ({
  businessType,
  onBusinessTypePress,
  onChangeBusinessName,
  onChangeYearsInBusiness,
  onChangeMonthlyCarSales,
  onChangeOwnerName,
  onChangeMobileNumber,
  onChangeEmail,
  handleNextPress,
  dropdownOptions,
  onSelectBusinessType,
  contentContainerStyle,
  buttonLabel
}) => {
  const [showModal, setShowModal] = React.useState(false);
  return (
    <>
      <KeyboardAwareScrollView contentContainerStyle={contentContainerStyle}>
        <GroupWrapper title="Basic Detail">
          <Input
            label="Business Name"
            isLeftIconVisible
            leftIconName={images.businessSuitcase}
            onChangeText={onChangeBusinessName}
          />
          <Spacing size="md" />
          <Input
            label="Business Type"
            isRightIconVisible
            isAsDropdown
            isLeftIconVisible
            leftIconName={images.businessSuitcase}
            onPress={() => {
              setShowModal(true);
            }}
            value={businessType}
            placeholder="Select"
          />
          <Spacing size="md" />
          <View style={styles.rowSpaceBetween}>
            <View style={styles.halfWidth}>
              <Input
                placeholder=""
                isLeftIconVisible
                leftIconName={images.businessSuitcase}
                label="Years in Business"
                keyboardType="decimal-pad"
                onChangeText={onChangeYearsInBusiness}
              />
            </View>
            <View style={styles.halfWidth}>
              <Input
                placeholder=""
                isLeftIconVisible
                leftIconName={images.businessSuitcase}
                label="Monthly Car Sales"
                keyboardType="decimal-pad"
                returnKeyType="next"
                onChangeText={onChangeMonthlyCarSales}
              />
            </View>
          </View>
        </GroupWrapper>

        <Spacing size="lg" />
        <GroupWrapper title="Contact Detail">
          <Input
            label="Owner Name"
            isLeftIconVisible
            leftIconName={images.user}
            onChangeText={onChangeOwnerName}
          />
          <Spacing size="md" />
          <Input
            label="Mobile Number"
            isLeftIconVisible
            leftIconName={images.callOutline}
            keyboardType="phone-pad"
            maxLength={10}
            onChangeText={onChangeMobileNumber}
          />
          <Spacing size="md" />
          <Input
            label="Email"
            isLeftIconVisible
            leftIconName={images.email}
            keyboardType="email-address"
            onChangeText={onChangeEmail}
          />
        </GroupWrapper>

        <Spacing size="xl" />
        <Button label={buttonLabel || "Next"} onPress={handleNextPress} />
      </KeyboardAwareScrollView>
      <DropdownModal
        visible={showModal}
        data={dropdownOptions}
        selectedItem={businessType}
        onSelect={(item, index) => {
          onSelectBusinessType && onSelectBusinessType(item, index);
        }}
        onClose={() => setShowModal(false)}
        title="Select Business Type"
      />
    </>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    padding: theme.sizes.padding,
    flexGrow: 1,
    backgroundColor: theme.colors.background,
  },
  rowSpaceBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfWidth: {
    width: '48%',
  },
});

export default BasicDetailsForm;
