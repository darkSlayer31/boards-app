export const userAdded = (user) => {
    return {
        type: 'USER_ADDED',
        payload: user
    }
}

export const activeUserChanged = (user) => {
    return {
        type: "ACTIVE_USER_CHANGED",
        payload: user
    }
}

export const setModalActive = (modalActive, activeTask) => {
    return {
        type: 'SET_MODAL_ACTIVE',
        payload: {modalActive, activeTask}
    }
}

export const usersFetched = (users) => {
    return {
        type: 'USERS_FETCHED',
        payload: users ? users : []
    }
}

export const boardsFetching = () => {
    return {
        type: 'BOADRS_FETCHING'
    }
}

export const boardsFetched = (boards) => {
    return {
        type: 'BOADRS_FETCHED',
        payload: boards
    }
}

export const boardsFetchingError = () => {
    return {
        type: 'BOADRS_FETCHING_ERROR'
    }
}

export const columnsFetching = () => {
    return {
        type: 'COLUMNS_FETCHING'
    }
}

export const columnsFetched = (columns) => {
    return {
        type: 'COLUMNS_FETCHED',
        payload: columns
    }
}

export const columnsFetchingError = () => {
    return {
        type: 'COLUMNS_FETCHING_ERROR'
    }
}

export const tasksFetching = () => {
    return {
        type: 'TASKS_FETCHING'
    }
}

export const tasksFetched = (tasks) => {
    return {
        type: 'TASKS_FETCHED',
        payload: tasks
    }
}

export const tasksFetchingError = () => {
    return {
        type: 'TASKS_FETCHING_ERROR'
    }
}

export const commentsFetching = () => {
    return {
        type: 'COMMENTS_FETCHING'
    }
}

export const commentsFetched = (comments) => {
    return {
        type: 'COMMENTS_FETCHED',
        payload: comments
    }
}

export const commentsFetchingError = () => {
    return {
        type: 'COMMENTS_FETCHING_ERROR'
    }
}

export const boardCreated = (newBoard) => {
    return {
        type: 'BOARD_CREATED',
        payload: newBoard
    }
}

export const boardDeleted = (boardId) => {
    return {
        type: 'BOARD_DELETED',
        payload: boardId
    }
}

export const boardUpdated = (id, newBoard) => {
    return {
        type: 'BOARD_UPDATED',
        payload: {id, newBoard}
    }
}

export const activeBoardChanged = (boardId) => {
    return {
        type: 'ACTIVE_BOARD_CHANGED',
        payload: boardId
    }
}

export const activeTaskChanged = (newTask) => {
    return {
        type: 'ACTIVE_TASK_CHANGED',
        payload: newTask
    }
}

export const columnCreated = (newColumn) => {
    return {
        type: 'COLUMN_CREATED',
        payload: newColumn
    }
}

export const columnDeleted = (columnId) => {
    return {
        type: 'COLUMN_DELETED',
        payload: columnId
    }
}

export const taskCreated = (newTask) => {
    return {
        type: 'TASK_CREATED',
        payload: newTask
    }
}

export const taskDeleted = (taskId) => {
    return {
        type: 'TASK_DELETED',
        payload: taskId
    }
}

export const taskUpdated = (id, newTask) => {
    return {
        type: 'TASK_UPDATED',
        payload: {id, newTask}
    }
}

export const commentCreated = (newComment) => {
    return {
        type: 'COMMENT_CREATED',
        payload: newComment
    }
}

export const commentDeleted = (id) => {
    return {
        type: 'COMMENT_DELETED',
        payload: id
    }
}

export const commentChanged = (id, text) => {
    return {
        type: 'COMMENT_CHANGED',
        payload: {id, text}
    }
}