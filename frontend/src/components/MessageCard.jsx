import PropTypes from "prop-types";

export default function MessageCard({ contact }) {
  return <p>{contact.userFname}</p>;
}
MessageCard.propTypes = {
  contact: PropTypes.shape({
    userFname: PropTypes.string,
  }).isRequired,
};
