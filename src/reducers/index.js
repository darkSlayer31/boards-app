const initialState = {
    users: [],
    boards: [],
    columns: [],
    tasks: [],
    comments: [],
    activeBoardId: null,
    boardsLoadingStatus: 'idle',
    modalActive: false,
    activeTask: null,
    activeUser: null
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'USERS_FETCHED':
            return {
                ...state,
                users: action.payload
            }
        case 'USER_ADDED':
            return {
                ...state,
                users: [...state.users, action.payload]
            }
        case 'ACTIVE_USER_CHANGED':
            return {
                ...state,
                activeUser: action.payload
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
                boards: state.boards.filter(item => item.id !== action.payload),
                columns: state.columns.filter(item => item.parent !== action.payload),
                tasks: state.tasks.filter(item => item.boardParent !== action.payload),
                comments: state.comments.filter(item => item.boardParent !== action.payload)
            }
        case 'BOARD_UPDATED':
            return {
                ...state,
                boards: state.boards.map(item => {
                    if (item.id === action.payload.id) {
                        return {...item, name: action.payload.newName}
                    }
                    return item
                })
            }
        case 'ACTIVE_BOARD_CHANGED':
            return {
                ...state,
                activeBoardId: action.payload
            }
        case 'COLUMN_CREATED':
            return {
                ...state,
                columns: [...state.columns, action.payload]
            }
        case 'COLUMN_DELETED':
            return {
                ...state,
                columns: state.columns.filter(item => item.id !== action.payload),
                tasks: state.tasks.filter(item => item.parent !== action.payload),
                comments: state.comments.filter(item => item.columnParent !== action.payload)
            }
        case 'TASK_CREATED':
            return {
                ...state,
                tasks: [...state.tasks, action.payload]
            }
        case 'TASK_DELETED':
            return {
                ...state,
                tasks: state.tasks.filter(item => item.id !== action.payload),
                comments: state.comments.filter(item => item.parent !== action.payload)
            }

        case 'COMMENT_CREATED':
            return {
                ...state,
                comments: [...state.comments, action.payload]
            }

        case 'COMMENT_DELETED':
            return {
                ...state,
                comments: state.comments.filter(item => item.id !== action.payload)
            }
        case 'COMMENT_CHANGED':
            return {
                ...state,
                comments: state.comments.map(item => {
                    if (item.id === action.payload.id) {
                        return {...item, text: action.payload.text }
                    }

                    return item
                })
            }

        default: return state
    }
}

export default reducer;