import { For } from 'solid-js';
import { Box, Container, Divider, styled } from '@suid/material';

import { MailSubscribe } from './MailSubscribe';
import { MainContent } from './MainContent';
import { PAYMENT_LIST } from '../../constants';
import { CopyrightText } from '../../components';

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
          <CopyrightText />
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
