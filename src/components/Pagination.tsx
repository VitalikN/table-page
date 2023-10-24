import { PaginationProps } from "../types/types";
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";
import styles from "../sass/layouts/pagination.module.scss";

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const numPagesToShowOnEachSide = 1;
  const startPage = Math.max(1, currentPage - numPagesToShowOnEachSide);
  const endPage = Math.min(totalPages, currentPage + numPagesToShowOnEachSide);

  return (
    <div className={styles.pagination}>
      {currentPage > 1 && (
        <MdArrowBackIos
          className={styles.pagination__arr}
          onClick={() => onPageChange(currentPage - 1)}
        />
      )}

      {startPage > 1 && (
        <>
          <button
            className={styles.pagination__btn}
            onClick={() => onPageChange(1)}
          >
            1
          </button>
          <span>...</span>
        </>
      )}

      {Array.from(
        { length: endPage - startPage + 1 },
        (_, idx) => idx + startPage
      ).map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={` ${styles.pagination__btn}  ${
            currentPage === page ? styles.active : ""
          }`}
        >
          {page}
        </button>
      ))}

      {/* Кнопка для останньої сторінки */}
      {endPage < totalPages && (
        <>
          <span>...</span>
          <button
            className={styles.pagination__btn}
            onClick={() => onPageChange(totalPages)}
          >
            {totalPages}
          </button>
        </>
      )}

      {currentPage < totalPages && (
        <MdArrowForwardIos
          className={styles.pagination__arr}
          onClick={() => onPageChange(currentPage + 1)}
        />
      )}
    </div>
  );
};

export default Pagination;
