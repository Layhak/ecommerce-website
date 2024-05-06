'use client';
import React, { useEffect, useMemo, useState } from 'react';
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
  Pagination,
  Select,
  Selection,
  SelectItem,
  SortDescriptor,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tooltip,
  useDisclosure,
} from '@nextui-org/react';
import {
  ChevronDownIcon,
  DeleteIcon,
  EditIcon,
  EyeIcon,
  PlusIcon,
  SearchIcon,
} from '@/components/icons';
import { columns } from './data';
import { capitalize } from './utils';
import {
  useDeleteProductMutation,
  useGetMyProductsQuery,
  useUpdateProductMutation,
} from '@/redux/service/product';
import { Image } from '@nextui-org/image';
import { renderItem } from '@/components/rendering/pagination';
import DeleteModalComponent from '@/components/modal/DeleteModal';
import CreateModalComponent from '@/components/modal/CreateModal';
import Aos from 'aos';
import 'aos/dist/aos.css';
import UpdateModalComponent from '@/components/modal/UpdateModal';
import { Link } from '@nextui-org/link';
import NextLink from 'next/link';

const INITIAL_VISIBLE_COLUMNS = [
  'id',
  'name',
  'price',
  'category',
  'actions',
  'image',
];

export default function App() {
  const DeleteModal = useDisclosure();
  const EditModal = useDisclosure();
  const CreateModal = useDisclosure();
  const [id, setId] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const handleEditClick = (id: number, modal: any) => {
    setId(id);
    setIsOpen(modal);
  };

  // Use the getMyProducts query
  const {
    data: products = [],
    error,
    isLoading,
  } = useGetMyProductsQuery({ page: 1, pageSize: 20 });
  const [deleteProduct] = useDeleteProductMutation();
  const updateProduct = useUpdateProductMutation();

  const [filterValue, setFilterValue] = useState('');
  const [filterType, setFilterType] = useState('name');
  const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set([]));
  const [visibleColumns, setVisibleColumns] = useState<Selection>(
    new Set(INITIAL_VISIBLE_COLUMNS)
  );
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: 'price',
    direction: 'ascending',
  });

  const [page, setPage] = useState(1);

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = useMemo(() => {
    if (visibleColumns === 'all') return columns;

    return columns.filter((column) =>
      Array.from(visibleColumns).includes(column.uid)
    );
  }, [visibleColumns]);

  const filteredItems = useMemo(() => {
    let filterProducts = [...products];

    if (hasSearchFilter) {
      filterProducts = filterProducts.filter((product) =>
        filterType === 'name'
          ? product.name.toLowerCase().includes(filterValue.toLowerCase())
          : product.price.toString().includes(filterValue)
      );
    }

    return filterProducts;
  }, [products, filterValue, filterType]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = useMemo(() => {
    return [...items].sort((a, b) => {
      const first = a[sortDescriptor.column as keyof (typeof products)[0]];
      const second = b[sortDescriptor.column as keyof (typeof products)[0]];
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === 'descending' ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  const renderCell = React.useCallback((product: any, columnKey: React.Key) => {
    const cellValue = product[columnKey as keyof (typeof products)[0]];

    switch (columnKey) {
      case 'name':
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">{cellValue}</p>
          </div>
        );
      case 'price':
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">$ {cellValue}</p>
          </div>
        );
      case 'image':
        return (
          <Image
            src={product.image}
            alt={product.name}
            className="h-10 w-10 rounded-md object-cover"
          />
        );
      case 'actions':
        return (
          <div className="relative flex items-center gap-2">
            <Tooltip color={'primary'} content="Details">
              <NextLink href={`/product/${product.id}`}>
                <Button isIconOnly variant={'light'} color={'primary'}>
                  <EyeIcon />
                </Button>
              </NextLink>
            </Tooltip>
            <Tooltip color={'warning'} content="Edit user">
              <span className="cursor-pointer text-lg text-warning active:opacity-50">
                <Button
                  isIconOnly
                  onPress={() => handleEditClick(product.id, EditModal.onOpen)}
                  variant={'light'}
                  color={'warning'}
                >
                  <EditIcon />
                </Button>
              </span>
            </Tooltip>

            <Tooltip color="danger" content="Delete user">
              <span className="cursor-pointer text-lg text-danger active:opacity-50">
                <Button
                  isIconOnly
                  onPress={() =>
                    handleEditClick(product.id, DeleteModal.onOpen)
                  }
                  variant={'light'}
                  color={'danger'}
                >
                  <DeleteIcon />
                </Button>
              </span>
            </Tooltip>
          </div>
        );

      default:
        return cellValue;
    }
  }, []);

  const onNextPage = React.useCallback(() => {
    if (page < pages) {
      setPage(page + 1);
    }
  }, [page, pages]);

  const onPreviousPage = React.useCallback(() => {
    if (page > 1) {
      setPage(page - 1);
    }
  }, [page]);

  const onRowsPerPageChange = React.useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setRowsPerPage(Number(e.target.value));
      setPage(1);
    },
    []
  );

  const onSearchChange = React.useCallback((value?: string) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue('');
    }
  }, []);

  const onClear = React.useCallback(() => {
    setFilterValue('');
    setPage(1);
  }, []);

  const onFilterTypeChange = React.useCallback((key: Selection) => {
    const selectedKey = Array.from(key)[0];
    setFilterType(selectedKey as string);
  }, []);

  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);

  const topContent = React.useMemo(() => {
    return (
      <div className="flex flex-col gap-4" data-aos="fade-upjk">
        <div className="flex items-end justify-between gap-3">
          <Input
            isClearable
            className="w-full sm:max-w-[44%]"
            placeholder={`Search by ${filterType}...`}
            startContent={<SearchIcon />}
            value={filterValue}
            onClear={() => onClear()}
            onValueChange={onSearchChange}
          />

          <div className="flex gap-3">
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button
                  endContent={<ChevronDownIcon className="text-small" />}
                  variant="flat"
                >
                  Columns
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={visibleColumns}
                selectionMode="multiple"
                onSelectionChange={setVisibleColumns}
              >
                {columns.map((column) => (
                  <DropdownItem key={column.uid} className="capitalize">
                    {capitalize(column.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <Button
              color="success"
              onPress={CreateModal.onOpen}
              endContent={<PlusIcon />}
            >
              Add New Product
            </Button>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <Select
            size={'sm'}
            onSelectionChange={onFilterTypeChange}
            label="Filter by"
            placeholder="Select"
            className="max-w-xs text-xs"
            // selectedKeys={new Set([filterType])}
          >
            <SelectItem key="name" className={'text-xs'}>
              Name
            </SelectItem>
            <SelectItem key="price" className={'text-xs'}>
              Price
            </SelectItem>
          </Select>
          <Select
            size={'sm'}
            onChange={onRowsPerPageChange}
            label="Row per page"
            placeholder="The total is 5 by defaults"
            className="max-w-xs"
          >
            <SelectItem key={5} value={5}>
              5
            </SelectItem>
            <SelectItem key={10} value={10}>
              10
            </SelectItem>
            <SelectItem key={15} value={15}>
              15
            </SelectItem>
          </Select>
        </div>
      </div>
    );
  }, [
    filterValue,
    filterType,
    visibleColumns,
    onSearchChange,
    onRowsPerPageChange,
    onFilterTypeChange,
    products.length,
    hasSearchFilter,
  ]);

  const bottomContent = React.useMemo(() => {
    return (
      <div
        className="flex items-center justify-between px-2 py-2"
        data-aos="fade-up"
      >
        <span className=" w-[30%] text-small text-default-400">
          Total {products.length} users
        </span>

        <Pagination
          radius={'full'}
          variant="light"
          disableCursorAnimation
          showShadow
          loop
          showControls
          className={'gap-2'}
          renderItem={renderItem}
          page={page}
          total={pages}
          onChange={setPage}
        />
        <div className="hidden w-[30%] justify-end gap-2 sm:flex">
          <Button
            isDisabled={pages === 1}
            size="sm"
            variant="flat"
            onPress={onPreviousPage}
          >
            Previous
          </Button>
          <Button
            isDisabled={pages === 1}
            size="sm"
            variant="flat"
            onPress={onNextPage}
          >
            Next
          </Button>
        </div>
      </div>
    );
  }, [selectedKeys, items.length, page, pages, hasSearchFilter]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error loading products</p>;
  }

  return (
    <>
      <Table
        aria-label="Example table with custom cells, pagination and sorting"
        isHeaderSticky
        bottomContent={bottomContent}
        bottomContentPlacement="outside"
        classNames={{
          wrapper: 'max-h-[382px] min-h-[382px]',
        }}
        sortDescriptor={sortDescriptor}
        topContent={topContent}
        topContentPlacement="outside"
        onSelectionChange={setSelectedKeys}
        onSortChange={setSortDescriptor}
        data-aos="fade-up"
      >
        <TableHeader columns={headerColumns}>
          {(column) => (
            <TableColumn
              key={column.uid}
              align={column.uid === 'actions' ? 'center' : 'start'}
              allowsSorting={column.sortable}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody emptyContent={'No products found'} items={sortedItems}>
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
      <DeleteModalComponent
        isOpen={DeleteModal.isOpen}
        id={id}
        onOpenChange={DeleteModal.onOpenChange}
        onClose={DeleteModal.onClose}
      />
      <CreateModalComponent
        isOpen={CreateModal.isOpen}
        onOpenChange={CreateModal.onOpenChange}
        onClose={CreateModal.onClose}
      />
      <UpdateModalComponent
        isOpen={EditModal.isOpen}
        onClose={EditModal.onClose}
        onOpenChange={EditModal.onOpenChange}
        id={id}
      />
    </>
  );
}
