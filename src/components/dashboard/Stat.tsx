import { StatProps } from "./types";
import { StyledStat, Icon, Title, Value } from "./style";

const Stat: React.FC<StatProps> = ({ icon, title, value, color }) => {
  return (
    <StyledStat>
      <Icon color={color}>{icon}</Icon>
      <Title>{title}</Title>
      <Value>{value}</Value>
    </StyledStat>
  );
};

export default Stat;
