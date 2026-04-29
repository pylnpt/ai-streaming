"use client";

import { useTransition } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { RotateCcw, CheckCircle } from "lucide-react";
import { toast } from "sonner";
import { restoreFilteredMessage } from "@/lib/filtered-messages-service";
import { useRouter } from "next/navigation";
import { Decimal } from "@prisma/client/runtime/library";

interface FilteredMessage {
  id: string;
  senderUsername: string | null;
  message: string;
  filteredCategory: string;
  confidence: Decimal;
  wasRestored: boolean;
  createdAt: Date;
}

interface FilteredMessagesTableProps {
  messages: FilteredMessage[];
  userId: string;
}

export const FilteredMessagesTable = ({
  messages,
  userId,
}: FilteredMessagesTableProps) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleRestore = (messageId: string) => {
    startTransition(async () => {
      try {
        await restoreFilteredMessage(messageId, userId);
        toast.success("Message marked as false positive");
        router.refresh();
      } catch {
        toast.error("Failed to restore message");
      }
    });
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      toxicity: "bg-red-500",
      severe_toxicity: "bg-red-700",
      identity_attack: "bg-orange-500",
      insult: "bg-yellow-500",
      threat: "bg-purple-500",
      obscene: "bg-pink-500",
      sexual_explicit: "bg-pink-700",
    };
    return colors[category] || "bg-gray-500";
  };

  if (messages.length === 0) {
    return (
      <div className="text-center py-12 border-2 border-dashed rounded-lg">
        <p className="text-muted-foreground">No filtered messages yet</p>
        <p className="text-sm text-muted-foreground mt-2">
          Messages filtered by the content filter will appear here
        </p>
      </div>
    );
  }

  return (
    <div className="border rounded-lg">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>User</TableHead>
            <TableHead>Message</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Confidence</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {messages.map((msg) => (
            <TableRow key={msg.id}>
              <TableCell className="text-sm text-muted-foreground">
                {formatDate(msg.createdAt)}
              </TableCell>
              <TableCell className="font-medium">
                {msg.senderUsername || "Unknown"}
              </TableCell>
              <TableCell className="max-w-xs truncate">{msg.message}</TableCell>
              <TableCell>
                <Badge
                  className={`${getCategoryColor(msg.filteredCategory)} text-white`}
                >
                  {msg.filteredCategory}
                </Badge>
              </TableCell>
              <TableCell>
                {(Number(msg.confidence) * 100).toFixed(1)}%
              </TableCell>
              <TableCell>
                {msg.wasRestored ? (
                  <div className="flex items-center gap-1 text-green-500 text-sm">
                    <CheckCircle className="h-4 w-4" />
                    Restored
                  </div>
                ) : (
                  <span className="text-sm text-muted-foreground">Filtered</span>
                )}
              </TableCell>
              <TableCell className="text-right">
                {!msg.wasRestored && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRestore(msg.id)}
                    disabled={isPending}
                  >
                    <RotateCcw className="h-4 w-4 mr-2" />
                    Restore
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
