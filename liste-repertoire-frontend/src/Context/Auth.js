import {createContext,useContext} from 'react'; 

export const contexteAUTH=createContext();
export function UtiliseAUTH(){
    return useContext(contexteAUTH);
}

