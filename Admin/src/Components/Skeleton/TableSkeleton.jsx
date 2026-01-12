import React from 'react';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Skeleton from '@mui/material/Skeleton';

const TableSkeleton = ({ rowsPerPage = 10 }) => {
    return (
        <>
            {[...Array(rowsPerPage)].map((_, index) => (
                <TableRow key={index}>
                    <TableCell>
                        <Skeleton variant="rectangular" width={20} height={20} />
                    </TableCell>
                    <TableCell>
                        <div className='flex items-center gap-4 w-[300px]'>
                            <Skeleton variant="rectangular" width={65} height={65} sx={{ borderRadius: '6px' }} />
                            <div className='w-[75%]'>
                                <Skeleton variant="text" width="80%" height={20} />
                                <Skeleton variant="text" width="40%" height={16} />
                            </div>
                        </div>
                    </TableCell>
                    <TableCell>
                        <Skeleton variant="text" width={80} height={20} />
                    </TableCell>
                    <TableCell>
                        <Skeleton variant="text" width={80} height={20} />
                    </TableCell>
                    <TableCell>
                        <div className='flex gap-1 flex-col'>
                            <Skeleton variant="text" width={60} height={16} />
                            <Skeleton variant="text" width={60} height={20} />
                        </div>
                    </TableCell>
                    <TableCell>
                        <Skeleton variant="text" width={80} height={20} />
                    </TableCell>
                    <TableCell>
                        <div className='flex items-center gap-1'>
                            <Skeleton variant="circular" width={35} height={35} />
                            <Skeleton variant="circular" width={35} height={35} />
                            <Skeleton variant="circular" width={35} height={35} />
                        </div>
                    </TableCell>
                </TableRow>
            ))}
        </>
    );
};

export default TableSkeleton;