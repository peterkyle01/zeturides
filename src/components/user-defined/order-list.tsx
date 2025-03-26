'use client'

import React, { useState, useMemo } from 'react'
import { Lease } from '@/payload-types'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog'
import { OrderCard } from './order-card'
import { Input } from '../ui/input'
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '../ui/table'

const colors = {
  pending: 'bg-yellow-500/10 text-yellow-500 font-bold',
  paid: 'bg-green-500/10 text-green-500 font-bold',
  refunded: 'bg-blue-500/10 text-blue-500 font-bold',
  cancelled: 'bg-rose-500/10 text-rose-500 font-bold',
}

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
          <TableRow>
            <TableHead>Order #</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Car</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Created At</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredLeases.length > 0 ? (
            filteredLeases.map((lease) => (
              <Dialog key={lease.id}>
                <DialogTrigger asChild>
                  <TableRow className="cursor-pointer h-16">
                    <TableCell>#{lease.id}</TableCell>
                    <TableCell>
                      {new Intl.NumberFormat('en-KE', {
                        style: 'currency',
                        currency: 'KES',
                      }).format(lease.totalAmount)}
                    </TableCell>
                    <TableCell>
                      {typeof lease.car !== 'number'
                        ? `${lease.car.make} ${lease.car.model} (${lease.car.year})`
                        : 'N/A'}
                    </TableCell>
                    <TableCell>
                      <span
                        className={`px-2 py-1 capitalize rounded ${colors[lease.paymentStatus] || 'bg-gray-500/10 text-gray-500 font-bold'}`}
                      >
                        {lease.paymentStatus || 'Pending'}
                      </span>
                    </TableCell>
                    <TableCell>{new Date(lease.createdAt).toLocaleDateString()}</TableCell>
                  </TableRow>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Lease Details</DialogTitle>
                  </DialogHeader>
                  <OrderCard lease={lease} />
                </DialogContent>
              </Dialog>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} className="h-24 text-center">
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
