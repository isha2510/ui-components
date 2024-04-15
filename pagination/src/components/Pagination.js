import './pagination.css';
const Pagination = ({ totalPage, handleCurrentPageData, currentPage }) => {
    const pages = Array.from({ length: totalPage }, (_, index) => index + 1);
    const handlePagination = (e) => {
        if (e.target.name === 'back' && currentPage !== 1) {
            handleCurrentPageData(currentPage - 1)
        }
        else if (e.target.name === 'forward' && currentPage < totalPage) {
            handleCurrentPageData(currentPage + 1);
        }
    }
    return (
        <div className="pagination">
            <button onClick={handlePagination} name='back'>◀</button>
            {/* <span>{`| Page ${currentPage} of ${totalPage} |`}</span> */}
            {pages.map((page) => {
               return <button className='pagenumber' key={page} onClick={()=>handleCurrentPageData(page)} disabled={page === currentPage}>{page}</button>
            })}

            <button onClick={handlePagination} name='forward'>▶</button>
        </div>
    )
}

export default Pagination;