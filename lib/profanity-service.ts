import { db } from "./db";

export const getFiltersByUserId = async( id: string) => {
    const userFilters = await db.user.findUnique({
        where: {
            id: id,
        },
        include: {
            filters: {
                select: {
                    filter: {
                        select: {
                            id: true,   
                            label: true,
                            value: true,
                        },
                    },
                },
            },
            },
        });
        const userFilterValues = userFilters?.filters.map((userFilter) => ({
            label: userFilter.filter.label,
            value: userFilter.filter.value,
            id: userFilter.filter.id       
        }));
    return userFilterValues;
}

export const getEveryFilter = async () =>{
    const everyFilter = await db.aIFilter.findMany({
        select: {
          id: true,   
          label: true,
          value: true,
          createdAt: true,
          updatedAt: true
        },
      });
    console.log(everyFilter);
    return everyFilter;
}