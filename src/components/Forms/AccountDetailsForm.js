import React from "react";
import { StyleSheet } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import images from "../../assets/images";
import {
  Button,
  DropdownModal,
  GroupWrapper,
  Input,
  RadioGroupRow,
  Spacing,
} from "../../components";
import theme from "../../theme";
import AutocompleteInput from "../AutocompleteInput";
import { useFormRefs } from "./useFormRefs";

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
  onBankNameChange,
  searchBankNameFromAPI,
  onSelectSuggestion,
}) => {
  const { refs, focusNext, scrollToInput } = useFormRefs([
    "accountNumber",
    "accountHolderName",
    "bankName",
    "ifscCode",
    "branchName",
  ]);

  const [showModal, setShowModal] = React.useState(false);

  return (
    <>
      <KeyboardAwareScrollView
        ref={refs.scrollRef}
        contentContainerStyle={contentContainerStyle}
        extraHeight={100}
        enableOnAndroid={true}
        enableAutomaticScroll={true}
        keyboardShouldPersistTaps="handled"
        scrollEnabled={true}
        keyboardOpeningTime={0}
      >
        <GroupWrapper title="Account Details">
          <Input
            ref={refs.accountNumber}
            label="Account Number"
            isLeftIconVisible
            leftIconName={images.bank}
            keyboardType="number-pad"
            onChangeText={onAccountNumberChange}
            returnKeyType="next"
            onSubmitEditing={() => focusNext("accountHolderName")}
            onFocus={() => scrollToInput("accountNumber")}
            {...(restInputProps.accountNumber || {})}
          />
          <Spacing size="md" />
          <Input
            ref={refs.accountHolderName}
            label="Account Holder Name"
            isLeftIconVisible
            leftIconName={images.bank}
            onChangeText={onAccountHolderNameChange}
            returnKeyType="next"
            onSubmitEditing={() => focusNext("bankName")}
            onFocus={() => scrollToInput("accountHolderName")}
            {...(restInputProps.accountHolderName || {})}
          />
          <Spacing size="md" />
          <AutocompleteInput
            ref={refs.bankName}
            restProps={{
              label: "Bank Name",
              isLeftIconVisible: true,
              leftIconName: images.bank,
              onChangeText: onBankNameChange,
              returnKeyType: "next",
              onSubmitEditing: () => focusNext("ifscCode"),
              onFocus: () => scrollToInput("bankName"),
            }}
            fetchSuggestions={searchBankNameFromAPI}
            onSelectSuggestion={onSelectSuggestion}
            value={restInputProps.bankName?.value || ""}
            suggestionTextKey={"bank"}
            {...(restInputProps.bankName || {})}
          />
          <Spacing size="md" />
          <Input
            ref={refs.ifscCode}
            label="IFSC Code"
            isLeftIconVisible
            leftIconName={images.bank}
            onChangeText={onIFSCCodeChange}
            onFocus={() => scrollToInput("ifscCode")}
            {...(restInputProps.ifscCode || {})}
          />
          <Spacing size="md" />
          <Input
            ref={refs.branchName}
            label="Branch Name"
            isLeftIconVisible
            leftIconName={images.bank}
            {...(restInputProps.branchName || {})}
          />
          <Spacing size="md" />
          <RadioGroupRow
            label="Settlement Preference"
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
        onSelect={(item, index) => onSelectBank && onSelectBank(item, index)}
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
