import { useEditProfile } from "/src/hooks/useEditProfile.js";
import { useDateFormat } from "/src/hooks/useDateFormat.js";
import { ToastContainer } from "react-toastify";

import { SettingsInputBox } from "/src/ui/components/molecules/SettingsInputBox/SettingsInputBox.jsx";
import { SettingsSaveButton } from "/src/ui/components/atoms/Buttons/SettingsSaveButton/SettingsSaveButton.jsx";
import { EditProfileImgButton } from "/src/ui/components/atoms/Buttons/EditProfileImgButton/EditProfileImgButton.jsx";
import { SettingsSelectInputBox } from "/src/ui/components/molecules/SettingsSelectInputBox/SettingsSelectInputBox.jsx";
import { SettingsDateInputBox } from "/src/ui/components/molecules/SettingsDateInputBox/SettingsDateInputBox.jsx";

import countryList from 'react-select-country-list';
import { currenciesData } from '/src/hooks/JsonDataHelper.js';

import './SettingsEditProfile.css';
import 'react-toastify/dist/ReactToastify.css';

export const EditProfile = () => {
  const {
    userDetails,
    setLastName,
    setProfession,
    setCurrency,
    setBirthDate,
    setCountry,
    setPostalCode,
    handleSave,
    isLoading
  } = useEditProfile();
  const formattedBirthDate = useDateFormat(userDetails?.birthDate);
  const countries = countryList().getData(); // TODO: optimize
  const currencies = currenciesData().getData();

  if (isLoading) {
    return <></>;
  }

  return (
    <div className={'edit-profile-container'}>
      <div className={'edit-profile-info-container'}>
        <div className={'edit-profile-img-box'}>
          <EditProfileImgButton/>
        </div>
        <div className={'edit-profile-info'}>
          <ul className={'edit-profile-list'}> {/* TODO: optimize inputs */}
            <SettingsInputBox
              title={'Your Name'}
              type={'text'}
              placeholder={userDetails?.firstName}
              readOnly={true}
              style={{cursor: 'default'}}
            />
            <SettingsInputBox
              title={'Last Name'}
              type={'text'}
              placeholder={userDetails?.lastName || 'Enter your last name'}
              onChange={(e) => setLastName(e.target.value)}
              maxLength={10}
            />
            <SettingsInputBox
              title={'Your Email'}
              type={'email'}
              placeholder={userDetails?.email}
              readOnly={true}
              style={{cursor: 'default'}}
            />
            <SettingsInputBox
              title={'Profession'}
              type={'text'}
              placeholder={userDetails?.profession || 'Enter your profession'}
              onChange={(e) => setProfession(e.target.value)}
              maxLength={15}
            />
            <SettingsDateInputBox
              title={'Date of Birth'}
              type={'date'}
              placeholder={formattedBirthDate || 'Select your birthday'}
              onChange={setBirthDate}
            />
            <SettingsSelectInputBox
              title={'Country'}
              list={countries}
              placeholder={userDetails?.country || 'Select your country'}
              onChange={(selectedOption) => setCountry(selectedOption ? selectedOption.label : '')}
            />
            <SettingsSelectInputBox
              title={'Currency'}
              list={currencies}
              placeholder={userDetails?.currency || 'Select a currency'}
              onChange={(selectedOption) => setCurrency(selectedOption ? selectedOption.label : '')}
            />
            <SettingsInputBox
              title={'Postal Code'}
              type={'text'}
              placeholder={userDetails?.postalCode || 'Enter your postal code'}
              onChange={(e) => setPostalCode(e.target.value)}
              maxLength={8}
            />
          </ul>
        </div>
      </div>
      <SettingsSaveButton label={'Save'} onClick={handleSave}/>
      <ToastContainer
        style={{top: '50px'}}
        position={"top-center"}
        autoClose={1500}
        pauseOnHover={false}
      />
    </div>
  )
}