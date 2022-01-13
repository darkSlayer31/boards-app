const initialState = {
    boards: [],
    activeBoard: null,
    boardsLoadingStatus: 'idle',
    modalActive: false,
    activeTask: null
}


const reducer = (state = initialState, action) => {
    switch (action.type) {
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
                activeBoard: {
                    ...state.activeBoard,
                    columns: [...state.activeBoard.columns, action.payload.newColumn]
                },
                boards: state.boards.map(item => {
                    if (item.id === action.payload.id) {
                        return {
                            ...item,
                            columns: [...item.columns, action.payload.newColumn]}
                    }
                    return item
                }),
            }
        case 'COLUMN_DELETED':
            return {
                ...state,
                activeBoard: {
                    ...state.activeBoard,
                    columns: state.activeBoard.columns.filter(item => item.id !== action.payload.columnId)
                },
                boards: state.boards.map(board => {
                    if (board.id === action.payload.boardId) {
                        return {
                            ...board,
                            columns: board.columns.filter(item => item.id !== action.payload.columnId)
                        }
                    }
                    return board
                })
            }
        case 'TASK_CREATED':
            return {
                ...state,
                boards: state.boards.map(board => {
                    if (board.id === action.payload.boardId) {
                        return {
                            ...board,
                            columns: board.columns.map(column => {
                                if (column.id === action.payload.columnId) {
                                    return {
                                        ...column,
                                        tasks: [...column.tasks, action.payload.newTask]
                                    }
                                }
                                return column
                            })}
                    }
                    return board
                }),
                activeBoard: {
                    ...state.activeBoard,
                    columns: state.activeBoard.columns.map(column => {
                        if (column.id === action.payload.columnId) {
                            return {
                                ...column,
                                tasks: [...column.tasks, action.payload.newTask]
                            }
                        }
                        return column
                    })
                }
            }
        case 'TASK_DELETED':
            return {
                ...state,
                activeBoard: {
                    ...state.activeBoard,
                    columns: state.activeBoard.columns.map(column => {
                        if (column.id === action.payload.columnId) {
                            return {
                                ...column,
                                tasks: column.tasks.filter(item => item.id !== action.payload.taskId)
                            }
                        }
                        return column
                    })
                },
                boards: state.boards.map(board => {
                    if (board.id === action.payload.boardId) {
                        return {
                            ...board,
                            columns: board.columns.map(column => {
                                if (column.id === action.payload.columnId) {
                                    return {
                                        ...column,
                                        tasks: column.tasks.filter(item => item.id !== action.payload.taskId)
                                    }
                                }
                                return column
                            })}
                        }
                    return board
                })
            }
        default: return state
    }
}

export default reducer;