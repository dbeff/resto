import {FOLDER_ADD} from '../actions/index';

let initialState = {
    name:"Folder"
}

export default function(state = [initialState],action) {
    switch (action.type){
        case FOLDER_ADD:
            console.log("FOLDER_ADD reducer",action.payload);
            return [...state,action.payload];
    }
    return state;
}