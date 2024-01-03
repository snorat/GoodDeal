/* eslint-disable react/prop-types */

export default function MessageContent({ message, sender }) {
  const isSentMessage = String(message.sender_user_id) === String(sender);

  const messageClass = isSentMessage ? "sent_message" : "received_message";

  return (
    <div className={`message_content ${messageClass}`}>
      <p>{message.content}</p>
    </div>
  );
}
