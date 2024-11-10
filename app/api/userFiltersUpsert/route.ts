import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { getSelf } from '@/lib/authservice';

export async function POST(req: Request) {
    const { userId, filterIds } = await req.json(); // Parse the request body
    const self = await getSelf();

    if (userId !== self.id) {
        return NextResponse.json({ error: 'Unauthorized User!' }, { status: 400 });
    }

    if (!userId || !filterIds) {
        return NextResponse.json({ error: 'Missing userId or filterIds in request body' }, { status: 400 });
    }

    try {
        // Step 1: Fetch the current filters of the user
        const existingFilters = await db.userFilters.findMany({
            where: { userId },
            select: {
                filterId: true, // Get the filterId from the userFilters table
            },
        });

        const existingFilterIds = existingFilters.map(f => f.filterId); // Extract the filterIds of the current user filters

        // Step 2: Identify the filters to add and remove
        const filtersToAdd = filterIds.frameworks.filter(
            (framework: { id: string }) => !existingFilterIds.includes(framework.id)
        );

        const filtersToRemove = existingFilters.filter(
            (existingFilter) => !filterIds.frameworks.some((framework: { id: string }) => framework.id === existingFilter.filterId)
        );

        // Step 3: Validate filters to add
        const validFiltersToAdd = await Promise.all(
            filtersToAdd.map(async (framework: { id: string }) => {
                const filterExists = await db.aIFilter.findUnique({
                    where: { id: framework.id },
                });
                return filterExists ? framework : null; // Return valid filter or null if not found
            })
        );

        const validFilters = validFiltersToAdd.filter(Boolean);

        // Step 4: Perform add and remove operations
        const addPromises = validFilters.map((framework: { id: string }) =>
            db.userFilters.create({
                data: {
                    userId,
                    filterId: framework.id,
                },
            })
        );

        const removePromises = filtersToRemove.map((filter) =>
            db.userFilters.delete({
                where: {
                    userId_filterId: {
                        userId,
                        filterId: filter.filterId,
                    },
                },
            })
        );

        await Promise.all([...addPromises, ...removePromises]);
        revalidatePath(`/u/${self.username}/aifilter`);

        // Step 5: Fetch the updated filters for the user
        const updatedFilters = await db.userFilters.findMany({
            where: { userId },
            select: {
                filter: { // Retrieve label and value for each filter
                    select: {
                        label: true,
                        value: true,
                        id: true,
                    },
                },
            },
        });

        // Format the updated filters as an array of { label, value, id }
        const formattedFilters = updatedFilters.map((userFilter) => ({
            label: userFilter.filter.label,
            value: userFilter.filter.value,
            id: userFilter.filter.id,
        }));

        return NextResponse.json({ message: 'Upsert operation successful', filters: formattedFilters }, { status: 200 });
    } catch (err) {
        console.error('Error during bulk upsert operation:', err);
        return NextResponse.json({ error: 'An error occurred during upsert operation' }, { status: 500 });
    }
}
