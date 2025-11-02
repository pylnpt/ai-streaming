import { getSelf } from "@/lib/authservice";
import { getFilteredMessagesByUserId } from "@/lib/filtered-messages-service";
import { FilteredMessagesTable } from "./_components/filtered-messages-table";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const FilteredMessagesLog = async () => {
  const self = await getSelf();
  const messages = await getFilteredMessagesByUserId(self.id, 100);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex items-center gap-4 mb-6">
        <Link href={`/u/${self.username}/aifilter`}>
          <Button variant="ghost" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Settings
          </Button>
        </Link>
      </div>

      <div className="mb-6">
        <h1 className="text-2xl font-bold">Filtered Messages Log</h1>
        <p className="text-sm text-muted-foreground mt-2">
          View all messages that have been filtered by the content filter
        </p>
      </div>

      <FilteredMessagesTable messages={messages} userId={self.id} />
    </div>
  );
};

export default FilteredMessagesLog;
