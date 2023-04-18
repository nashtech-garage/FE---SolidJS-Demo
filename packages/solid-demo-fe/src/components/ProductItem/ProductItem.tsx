import { Box, Typography, styled } from "@suid/material"
import { A } from '@solidjs/router';
import { Star } from '@suid/icons-material'
import { splitProps } from "solid-js"
import { IProduct } from "../../types"

interface ProductItemProps {
  product: IProduct
}

function ProductItem(props: ProductItemProps) {
  const [{ product }] = splitProps(props, ['product'])
  const { title, thumbnail, variants } = product
  const price = variants[0]?.prices[0]?.amount / 100
  const productLink = `/products/${product.id}`

  return (
    <Container>
      <LinkStyled href={productLink}>
        <Image src={thumbnail} />
      </LinkStyled>
      <Box>
        <Box>
          <Star sx={{ fontSize: '0.8rem', color: '#EDB867' }} />
          <Star sx={{ fontSize: '0.8rem', color: '#EDB867' }} />
          <Star sx={{ fontSize: '0.8rem', color: '#EDB867' }} />
          <Star sx={{ fontSize: '0.8rem', color: '#EDB867' }} />
          <Star sx={{ fontSize: '0.8rem', color: '#EDB867' }} />
        </Box>
        <LinkStyled href={productLink}>
          <Title color="#777">{title}</Title>
        </LinkStyled>
        <LinkStyled href={productLink}>
          <PriceTag>${price.toFixed(2)}</PriceTag>
        </LinkStyled>
      </Box>
      <NewTag>NEW</NewTag>
    </Container>
  )
}

const Container = styled(Box)({
  position: 'relative'
})

const LinkStyled = styled(A)({
  textDecoration: 'none'
})

const Image = styled('img')({
  width: '100%'
})

const Title = styled(Typography)({
  color: '#777',
  fontWeight: 400,
  fontSize: 14,
  lineHeight: 1,
  marginBottom: 4
})

const PriceTag = styled(Typography)({
  color: '#666',
  fontWeight: 'bold',
  fontSize: 16,
  lineHeight: 1,
  marginBottom: 4
})

const NewTag = styled('span')({
  position: 'absolute',
  top: 8,
  left: 8,
  borderRadius: '100%',
  background: '#FF4C3B',
  color: '#FFF',
  padding: '10px 4px',
  fontSize: 10,
  fontWeight: 'bold'
})

export default ProductItem