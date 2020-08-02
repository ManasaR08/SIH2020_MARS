export interface UserState {
  name: string;
  access: string;
  access_token: string;
}

export const INITIAL_USER_STATE: UserState = {
    name: null,
    access: null,
    access_token: null
}

export const UserStateReducer = (state = INITIAL_USER_STATE, action) => {
    switch (action.type) {
        /******************* Setup user name ************************/
        case 'SET_USER':
            return {
                ...state, name: action.payload.name, access: action.payload.access
            }
        /******************* Token handlers **************************/
        case 'SET_TOKEN':
            return {
                ...state, access_token: action.payload
            };
        case 'REMOVE_TOKEN':
            return {
                ...state, access_token: null
            };
        case 'RESET_USER_STATE':
            return {
                ...INITIAL_USER_STATE
            }
        default:
            return state;
    }
  };
  
export interface DataState {
    suggestions: any[];
    searches: any[];
    currentResult: any;
    teachers: any[];
    suggestedTeachers: any[];
    students: any[];
    uploads: any[];
    current_user_view: string;
    currentQuestion: string;
}
export const INITIAL_DATA_STATE: DataState = {
    suggestions: [],
    searches: [],
    currentResult: null,
    teachers: [],
    suggestedTeachers: [],
    students: [],
    uploads: [],
    current_user_view: null,
    currentQuestion: null
};

export const UserDataReducer = (state = INITIAL_DATA_STATE, action) => {
    switch (action.type) {
        /*************************SUGGESTIONS***********************/
        case 'ADD_SUGGESTIONS':
            return {
                ...state, suggestions: action.payload
            }
        /************************SEARCH *****************************/
        case 'ADD_SEARCH':
            return {
                ...state, searches: [...state.searches, 
                    {
                        _id: action.payload.id,
                        search: action.payload.text,
                        result: action.payload.result,
                        type: action.payload.type
                    }],
                currentResult: action.payload.id                
            }          
        case 'SET_SEARCH':
            return {
                ...state,
                currentResult: action.payload                
            }
        case 'SET_SEARCHES':
            return {
                ...state, searches: action.payload, 
            }
        
        case 'ADD_TEACHER':
            return {
                ...state, teachers: [...state.teachers, {_id: action.payload.id, name: action.payload.name, uploads: action.payload.uploads}],
                suggestedTeachers: state.suggestedTeachers.filter(teacher => teacher._id !== action.payload.id)
            }
        case 'SET_TEACHERS':
            return {
                ...state, teachers: action.payload
            }
        case 'SET_POPULAR_TEACHERS':
            return {
                ...state, suggestedTeachers: action.payload
            }
        case 'SET_STUDENTS':
            return {
                ...state, students: action.payload
            }
        case 'SET_UPLOADS':
            return {
                ...state, uploads: action.payload
            }
        case 'ADD_UPLOAD': 
            return {
                ...state, uploads: [...state.uploads, {_id: action.payload.id, name: action.payload.name, pdf: action.payload.pdf, ppt: action.payload.ppt, questionBank: action.payload.questions}]
            }
        case 'DELETE_DOCUMENT':
            return {
                ...state, uploads: state.uploads.filter(upload => upload._id !== action.payload)
            }
        case 'SET_CURRENT_USER_VIEW':
            return {
                ...state, current_user_view: action.payload
            }
        case 'SET_CURRENT_QUESTION':
            return {
                ...state, currentQuestion: action.payload
            }
        case 'RESET_DATA_STATE':
            return {
                ...INITIAL_DATA_STATE
            }
        default:
            return state;
        
    }
}