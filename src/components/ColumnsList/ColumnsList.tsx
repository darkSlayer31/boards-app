import { useAppSelector } from "../../hooks";

import ColumnsItem from "../ColumnsItem"
import { Column } from '../../types/types'

interface ColumnsListProps {
    boardId: string
}

const ColumnsList = ({ boardId }: ColumnsListProps) => {

    const { columns } = useAppSelector(state => state)
    const filteredColumns = columns.filter(item => item.parent === boardId);

    const renderColumnsList = (arr: Column[]) => {
        if (arr.length === 0) {
            return (
                <div className="columns__header">Колонок пока нет</div>
            )
        }

        return arr.map(({ id, ...props }) => {
            return <ColumnsItem key={id} id={id} {...props} />
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