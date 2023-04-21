import { For } from 'solid-js';
import { Box, Container, Divider, Typography, styled } from '@suid/material';
import { MailSubscribe } from './MailSubscribe';
import { MainContent } from './MainContent';
import { PAYMENT_LIST } from '../../constants';

function Footer() {
  return (
    <FooterStyled component='footer'>
      <Container maxWidth='xl' component='section'>
        <MailSubscribe />
        <Divider />
        <MainContent />
      </Container>
      <ContainerWhiteStyled>
        <ContainerWrapperStyled maxWidth='xl'>
          <CopyrightText>© Create by FE-Team</CopyrightText>
          <PaymentListStyled>
            <For each={PAYMENT_LIST} children={(item) => <PaymentImgStyled component='img' {...item} />} />
          </PaymentListStyled>
        </ContainerWrapperStyled>
      </ContainerWhiteStyled>
    </FooterStyled>
  );
}

const FooterStyled = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.grey[100],
}));

const ContainerWhiteStyled = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));

const ContainerWrapperStyled = styled(Container)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingBlock: 16,
});

const CopyrightText = styled(Typography)(({ theme }) => ({
  color: theme.palette.grey[600],
  fontSize: 16,
  letterSpacing: 0.5,
}));

const PaymentListStyled = styled(Box)({
  display: 'flex',
  gap: 12,
});

const PaymentImgStyled = styled(Box)(({ theme }) => ({
  height: 36,
  width: 36,
  borderRadius: '50%',
  border: `1px solid ${theme.palette.grey[200]}`,
}));

export { Footer };
