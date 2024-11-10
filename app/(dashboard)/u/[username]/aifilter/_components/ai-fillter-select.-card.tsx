"use client";

import * as z from 'zod';
import * as React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { toast } from 'sonner';
import { LoadingButton } from '@/components/ui/loading-button';
import MultipleSelector from '@/components/ui/multi-select-picker';
import { AIFilter } from '@prisma/client';
import { useState, useTransition } from 'react';

interface AIFilterSelectCardProps {
    everyFilter: AIFilter[]
    activeFilters: { label: string; value: string; id: string; }[] | undefined
    userId: string,
}

const optionSchema = z.object({
  label:    z.string(),
  value:    z.string(),
  id:       z.string(),
  disable:  z.boolean().optional(),
});
  
const FormSchema = z.object({
    frameworks: z.array(optionSchema).min(0),
});

export const AIFilterSelectCard = ({
    everyFilter,
    activeFilters,
    userId,
}: AIFilterSelectCardProps) => {
    const [isPending, startTransition] = useTransition();
    const [selectedFilters, setSelectedFilters] = useState<{ label: string; value: string; id: string }[] | undefined>(activeFilters);
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
    });
    
    const OPTIONS: { label: string; value: string, id: string }[] = everyFilter.map(filter => ({
        id:     filter.id,
        label: filter.label,
        value: filter.value,
    }));

    const SELECTEDOPTIONS: { label: string; value: string, id: string }[] | undefined = selectedFilters?.map(filter => ({
        label: filter.label,
        value: filter.value,
        id: filter.id
    }));

    const upsertUserFilters = async (
        userId: string,
        filterIds: {
            frameworks: {
                id: string 
            }[] }) => {
        try {
            const response = await fetch('/api/userFiltersUpsert', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userId, filterIds }),
            });
    
            if (!response.ok) {
                throw new Error(`Failed to upsert user filters: ${response.statusText}`);
            }
    
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error during API call:', error);
            throw error;
        }
    };

    function onSubmit(data: z.infer<typeof FormSchema>) {
        startTransition(() => {
            upsertUserFilters(userId, data)
            .then((res) => {
                toast.success(`Filter change was successfull`)
                setSelectedFilters(res.filters)
            })
            .catch(() => toast.error(`Filter change was unsuccessfull`))
        });
    }  

    return (
        <div className="rounded-xl bg-background p-6 border-2 border-primary">
            <div className="flex items-start gap-x-10">
                <div className="space-y-2 w-full">
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
                                <FormField control={form.control}
                                    name="frameworks"
                                    render={({ field }) => (
                                <FormItem>
                                    <p className="font-semibold shrink-0">Select the filters</p>
                                    <FormControl>
                                        <MultipleSelector
                                            {...field}
                                            defaultOptions={OPTIONS}
                                            value={SELECTEDOPTIONS}
                                            hidePlaceholderWhenSelected={true}
                                            placeholder="Select your filters..."
                                            emptyIndicator={
                                            <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
                                                no results found.
                                            </p>
                                        }/>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                                )}
                                />
                                <LoadingButton loading={isPending} type="submit"> Submit </LoadingButton>
                            </form>
                        </Form>
                </div>
            </div>
        </div>
      );
}
export const AIFilterSelectCardSkeleton = () => {

}