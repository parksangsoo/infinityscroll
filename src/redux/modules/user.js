import axios from 'axios';
import { createAction, handleActions } from 'redux-actions';
import { produce } from "immer";


const GET = 'GetContactList';

const getUser = createAction(GET, (user) => ({ user }));

const initialState = {
    contactCollection:[],
    hasMore:true,
    loading:true
};

export function GetContactsList(page){
    return async function getContactsForCardsThunk(dispatch){
        const params = { page:page, results:30}
        const response = await axios.get('https://randomuser.me/api/', {params:params})
        if(response){
            console.log(response.data.results)
            dispatch(getUser(response.data.results))
        }
    }
}

export default handleActions(
    {
        [GET]: (state, action) =>
        produce(state, (draft) => {
            if(action.payload !== undefined){
                draft.hasMore = action.payload.user.length !== 0 ? true : false
            } else {
                draft.hasMore = false
            }
            console.log(draft.contactCollection)
            draft.contactCollection = draft.hasMore!==true?draft.contactCollection : draft.contactCollection.concat(action.payload.user);
        }),
    },
    initialState
);

const actionCreators = {
    GetContactsList
};

export { actionCreators };

