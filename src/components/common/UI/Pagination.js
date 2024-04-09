

export const DOTS = "...";

export range = (start, end)=>{
    let length = end - start +1
    return Array.from({length},(_,idx)=>idx+start);
}

export const usePagination = ({
    currentPage,
    totalRows,
    siblingCount,
    rowsPerPage
})=>{
    const paginationRange = useMemo(()=>{
        const totalPageCount = Math.ceil(totalRows/rowsPerPage);

        const totalPageNumbers = siblingCount +5;

        if(totalPageNumbers >= totalPageCount){
            return range(1,totalPageCount);
        }
        const leftSiblingIndex = Math.max(currentPage - siblingCount,1);
        const rightSilblingIndex = Math.min(currentPage +siblingCount, totalPageCount)

        const shouldShowLeftDots = leftSiblingIndex>2;
        const shouldShowRightDots = rightSilblingIndex < totalPageCount - 2;

        const firstPageIndex =1
        const lastPageIndex = totalPageCount

        if(!shouldShowLeftDots && shouldShowRightDots){
            let leftItemCount = 3 +2*siblingCount;
            let leftRange = range(1,leftItemCount);

            return [...leftRange,DOTS,totalPageCount]
        }

        if(shouldShowLeftDots && !shouldShowRightDots){
            let rightItemCount = 3+2*siblingCount
            let rightRange = range(totalPageCount - rightItemCount +1, totalPageCount)
            return [firstPageIndex,DOTS,...rightRange];
        }

        if(shouldShowLeftDots && shouldShowRightDots){
            let middleRange = range(leftSiblingIndex, rightSilblingIndex)
            return [firstPageIndex,DOTS,...middleRange,DOTS,lastPageIndex]
        }
    },[totalRows, rowsPerPage,siblingCount,currentPage])
    
    return paginationRange
}