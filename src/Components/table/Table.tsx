import {
  createColumnHelper,
  SortingState,
  useReactTable,
  ColumnFiltersState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  flexRender
} from '@tanstack/react-table'
import { Product } from '../../types/types'
import { useState } from 'react'
import Filter from '../filter/Filter'
import Pagination from '../pagination/Pagination'

const columnHelper = createColumnHelper<Product>()

const columns = [
  columnHelper.accessor('title', {
    header: () => <span>Title</span>,
    enableSorting: false,
  }),
  columnHelper.accessor('description', {
    header: () => <span>Description</span>,
    enableSorting: false,
    enableColumnFilter: false,
  }),
  columnHelper.accessor('price', {
    header: () => <span>Price</span>,
    enableSorting: false,
    enableColumnFilter: false,
  }),
  columnHelper.accessor('rating', {
    header: () => <span>Rating</span>,
    enableSorting: false,
    enableColumnFilter: false,
  }),
  columnHelper.accessor('stock', {
    header: () => <span>Stock</span>,
    enableSorting: false,
    enableColumnFilter: false,
  }),
  columnHelper.accessor('brand', {
    header: () => <span>Brand</span>,
    enableColumnFilter: false,
  }),
  columnHelper.accessor('category', {
    header: () => <span>Category</span>,
    enableColumnFilter: false,
  }),
  columnHelper.accessor('images', {
    header: () => <span>Image</span>,
    cell: tableProps => <img src={tableProps.row.original.images[0]} loading="lazy" alt={tableProps.row.original.title}></img>,
    enableSorting: false,
    enableColumnFilter: false,
  }),
]

function Table({data} : {data: Array<Product>}) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnFilters
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  })

  return (
    <>
      <table>
          <thead>
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <th key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : (
                        <>
                          <div
                            {...{
                              className: header.column.getCanSort()
                                ? "sortable"
                                : "unsortable",
                              onClick: header.column.getToggleSortingHandler(),
                            }}
                          >
                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                            {{
                              asc: ' (По возрастанию)',
                              desc: ' (По убыванию)',
                            }[header.column.getIsSorted() as string] ?? null}
                        </div>
                        {header.column.getCanFilter() ? (
                          <Filter column={header.column} />
                        ) : null}
                      </>
                      )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
            <tbody>
              {table.getRowModel().rows.map(row => (
                <tr key={row.id}>
                  {row.getVisibleCells().map(cell => (
                    <td key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell, 
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
        </table>
        <Pagination table={table} />
      </>
  )
}

export default Table;
