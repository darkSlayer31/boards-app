import ColumnsItem from "../columnsItem/ColumnsItem"

const ColumnsList = ({columns}) => {

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

    const elements = renderColumnsList(columns)

    return (
        <>
            {elements}
        </>
    )
}

export default ColumnsList;