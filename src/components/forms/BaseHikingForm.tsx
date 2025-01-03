import { styled } from '@mui/material/styles'

const FormContainer = styled('div')`
  max-width: var(--max-width-content);
  width: 100%;
  margin: 0 auto;
  padding: 2rem;
  
  @media (max-width: 480px) {
    padding: var(--padding-mobile);
  }
`; 

export const BaseHikingForm = ({ children }: { children: React.ReactNode }) => {
  return (
    <FormContainer>
      {children}
    </FormContainer>
  )
} 