import {
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useState } from 'react';
import { Category, Product } from '../../domain/entities';

type Params = {
  products?: Product[];
};

export const useProductFilters = ({ products }: Params) => {
  const [search, setSearch] = useState('');
  const [categorySelected, setCategorySelected] = useState<string>('');

  const handleSelectCategory = (category: Category) => {
    if (categorySelected === category.id) return setCategorySelected('');
    setCategorySelected(category.id);
  };

  const table = useReactTable({
    data: products ?? [],
    columns: [
      {
        accessorKey: 'title',
        header: 'Title',
      },
      {
        accessorKey: 'category',
        header: 'Category',
      },
    ],
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      globalFilter: search,
      columnFilters: [
        {
          id: 'category',
          value: categorySelected,
        },
      ],
    },
    onGlobalFilterChange: setSearch,
  });

  const rows = table.getRowModel().rows.map((row) => row.original);

  return {
    rows,
    search,
    setSearch,
    categorySelected,
    handleSelectCategory,
  };
};
