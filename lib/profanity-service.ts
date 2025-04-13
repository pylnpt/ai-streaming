"use server";

import { db } from "./db";
import { revalidatePath } from "next/cache";
import { User } from "@prisma/client";
import { Filter } from "./types";

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

export const getFilterValuesByUserId = async( id: string) => {
  const userFilters = await db.user.findUnique({
      where: {
          id: id,
      },
      include: {
          filters: {
              select: {
                  filter: {
                      select: {   
                          value: true,
                      },
                  },
              },
          },
          },
      });
      const userFilterValues = userFilters?.filters.map((userFilter) => userFilter.filter.value) || [];

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
    return everyFilter;
}

export const getThresholdByUserId = async (id: string) => {
    // Fetch the user + their selected threshold
    const userThreshold = await db.user.findUnique({
      where: { id },
      select: {
        aiThreshold: {
          select: {
            id: true,
            label: true,
            value: true,
            description: true,
            createdAt: true,
            updatedAt: true,
          },
        },
      },
    });
  
    // If user has a threshold, return it
    if (userThreshold?.aiThreshold) {
      return userThreshold.aiThreshold;
    }
  
    // Otherwise, fallback to the first available threshold
    const fallbackThreshold = await db.aIThreshold.findFirst({
      orderBy: { value: "asc" }, // you can change this to anything else
      select: {
        id: true,
        label: true,
        value: true,
        description: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  
    return fallbackThreshold;
  };
  

export const getEveryThreshold = async () => {
    const thresholds = await db.aIThreshold.findMany({
        select: {
          id: true,   
          label: true,
          value: true,
          createdAt: true,
          updatedAt: true,
          description: true
        },
      });
    console.log(thresholds);
    return thresholds;
}

export const updateProfanityStatus = async (user: User , value: boolean) => {
  try {
        await updateAiStatus(user.id, value);
        revalidatePath(`/u/${user.username}`);
        revalidatePath(`/${user.username}`);
  } catch(err) {
    console.log(err)
      throw new Error("Internal Error");
  }
}

export const updateAiStatus = async (userId: string, value: boolean) => {
  const res = await db.user.update({
      where: {
          id: userId
      },
      data: {
          isUsingProfanityFilter: value
      }
  });
  return res;
}


export const updateProfanityFilters = async (
  user: User,
  filterIds: {
    frameworks: {
        id: string 
    }[] }) => {

    if (!user.id || !filterIds) {
      throw new Error('Missing userId or filterIds in request body');
    }

    try {
        // Step 1: Fetch the current filters of the user
        const existingFilters = await db.userFilters.findMany({
            where: { userId :user.id },
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
        if (validFilters === null)
        {
          throw new Error("The filters can't be null");
        }

        // Step 4: Perform add and remove operations
        const addPromises = validFilters.map((framework: { id: string } | null) =>
            db.userFilters.create({
                data: {
                    userId: user.id,
                    filterId: framework!.id,
                },
            })
        );

        const removePromises = filtersToRemove.map((filter) =>
            db.userFilters.delete({
                where: {
                    userId_filterId: {
                        userId: user.id,
                        filterId: filter.filterId,
                    },
                },
            })
        );

        await Promise.all([...addPromises, ...removePromises]);

        // Step 5: Fetch the updated filters for the user
        const updatedFilters = await db.userFilters.findMany({
            where: { userId: user.id },
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
        const formattedFilters:Filter[] = updatedFilters.map((userFilter) => ({
            label: userFilter.filter.label,
            value: userFilter.filter.value,
            id: userFilter.filter.id,
        }));
        revalidatePath(`/u`);
        revalidatePath(`/u/${user.username}`);
        revalidatePath(`/u/${user.username}/aifilter`);

        // return NextResponse.json({filters: formattedFilters }, { status: 200 });
        return formattedFilters;
    } catch (err) {
        console.error('Error during bulk upsert operation:', err);
        throw new Error("Error during bulk upsert operation");
    }
}

export const updateUserThreshold = async (userId :string, thresholdValue: string) =>{
  try {
    if (!userId || !thresholdValue) {
      throw new Error("Missing userId or thresholdValue");
    }

    // Validate the threshold exists
    const threshold = await db.aIThreshold.findUnique({
        where: { value: parseFloat(thresholdValue) },
    });

    if (!threshold) {
        throw new Error('Threshold not found');
    }

    // Update user's aiThresholdId
    await db.user.update({
        where: { id: userId },
        data: { aiThresholdId: threshold.id },
    });

    return "Threshold updated successfully"
  } catch (error) {
    console.error('Error updating threshold:', error);
    throw new Error('Internal server error');
  }
}