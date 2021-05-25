import styled from "styled-components";
import {Text} from "../../../components/text.component";
import {Card} from "react-native-paper";

export const ItemContainer = styled(Card)`
  background-color: ${props => props.theme.colors.bg.primary};
  padding: ${props => props.theme.space[1]};
  margin-bottom: ${props => props.theme.space[2]};
  elevation: ${1}
`

export const IsEmptyContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`

export const IsEmptyLabel = styled(Text)`
  font-size: ${props => props.theme.fontSizes.title};
`