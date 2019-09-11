import React, { Component } from 'react';

class TableHeader extends Component {

    // columns: array
    // sortColumn: object
    // onSort: function

    raiseSort = path => {
        const sortColumn = { ...this.props.sortColumn };
        if (sortColumn.path === path)
            sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
        else {
            sortColumn.path = path;
            sortColumn.order = 'asc';
        }
        this.props.onSort(sortColumn)
    }

    //If column is not sorted, do not show icon, if sorted in ascending order
    //show ascending sort icon, otherwise show descending sort icon
    renderSortIcon = column => {
        const sortColumn = { ...this.props.sortColumn };

        if (column.path !== sortColumn.path) return null;
        if (sortColumn.order === 'asc') return <i className="fa fa-sort-asc" />;
        return <i className="fa fa-sort-desc" />
    }

    render() {
        return (
            <thead>
                <tr>
                    {this.props.columns.map(column => (
                        <th
                            className="clickable"
                            key={column.path || column.key}
                            onClick={() => this.raiseSort(column.path)}>
                            {column.label} {this.renderSortIcon(column)}
                        </th>
                    ))}
                </tr>
            </thead>

        );
    }
}

export default TableHeader;