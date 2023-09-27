import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { Product } from '../../types/types'

const columnHelper = createColumnHelper<Product>()

const columns = [
  columnHelper.accessor('title', {
    header: () => <span>Title</span>,
  }),
  columnHelper.accessor('description', {
    header: () => <span>Description</span>,
  }),
  columnHelper.accessor('price', {
    header: () => <span>Price</span>,
  }),
  columnHelper.accessor('rating', {
    header: () => <span>Rating</span>,
  }),
  columnHelper.accessor('stock', {
    header: () => <span>Stock</span>,
  }),
  columnHelper.accessor('brand', {
    header: () => <span>Brand</span>,
  }),
  columnHelper.accessor('category', {
    header: () => <span>Category</span>,
  }),
  columnHelper.accessor('images', {
    header: () => <span>Image</span>,
    cell: tableProps => <img className='logo' src={tableProps.row.original.images[0]}></img>
  }),
]

function Table({data} : {data: Array<Product>}) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <table>
        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
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
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
  )
}

export default Table;
