import { Button, ButtonGroup, styled } from '@suid/material';

interface ICounterButtonProps {
  quantity: number;
  onChangeQuantity: (quantity: number) => void;
}

function CounterButton(props: ICounterButtonProps) {
  const decrement = () => {
    if (props.quantity === 1) return;
    props.onChangeQuantity(props.quantity - 1);
  };

  const increment = () => {
    props.onChangeQuantity(props.quantity + 1);
  };

  return (
    <ButtonGroup>
      <Button onClick={decrement} color='info'>
        -
      </Button>
      <QuantityButton disabled>{props.quantity}</QuantityButton>
      <Button onClick={increment} color='info'>
        +
      </Button>
    </ButtonGroup>
  );
}

const QuantityButton = styled(Button)({
  borderRadius: 'none',
  '&.Mui-disabled': {
    color: '#000',
    background: '#E9ECEF'
  },
});

export default CounterButton;
