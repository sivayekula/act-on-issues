import React, { useState } from 'react';
import Pagination from 'react-bootstrap/Pagination';

const PaginationComponent = ({ totalItems, itemsPerPage, onPageChange }) => {
  const [activePage, setActivePage] = useState(1);
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageChange = (page) => {
    setActivePage(page);
    onPageChange(page);
  };

  const items = [];
  for (let page = 1; page <= totalPages; page++) {
    items.push(
      <Pagination.Item key={page} active={page === activePage} onClick={() => handlePageChange(page)}>
        {page}
      </Pagination.Item>
    );
  }

  return (
    <Pagination>
      <Pagination.Prev onClick={() => handlePageChange(activePage - 1)} disabled={activePage === 1} />
      {items}
      <Pagination.Next onClick={() => handlePageChange(activePage + 1)} disabled={activePage === totalPages} />
    </Pagination>
  );
};

export default PaginationComponent;
