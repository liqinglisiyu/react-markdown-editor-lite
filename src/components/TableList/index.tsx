// TableList
import * as React from 'react'
import './index.less'

interface TableListProps {
  maxRow?: number;
  maxCol?: number;
  onSetTable?: (table: { row: number, col: number }) => void;
}

interface TableListState {
  maxRow: number,
  maxCol: number,
  list: number[][];
}

class TableList extends React.Component<TableListProps, TableListState> {
  config = {
    padding: 3,
    width: 20,
    height: 20
  }

  constructor(props: any) {
    super(props)
    const { maxRow = 5, maxCol = 6 } = props
    this.state = {
      maxRow: maxRow,
      maxCol: maxCol,
      list: this.formatTableModel(maxRow, maxCol)
    }
  }

  formatTableModel(maxRow = 0, maxCol = 0) {
    const result = new Array(maxRow).fill(undefined);
    return result.map(_ => {
      return new Array(maxCol).fill(0)
    });
  }

  calcWrapStyle() {
    const { maxRow, maxCol } = this.state
    const { width, height, padding } = this.config
    const wrapWidth = (width + padding) * maxCol - padding
    const wrapHeight = (height + padding) * maxRow - padding
    return {
      width: `${wrapWidth}px`,
      height: `${wrapHeight}px`,
    }
  }

  calcItemStyle(row = 0, col = 0) {
    const { width, height, padding } = this.config
    const top = (height + padding) * row
    const left = (width + padding) * col
    return {
      top: `${top}px`,
      left: `${left}px`,
    }
  }

  handleHover(i: number, j: number) {
    const { list } = this.state
    const newList = list.map((v, row) => {
      return v.map((_, col) => {
        return (row <= i && col <= j) ? 1 : 0;
      });
    });
    this.setState({
      list: newList
    });
  }

  handleSetTable(i: number, j: number) {
    const { onSetTable } = this.props
    typeof onSetTable === 'function' && onSetTable({ row: i, col: j })
  }

  render() {
    return (
      <ul className="table-list wrap" style={this.calcWrapStyle()}>
        {this.state.list.map((row, i) => {
          return row.map((col, j) => {
            return (
              <li
                className={`list-item ${col === 1 ? 'active' : ''}`}
                key={`${i}-${j}`}
                style={this.calcItemStyle(i, j)}
                onMouseOver={this.handleHover.bind(this, i, j)}
                onClick={this.handleSetTable.bind(this, i, j)}
              ></li>
            );
          })
        })}
      </ul>
    )
  }
}
export default TableList