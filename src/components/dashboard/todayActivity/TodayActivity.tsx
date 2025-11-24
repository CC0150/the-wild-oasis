import Heading from "@/ui/Heading";
import Row from "@/ui/Row";
import { StyledToday, TodayList, NoActivity } from "./style";
import { useGetTodayActivity } from "./hooks/useGetTodayActivity";
import Spinner from "@/ui/Spinner";
import TodayItem from "./TodayItem";

const Today: React.FC = () => {
  const { activities, isLoading } = useGetTodayActivity();

  return (
    <StyledToday>
      <Row type="horizontal">
        <Heading as="h2">Today</Heading>
      </Row>
      {isLoading ? (
        <Spinner />
      ) : activities?.length === 0 ? (
        <NoActivity>
          <Row type="horizontal">
            <Heading as="h3">No activity today</Heading>
          </Row>
        </NoActivity>
      ) : (
        <TodayList>
          {activities?.map((activity) => (
            <TodayItem key={activity.id} activity={activity} />
          ))}
        </TodayList>
      )}
    </StyledToday>
  );
};

export default Today;
