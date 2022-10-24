import {
  Box,
  // Icon,
  IconButton,
  styled,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
} from '@mui/material';
import { useState, useEffect } from 'react';
import { SimpleCard } from 'app/components';
import ApiIndex from '../../../api/index';
import Modal from './modal';

const StyledTable = styled(Table)(() => ({
  whiteSpace: 'pre',
  '& thead': {
    '& tr': { '& th': { paddingLeft: 0, paddingRight: 0 } },
  },
  '& tbody': {
    '& tr': { '& td': { paddingLeft: 0, textTransform: 'capitalize' } },
  },
}));

const Faq = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [faqList, setFaqList] = useState([]);

  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const getFaq = async () => {
    try {
      const response = await ApiIndex.FaqApi.getFaq();
      setFaqList(response.data);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getFaq();
  }, []);

  return (
    <SimpleCard title="Answers for Customer Queries">
      <Box width="97%" overflow="auto">
        <StyledTable>
          <TableHead>
            <TableRow>
              <TableCell align="left">Questions</TableCell>
              <TableCell align="center">Answer</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {faqList &&
              faqList
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((faq, index) => (
                  <TableRow key={index}>
                    <TableCell align="left">{faq.message}</TableCell>
                    <TableCell align="center">
                      <Modal faqId={faq.id} />
                    </TableCell>
                  </TableRow>
                ))}
          </TableBody>
        </StyledTable>
        <TablePagination
          sx={{ px: 2 }}
          page={page}
          component="div"
          rowsPerPage={rowsPerPage}
          count={5}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={handleChangeRowsPerPage}
          nextIconButtonProps={{ 'aria-label': 'Next Page' }}
          backIconButtonProps={{ 'aria-label': 'Previous Page' }}
        />
      </Box>
    </SimpleCard>
  );
};

export default Faq;
