export const setModalActive = (modalActive, activeTask) => {
    return {
        type: 'SET_MODAL_ACTIVE',
        payload: {modalActive, activeTask}
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

export const boardUpdated = (id, newName) => {
    return {
        type: 'BOARD_UPDATED',
        payload: {id, newName}
    }
}

export const activeBoardChanged = (boardId) => {
    return {
        type: 'ACTIVE_BOARD_CHANGED',
        payload: boardId
    }
}

export const columnCreated = (id, newColumn) => {
    return {
        type: 'COLUMN_CREATED',
        payload: {id, newColumn}
    }
}

export const columnDeleted = (boardId, columnId) => {
    return {
        type: 'COLUMN_DELETED',
        payload: {boardId, columnId}
    }
}

export const taskCreated = (boardId, columnId, newTask) => {
    return {
        type: 'TASK_CREATED',
        payload: {boardId, columnId, newTask}
    }
}

export const taskDeleted = (boardId, columnId, taskId) => {
    return {
        type: 'TASK_DELETED',
        payload: {boardId, columnId, taskId}
    }
}