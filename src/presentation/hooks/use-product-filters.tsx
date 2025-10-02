import {
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useMemo, useState } from 'react';
import { Category, Product } from '../../domain/entities';

type Params = {
  products: Product[];
};

type SortingFilters = 'price' | 'rating';

export const useProductFilters = ({ products }: Params) => {
  const [search, setSearch] = useState('');
  const [categorySelected, setCategorySelected] = useState<string>('');

  const [sortingFilters, setSortingFilters] = useState({
    price: '',
    rating: '',
  });

  const columns = useMemo(
    () => [
      {
        accessorKey: 'title',
        header: 'Title',
        enableSorting: false,
      },
      {
        accessorKey: 'category',
        header: 'Category',
        enableSorting: false,
      },
      {
        accessorKey: 'price',
        header: 'Price',
        enableGlobalFilter: false,
        enableSorting: sortingFilters.price === 'price',
      },
      {
        accessorKey: 'rating',
        header: 'Rating',
        enableGlobalFilter: false,
        enableSorting: sortingFilters.rating === 'rating',
      },
    ],
    [sortingFilters.price, sortingFilters.rating],
  );

  const columnFilters = useMemo(
    () => [
      {
        id: 'category',
        value: categorySelected,
      },
    ],
    [categorySelected],
  );

  const sorting = useMemo(
    () => [
      {
        id: 'price',
        desc: false,
      },
      {
        id: 'rating',
        desc: true,
      },
    ],
    [sortingFilters.price, sortingFilters.rating],
  );

  const handleSelectCategory = (category: Category) => {
    if (categorySelected === category.id) return setCategorySelected('');
    setCategorySelected(category.id);
  };

  const handleSelectSortingFilter = (key: SortingFilters) => {
    if (sortingFilters.price === key)
      return setSortingFilters({ ...sortingFilters, price: '' });
    if (sortingFilters.rating === key)
      return setSortingFilters({ ...sortingFilters, rating: '' });

    setSortingFilters({ ...sortingFilters, [key]: key });
  };

  const table = useReactTable({
    data: products,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: {
      globalFilter: search,
      columnFilters,
      sorting,
    },
    onGlobalFilterChange: setSearch,
  });

  const rows = table.getRowModel().rows.map((row) => row.original);

  return {
    rows,
    search,
    setSearch,
    categorySelected,
    sortingFilters,
    handleSelectCategory,
    handleSelectSortingFilter,
  };
};
