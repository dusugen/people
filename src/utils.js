export const sortUsers = (data, field, direction) => {
  const copyData = [...data];
  copyData.sort((itemA, itemB) => {
    let result = 0;
    if (field === "id") {
      result = direction === "asc" ? itemA.id - itemB.id : itemB.id - itemA.id;
    }
    if (field === "status") {
      result =
        direction === "asc"
          ? itemA.status.localeCompare(itemB.status)
          : itemB.status.localeCompare(itemA.status);
    }
    return result;
  });
  return copyData;
};

export const showMessage = ({ type, message }) => {
  if (type === "error") {
    alert(message);
  } else if (type === "success") {
    alert(message);
  }
};
