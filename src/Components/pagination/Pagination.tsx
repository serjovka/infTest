import  { Table } from '@tanstack/react-table'

function Pagination({ table }: { table: Table<any> }) {
  return (
    <div>
        <button
        onClick={() => table.setPageIndex(0)}
        disabled={!table.getCanPreviousPage()}
        >
        {'<<'}
        </button>
        <button
        onClick={() => table.previousPage()}
        disabled={!table.getCanPreviousPage()}
        >
        {'<'}
        </button>
        <button
        onClick={() => table.nextPage()}
        disabled={!table.getCanNextPage()}
        >
        {'>'}
        </button>
        <button
        onClick={() => table.setPageIndex(table.getPageCount() - 1)}
        disabled={!table.getCanNextPage()}
        >
        {'>>'}
        </button>
        <select
        value={table.getState().pagination.pageSize}
        onChange={e => {
            table.setPageSize(Number(e.target.value))
        }}
        >
        {[10, 20, 30].map(pageSize => (
            <option key={pageSize} value={pageSize}>
            Show {pageSize}
            </option>
        ))}
        </select>
    </div>
  );
}

export default Pagination;