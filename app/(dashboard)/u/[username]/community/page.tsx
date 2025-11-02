import { getEveryBlockedUser } from "@/lib/block-service";
import { columns } from "./_components/columns";
import { DataTable } from "./_components/data-table";
import { format } from "date-fns";

const Community = async () => {
    const data = await getEveryBlockedUser();
    const tableData = data.map((blockedUser) => ({
        ...blockedUser,
        userId: blockedUser.blocked.id,
        image: blockedUser.blocked.image,
        username: blockedUser.blocked.username,
        createdAt: format(new Date(blockedUser.blocked.createdAt), "yyyy/MM/dd ")
    }))
    return ( 
        <div className="p-6">
            <div className="mb-4">
                <h1 className="text-2xl font-bold">
                   Community Settings 
                </h1>
            </div>
            <DataTable 
                columns={columns}
                data={tableData} />
        </div>
    );
}

export default Community;