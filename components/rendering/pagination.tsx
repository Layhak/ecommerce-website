import {
  cn,
  PaginationItemRenderProps,
  PaginationItemType,
} from '@nextui-org/react';
import { Button } from '@nextui-org/button';
import { ChevronIcon } from '@/components/icons';
import React from 'react';

export const renderItem = ({
  ref,
  key,
  value,
  isActive,
  onNext,
  onPrevious,
  setPage,
  className,
}: PaginationItemRenderProps) => {
  if (value === PaginationItemType.NEXT) {
    return (
      <Button
        key={key}
        className={cn(className, 'h-8 w-8 min-w-8 bg-default-200/50')}
        onClick={onNext}
        isIconOnly
      >
        <ChevronIcon className="rotate-180" />
      </Button>
    );
  }

  if (value === PaginationItemType.PREV) {
    return (
      <Button
        variant={'shadow'}
        key={key}
        className={cn(className, 'h-8 w-8 min-w-8 bg-default-200/50')}
        onClick={onPrevious}
        isIconOnly
      >
        <ChevronIcon />
      </Button>
    );
  }

  if (value === PaginationItemType.DOTS) {
    return (
      <button key={key} className={className}>
        ...
      </button>
    );
  }

  // cursor is the default item
  return (
    <button
      ref={ref}
      key={key}
      className={cn(
        className,
        isActive &&
          'bg-gradient-to-tr  from-orange-700 to-warning font-bold text-white'
      )}
      onClick={() => setPage(value)}
    >
      {value}
    </button>
  );
};
