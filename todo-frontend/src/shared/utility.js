export const updateObject = ( oldObject, updateProps  ) => {
    return {
        ...oldObject,
        ...updateProps
    }
}

export const formatDateTime = (date) => {
    return Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "2-digit",
      hour: 'numeric', minute: 'numeric', 
      timeZone: 'America/Los_Angeles',
    }).format(new Date(date));
};