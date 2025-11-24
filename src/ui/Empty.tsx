const Empty: React.FC<{ resourceName: string }> = ({ resourceName }) => {
  return <p>No {resourceName} could be found.</p>;
};

export default Empty;
