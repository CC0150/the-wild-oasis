import { useGetUser } from "./hooks/useGetUser";
import { StyledUserAvatar, Avatar } from "./style";
import { DEFAULT_AVATAR } from "@/utils/constants";

const UserAvatar: React.FC = () => {
  const { user } = useGetUser();

  const { fullName, avatar } = user!.user_metadata;

  return (
    <StyledUserAvatar>
      <Avatar src={avatar || DEFAULT_AVATAR} alt={`${fullName}'s avatar`} />
      <span>{fullName}</span>
    </StyledUserAvatar>
  );
};

export default UserAvatar;
