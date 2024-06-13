import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faCoffee, faAddressBook } from "@fortawesome/free-solid-svg-icons";

// Add all solid icons to the library
library.add(faCoffee, faAddressBook);

const FontAwesomePicker = ({ onSelect }) => {
  const [searchQuery, setSearchQuery] = useState("");

  // Filter icons based on search query
  const filteredIcons = Object.values(library?.definitions || {}).filter(
    (icon) =>
      icon &&
      icon.iconName &&
      icon.iconName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    // Reset search query when component unmounts
    return () => setSearchQuery("");
  }, []);

  return (
    <div>
      <input
        type="text"
        placeholder="Search icons..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <div className="icon-list">
        {filteredIcons.map((icon, index) => (
          <div
            key={index}
            className="icon-item"
            onClick={() => onSelect(icon.iconName)}
          >
            <FontAwesomeIcon icon={icon.icon} />
            <span>{icon.iconName}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FontAwesomePicker;
