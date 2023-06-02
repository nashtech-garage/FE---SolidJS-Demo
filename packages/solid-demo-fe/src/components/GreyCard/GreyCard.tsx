import { Card, Grid, styled } from '@suid/material';
import { JSX } from 'solid-js';

interface GreyCardProps {
  headerText?: string;
  content: JSX.Element | string;
}

const GreyCard = ({ headerText = 'Header text', content = '' }: GreyCardProps) => {
  return (
    <CustomCard>
      <p>{headerText}</p>
      {content}
    </CustomCard>
  );
};

const CustomCard = styled(Card)(({ theme }) => ({
  backgroundColor: theme.palette.grey[100],
  borderRadius: 'initial',
  padding: '16px',
  boxShadow: 'initial',
  '& .MuiListItem-root': {
    color: '#9a9a9a',
  },
  '& > p': {
    fontWeight: 700,
    marginBottom: 0
  },
  '& > div': {
    padding: '0px 16px',
  },
  marginBottom: '16px',
}));

export default GreyCard;
