import React from "react";
import WhatsAppIcon from "@material-ui/icons/WhatsApp";

import "./index.css";

const WhatsappBubble = () => {
  return (
    <div>
      <a
        href="https://wa.me/+34623063769"
        className="whatsapp_float"
        target="_blank"
        rel="noopener noreferrer"
      >
        <WhatsAppIcon className="whatsapp-icon" fontSize="large" />
      </a>
    </div>
  );
};

export default WhatsappBubble;
