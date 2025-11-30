import React from 'react';
import { Pagination } from 'react-bootstrap';

interface BootstrapPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  showFirstLast?: boolean;
  showPrevNext?: boolean;
  maxButtons?: number;
  className?: string;
}

const BootstrapPaginationComponent: React.FC<BootstrapPaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  showFirstLast = true,
  showPrevNext = true,
  maxButtons = 5,
  className = ''
}) => {
  const items = [];

  // Calculate start and end page numbers
  let startPage = Math.max(1, currentPage - Math.floor(maxButtons / 2));
  let endPage = Math.min(totalPages, startPage + maxButtons - 1);
  
  if (endPage - startPage + 1 < maxButtons) {
    startPage = Math.max(1, endPage - maxButtons + 1);
  }

  // First page button
  if (showFirstLast && currentPage > 1) {
    items.push(
      <Pagination.First key="first" onClick={() => onPageChange(1)} />
    );
  }

  // Previous page button
  if (showPrevNext && currentPage > 1) {
    items.push(
      <Pagination.Prev key="prev" onClick={() => onPageChange(currentPage - 1)} />
    );
  }

  // Page numbers
  for (let number = startPage; number <= endPage; number++) {
    items.push(
      <Pagination.Item 
        key={number} 
        active={number === currentPage}
        onClick={() => onPageChange(number)}
      >
        {number}
      </Pagination.Item>
    );
  }

  // Next page button
  if (showPrevNext && currentPage < totalPages) {
    items.push(
      <Pagination.Next key="next" onClick={() => onPageChange(currentPage + 1)} />
    );
  }

  // Last page button
  if (showFirstLast && currentPage < totalPages) {
    items.push(
      <Pagination.Last key="last" onClick={() => onPageChange(totalPages)} />
    );
  }

  return (
    <div className={`d-flex justify-content-center ${className}`}>
      <Pagination>{items}</Pagination>
    </div>
  );
};

export default BootstrapPaginationComponent;
