import { atom } from "recoil";

export const accountState = atom({
    key: 'accountState', // unique ID (with respect to other atoms/selectors)
    default: {
        email: undefined,
        displayName: undefined,
        isNewUser: undefined,
        emailVerified: undefined,
        uid: undefined
    }, // default value (aka initial value)
});