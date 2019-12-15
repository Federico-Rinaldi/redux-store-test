import * as fromActions from './actions';

export const initialState = {
    loaded:false,
    loading:false,
    data: [{label:'Todo di Prova',complete:false}],
};

export function reducer(
    state = initialState,
    action: {type:string;payload:any}
){
    switch(action.type){
        case fromActions.ADD_TODO : {
            const todo = action.payload;
            const data = [...state['todos'].data,todo];
            return {
                ...state,
                data,
            };
        }

        case fromActions.REMOVE_TODO : {
            const data = state['todos'].data.filter(
                todo=> todo.label !== action.payload.label
            );
            return {
                ...state,
                data,
            };
        }

        case fromActions.MODIFY_TODO : {
            let foundIndex = state['todos'].data.findIndex(todo => todo.label ===todo.label);
            const data = action.payload;
            state['todos'].data[foundIndex] = data;
            return {...state['todos'] };
            
        }
    }

    return Object.keys(state).length === 0 ? state = initialState : state;
}