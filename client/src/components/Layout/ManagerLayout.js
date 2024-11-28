import React from "react";

const ManagerLayout = ({ listComponent, formComponent, paginationComponent }) => (
  <div style={{ display: "flex", height: "calc(100vh - 50px)" }}>
    <div style={{ flex: 8, overflowY: "auto", borderRight: "1px solid #ccc", padding: "1rem" }}>
      {listComponent}
    </div>
    <div style={{ flex: 2, padding: "1rem" }}>
      {formComponent}
    </div>
    {paginationComponent && (
      <div style={{ padding: "1rem", textAlign: "center", borderTop: "1px solid #ccc" }}>
        {paginationComponent}
      </div>
    )}
  </div>
);

export default ManagerLayout;
