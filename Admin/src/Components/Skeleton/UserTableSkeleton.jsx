import React from 'react';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Skeleton from '@mui/material/Skeleton';

const UserTableSkeleton = ({ rowsPerPage = 10 }) => {
    return (
        <>
            {[...Array(rowsPerPage)].map((_, index) => (
                <TableRow key={index}>
                    <TableCell style={{ minWidth: 80 }}>
                        <Skeleton variant="rectangular" width={20} height={20} />
                    </TableCell>

                    <TableCell style={{ minWidth: 80 }}>
                        <div className='flex items-center gap-4 w-[70px]'>
                            <Skeleton variant="rectangular" width={45} height={45} sx={{ borderRadius: '6px' }} />
                        </div>
                    </TableCell>

                    <TableCell style={{ minWidth: 100 }}>
                        <Skeleton variant="text" width="80%" height={20} />
                    </TableCell>

                    <TableCell style={{ minWidth: 150 }}>
                        <Skeleton variant="text" width="90%" height={20} />
                    </TableCell>

                    <TableCell style={{ minWidth: 130 }}>
                        <Skeleton variant="text" width="80%" height={20} />
                    </TableCell>

                    <TableCell style={{ minWidth: 130 }}>
                        <Skeleton variant="text" width="80%" height={20} />
                    </TableCell>
                </TableRow>
            ))}
        </>
    );
};

export default UserTableSkeleton;
