import { useSelector } from "react-redux";

import ColumnsItem from "../ColumnsItem"

const ColumnsList = ({boardId}) => {

    const {columns} = useSelector(state => state)
    const filteredColumns = columns.filter(item => item.parent === boardId);

    const renderColumnsList = (arr) => {
        if (arr.length === 0) {
            return (
                <div className="columns__header">Колонок пока нет</div>
            )
        }

        return arr.map(({id, ...props}) => {
            return <ColumnsItem key={id} id={id} {...props}/>
        })
    }

    const elements = renderColumnsList(filteredColumns)

    return (
        <>
            {elements}
        </>
    )
}

export default ColumnsList;