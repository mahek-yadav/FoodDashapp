import { createContext, useContext } from "react";
import { initialAddresses } from "../data/mockData";
import { useLocalStorage } from "../hooks/useLocalStorage";

const UserContext = createContext(null);

const defaultProfile = {
  name: "Mahek Yadav",
  email: "mahek@fooddash.app",
  phone: "+91 98765 43210",
  avatar: "MY",
  dashCoins: 1280,
  loyaltyTier: "Gold",
  language: "English",
};

export function UserProvider({ children }) {
  const [profile, setProfile] = useLocalStorage("fooddash-profile", defaultProfile);
  const [addresses, setAddresses] = useLocalStorage("fooddash-addresses", initialAddresses);
  const [selectedAddressId, setSelectedAddressId] = useLocalStorage("fooddash-selected-address", initialAddresses[0].id);

  const selectedAddress = addresses.find((address) => address.id === selectedAddressId) ?? addresses[0];

  const addAddress = (address) => {
    setAddresses((current) => [{ ...address, id: `address-${Date.now()}` }, ...current]);
  };

  const updateAddress = (id, patch) => {
    setAddresses((current) => current.map((address) => (address.id === id ? { ...address, ...patch } : address)));
  };

  const removeAddress = (id) => {
    setAddresses((current) => current.filter((address) => address.id !== id));
    if (selectedAddressId === id) setSelectedAddressId(addresses[0]?.id ?? "");
  };

  const value = {
    profile,
    setProfile,
    addresses,
    selectedAddress,
    selectedAddressId,
    setSelectedAddressId,
    addAddress,
    updateAddress,
    removeAddress,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser must be used within UserProvider");
  return context;
}
