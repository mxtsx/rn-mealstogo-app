import styled from "styled-components";
import {Card} from "react-native-paper";
import {Text} from "../../../components/text.component";
import {SvgXml} from "react-native-svg";

export const RestaurantCardContainer = styled(Card)`
  background-color: ${props => props.theme.colors.bg.primary};
  margin-bottom: ${props => props.theme.space[3]};
`

export const RestaurantCardCover = styled(Card.Cover)`
  padding: ${props => props.theme.space[3]};
  background-color: ${props => props.theme.colors.bg.primary}
`

export const TitleWrapper = styled(Card.Content)`
`

export const IconsWrapper = styled.View`
  flex-direction: row;
  justify-content: space-between;
  paddingVertical: ${props => props.theme.space[1]};
`

export const StarsWrapper = styled.View`
  flex-direction: row;
`

export const IsOpenWrapper = styled.View`
  flex-direction: row;
`

export const ClosedTemporarily = styled(Text)`
  text-transform: uppercase;
  margin-right: ${props => props.theme.space[2]};
`

export const IsClosedNow = styled(SvgXml)`
  height: 20px;
  width: 20px;
`

export const IsDinner = styled.Image`
  width: 20px;
  height: 20px;
  margin-left: ${props => props.theme.space[2]};
`

export const Address = styled(Text)`
  color: ${props => props.theme.colors.text.secondary};
`