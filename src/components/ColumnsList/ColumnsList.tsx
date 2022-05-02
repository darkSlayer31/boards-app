import {useAppSelector} from '../../hooks';

import ColumnsItem from '../ColumnsItem';

type ColumnsListProps = {
  boardId: string;
};

const ColumnsList = ({boardId}: ColumnsListProps) => {
  const {columns} = useAppSelector((state) => state.boards);
  const filteredColumns = columns.filter((item) => item.parent === boardId);

  return filteredColumns.length === 0 ? (
    <div className="columns__header">Колонок пока нет</div>
  ) : (
    <>
      {filteredColumns.map(({id, ...props}) => {
        return <ColumnsItem key={id} id={id} {...props} />;
      })}
    </>
  );
};

export default ColumnsList;
