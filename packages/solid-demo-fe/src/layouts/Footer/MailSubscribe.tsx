import { Button, styled, Typography, TextField, Divider, Grid } from '@suid/material';

const MailSubscribe = () => {
  return (
    <ContainerStyled container>
      <LeftItemStyled item md>
        <TitleStyled variant='h4'>KNOW IT ALL FIRST!</TitleStyled>
        <BodyStyled variant='body1'>Never Miss Anything From Multikart By Signing Up To Our Newsletter.</BodyStyled>
      </LeftItemStyled>
      <DividerStyled orientation='vertical' flexItem />
      <RightItemStyled item md>
        <TextFieldStyled id='outlined-small' label='Enter your email' variant='outlined' />
        <ButtonStyled variant='contained' size='large'>
          subscribe
        </ButtonStyled>
      </RightItemStyled>
    </ContainerStyled>
  );
};

const ContainerStyled = styled(Grid)(({ theme }) => ({
  paddingBlock: 32,
  justifyContent: 'center',
    gap: 8,
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
    textAlign: 'center'
  },
}));

const LeftItemStyled = styled(Grid)({
  display: 'flex',
  flexDirection: 'column',
  gap: 4,
});

const RightItemStyled = styled(Grid)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'center',
  gap: 16,
  [theme.breakpoints.down('md')]: {
    gap: 0,
    justifyContent: 'center',
  },
}));

const TitleStyled = styled(Typography)(({ theme }) => ({
  fontSize: 21,
  fontWeight: 'bold',
  [theme.breakpoints.down('md')]: {
    marginBlockEnd: 16,
  },
}));

const BodyStyled = styled(Typography)(({ theme }) => ({
  fontSize: 15,
  color: theme.palette.grey[600],
  [theme.breakpoints.down('md')]: {
    display: 'none',
  },
}));

const DividerStyled = styled(Divider)(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    display: 'none',
  },
  [theme.breakpoints.up('md')]: {
    display: 'block',
  },
}));

const TextFieldStyled = styled(TextField)({
  '& > .MuiInputBase-root': {
    borderRadius: 0,
  },
});

const ButtonStyled = styled(Button)({
  height: 62,
  boxShadow: 'none',
  borderRadius: 0,
});

export { MailSubscribe };
