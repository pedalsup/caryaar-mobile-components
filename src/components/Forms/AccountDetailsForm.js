import React from "react";
import { StyleSheet } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import images from "../../assets/images";
import {
  Button,
  GroupWrapper,
  Input,
  RadioGroupRow,
  Spacing,
  DropdownModal,
} from "../../components";
import theme from "../../theme";

const AccountDetailsForm = ({
  branchName,
  bankName,
  transferModes = [],
  selectedTransferMode,
  onAccountNumberChange,
  onAccountHolderNameChange,
  onBankNamePress,
  onIFSCCodeChange,
  onTransferModeSelect,
  onButtonPress,
  buttonName,
  contentContainerStyle,
  dropdownOptions,
  onSelectBank,
  restInputProps = {},
}) => {
  const refs = {
    accountNumber: React.useRef(),
    accountHolderName: React.useRef(),
    bankName: React.useRef(),
    ifscCode: React.useRef(),
    branchName: React.useRef(),
    scrollRef: React.useRef(null),
  };

  const focusNext = (key) => {
    refs[key]?.current?.focus();
  };

  const scrollToInput = (key) => {
    if (refs.scrollRef?.current && refs[key]?.current) {
      refs.scrollRef.current.scrollToFocusedInput(refs[key].current, 400);
    }
  };

  const [showModal, setShowModal] = React.useState(false);

  return (
    <>
      <KeyboardAwareScrollView
        ref={refs.scrollRef}
        contentContainerStyle={contentContainerStyle}
      >
        <GroupWrapper title="Account Details">
          <Input
            ref={refs.accountNumber}
            label="Account Number"
            isLeftIconVisible
            leftIconName={images.bank}
            keyboardType="number-pad"
            onChangeText={(text) => {
              onAccountNumberChange && onAccountNumberChange(text);
              scrollToInput("accountNumber");
            }}
            returnKeyType="next"
            onSubmitEditing={() => focusNext("accountHolderName")}
            {...(restInputProps.accountNumber || {})}
          />
          <Spacing size="md" />
          <Input
            ref={refs.accountHolderName}
            label="Account Holder Name"
            isLeftIconVisible
            leftIconName={images.bank}
            onChangeText={(text) => {
              onAccountHolderNameChange && onAccountHolderNameChange(text);
              scrollToInput("accountHolderName");
            }}
            returnKeyType="next"
            onSubmitEditing={() => focusNext("ifscCode")}
            {...(restInputProps.accountHolderName || {})}
          />
          <Spacing size="md" />
          <Input
            ref={refs.bankName}
            label="Bank Name"
            isLeftIconVisible
            leftIconName={images.bank}
            isAsDropdown
            isRightIconVisible
            onPress={() => {
              setShowModal(true);
            }}
            value={bankName}
            {...(restInputProps.bankName || {})}
          />
          <Spacing size="md" />
          <Input
            ref={refs.ifscCode}
            label="IFSC Code"
            isLeftIconVisible
            leftIconName={images.bank}
            rightLabel={branchName}
            onChangeText={(text) => {
              onIFSCCodeChange && onIFSCCodeChange(text);
              scrollToInput("ifscCode");
            }}
            {...(restInputProps.ifscCode || {})}
          />
          <Spacing size="md" />
          <RadioGroupRow
            label={"Settlement Preference"}
            options={transferModes}
            selectedValue={selectedTransferMode}
            onChange={onTransferModeSelect}
          />
        </GroupWrapper>

        <Spacing size="xl" />
        <Button label={buttonName} onPress={onButtonPress} />
      </KeyboardAwareScrollView>
      <DropdownModal
        visible={showModal}
        data={dropdownOptions}
        selectedItem={bankName}
        onSelect={(item, index) => {
          onSelectBank && onSelectBank(item, index);
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
});

export default AccountDetailsForm;
