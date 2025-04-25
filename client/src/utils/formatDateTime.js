export const formatDateTime = (isoDate) => {
    const date = new Date(isoDate);
  
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    };
  
    return date.toLocaleString("en-US", options); // Customize locale if needed
  };
  