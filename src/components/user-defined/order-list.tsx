'use client'

import React, { useState, useMemo } from 'react'
import { useReactTable, getCoreRowModel, ColumnDef, flexRender } from '@tanstack/react-table'
import { Lease } from '@/payload-types'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog'
import { OrderCard } from './order-card'
import { Input } from '../ui/input'
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '../ui/table'

const OrderListTable = ({ leases }: { leases: Lease[] }) => {
  const [searchTerm, setSearchTerm] = useState('')

  const filteredLeases = useMemo(() => {
    return leases.filter((lease) => {
      if (typeof lease.car !== 'number') {
        const carInfo = `${lease.car.make} ${lease.car.model} ${lease.car.year}`.toLowerCase()
        return carInfo.includes(searchTerm.toLowerCase())
      }
      return false
    })
  }, [leases, searchTerm])

  const columns: ColumnDef<Lease>[] = [
    {
      accessorKey: 'id',
      header: 'Order #',
      cell: ({ row }) => `#${row.original.id}`,
    },
    {
      accessorKey: 'totalAmount',
      header: 'Amount',
      cell: ({ row }) =>
        new Intl.NumberFormat('en-KE', {
          style: 'currency',
          currency: 'KES',
        }).format(row.original.totalAmount),
    },
    {
      accessorKey: 'car',
      header: 'Car',
      cell: ({ row }) => {
        const lease = row.original
        return typeof lease.car !== 'number' ? (
          <div className="flex items-center">
            {lease.car.make} {lease.car.model} ({lease.car.year})
          </div>
        ) : (
          'N/A'
        )
      },
    },
    {
      accessorKey: 'createdAt',
      header: 'Created At',
      cell: ({ row }) => `${new Date(row.original.createdAt).toLocaleDateString()}`,
    },
  ]

  const table = useReactTable({
    data: filteredLeases,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <div>
      <div className="mb-4">
        <Input
          type="text"
          placeholder="Search by car..."
          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length > 0 ? (
            table.getRowModel().rows.map((row) => (
              <Dialog key={row.id}>
                <DialogTrigger asChild>
                  <TableRow className="cursor-pointer">
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Lease Details</DialogTitle>
                  </DialogHeader>
                  <OrderCard lease={row.original} />
                </DialogContent>
              </Dialog>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}

export default OrderListTable
