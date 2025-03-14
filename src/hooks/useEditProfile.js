import { useState, useEffect } from 'react';
import { ProfileMain } from '/src/services/auth/ProfileMain.js';
import { toast } from 'react-toastify';

export const useEditProfile = () => {
  const { userDetails, updateProfileData } = ProfileMain();
  const [lastName, setLastName] = useState("");
  const [profession, setProfession] = useState("");
  const [currency, setCurrency] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [country, setCountry] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const handleSave = async () => {
    try {
      const updatedData = {};

      if (lastName && lastName !== userDetails?.lastName) {
        updatedData.lastName = lastName;
      }
      if (profession && profession !== userDetails?.profession) {
        updatedData.profession = profession;
      }
      if (currency && currency !== userDetails?.currency) {
        updatedData.currency = currency;
      }
      if (birthDate && birthDate !== userDetails?.birthDate) {
        updatedData.birthDate = birthDate;
      }
      if (country && country !== userDetails?.country) {
        updatedData.country = country;
      }
      if (postalCode && postalCode !== userDetails?.postalCode) {
        updatedData.postalCode = postalCode;
      }

      if (Object.keys(updatedData).length > 0) {
        await updateProfileData(updatedData);
        console.log('Profile successfully updated');
        toast.success('Profile successfully updated')
      }
      if (Object.keys(updatedData).length === 0) {
        console.log('No data to update');
        toast.warning('Enter data to save');
      }
    } catch (error) {
      console.error('Error saving profile data:', error);
      toast.error('Error saving data');
    }
  };

  useEffect(() => {
    if (userDetails) {
      setLastName(userDetails.lastName || '');
      setProfession(userDetails.profession || '');
      setCurrency(userDetails.currency || '');
      setBirthDate(userDetails.birthDate || '');
      setCountry(userDetails.country || '');
      setPostalCode(userDetails.postalCode || '');
      setIsLoading(false);
    }
  }, [userDetails]);

  return {
    userDetails,
    setLastName,
    setProfession,
    setCurrency,
    setBirthDate,
    setCountry,
    setPostalCode,
    handleSave,
    isLoading
  };
};
