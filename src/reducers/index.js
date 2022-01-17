const initialState = {
    users: [],
    boards: [],
    columns: [],
    tasks: [],
    comments: [],
    activeBoard: null,
    boardsLoadingStatus: 'idle',
    modalActive: false,
    activeTask: null,
    activeUser: null
}

function inArray(arr) {
    return function(x) {
      return !arr.includes(x);
    };
  }

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'USER_ADDED':
            return {
                ...state,
                users: [...state.users, action.payload]
            }
        case 'ACTIVE_USER_CHANGED':
            return {
                ...state,
                activeUser: action.payload.name
            }
        case 'SET_MODAL_ACTIVE':
            return {
                ...state,
                modalActive: action.payload.modalActive,
                activeTask: action.payload.activeTask
            }
        case 'BOADRS_FETCHING':
            return {
                ...state,
                boardsLoadingStatus: 'loading'
            }
        case 'BOADRS_FETCHED':
            return {
                ...state,
                boards: action.payload,
                boardsLoadingStatus: 'idle'
            }
        case 'BOADRS_FETCHING_ERROR':
            return {
                ...state,
                boardsLoadingStatus: 'error'
            }
            case 'COLUMNS_FETCHING':
            return {
                ...state,
                boardsLoadingStatus: 'loading'
            }
        case 'COLUMNS_FETCHED':
            return {
                ...state,
                columns: action.payload,
                boardsLoadingStatus: 'idle'
            }
        case 'COLUMNS_FETCHING_ERROR':
            return {
                ...state,
                boardsLoadingStatus: 'error'
            }
        case 'TASKS_FETCHING':
            return {
                ...state,
                boardsLoadingStatus: 'loading'
            }
        case 'TASKS_FETCHED':
            return {
                ...state,
                tasks: action.payload,
                boardsLoadingStatus: 'idle'
            }
        case 'TASKS_FETCHING_ERROR':
            return {
                ...state,
                boardsLoadingStatus: 'error'
            }
            case 'COMMENTS_FETCHING':
            return {
                ...state,
                boardsLoadingStatus: 'loading'
            }
        case 'COMMENTS_FETCHED':
            return {
                ...state,
                comments: action.payload,
                boardsLoadingStatus: 'idle'
            }
        case 'COMMENTS_FETCHING_ERROR':
            return {
                ...state,
                boardsLoadingStatus: 'error'
            }
        case 'BOARD_CREATED':
            return {
                ...state,
                boards: [...state.boards, action.payload]
            }
        case 'BOARD_DELETED':
            return {
                ...state,
                boards: state.boards.filter(item => item.id !== action.payload)
            }
        case 'BOARD_UPDATED':
            return {
                ...state,
                boards: state.boards.map(item => {
                    if (item.id === action.payload.id) {
                        return {...item, name: action.payload.newName}
                    }
                    return item
                }),
                activeBoard: {
                    ...state.activeBoard,
                    name: action.payload.newName
                }
            }
        case 'ACTIVE_BOARD_CHANGED':
            return {
                ...state,
                activeBoard: state.boards.find(item => item.id === action.payload)
            }
        case 'COLUMN_CREATED':
            return {
                ...state,
                columns: [...state.columns, action.payload]
            }
        case 'COLUMN_DELETED':
            return {
                ...state,
                columns: state.columns.filter(item => item.id !== action.payload)
            }
        case 'TASK_CREATED':
            return {
                ...state,
                tasks: [...state.tasks, action.payload]
            }
        case 'TASK_DELETED':
            return {
                ...state,
                tasks: state.tasks.filter(item => item.id !== action.payload)
                //tasks: state.tasks.filter(inArray(action.payload))
            }

        case 'COMMENT_CREATED':
            return {
                ...state,
                comments: [...state.comments, action.payload]
            }
        default: return state
    }
}

export default reducer;