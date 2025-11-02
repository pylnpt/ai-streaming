"use client"

import { Button } from "@/components/ui/button"
import { UserAvatar } from "@/components/user-avatar"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"
import { UnblockButton } from "./unblock-button"
import { BlockedUserType } from "@/lib/types"

export const columns: ColumnDef<BlockedUserType>[] = [
  {
    accessorKey: "username",
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
        Username
        <ArrowUpDown className="ml-2 h-4 w-4"/>
      </Button>
    ),
    cell: ({ row }) => (
      <div className="flex items-center gap-x-4">
          <UserAvatar 
            username={row.original.username}
            image={row.original.image}/>
            <span>{row.original.username}</span>
      </div>
    )
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
        Date of block
        <ArrowUpDown className="ml-2 h-4 w-4"/>
      </Button>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => <UnblockButton userId={row.original.userId}></UnblockButton>,
  },
]
