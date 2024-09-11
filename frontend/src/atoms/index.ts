import { atom } from "recoil";

export const isLoggedAtom = atom({
    key: 'isLoggedAtom', 
    default: false, 
})

export const loggedUserAtom = atom({
    key: 'loggedUserAtom', 
    default: ""
})