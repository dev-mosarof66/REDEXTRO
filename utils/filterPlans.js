export const InProgress = (data) => {
  console.log("inprgoress");

  data.map((item) => {
    if (item.status === "in-progress") {
      console.log(item);

      return item;
    }
  });
};

export const Completed = (data) => {
  let array = [];
  data.map((item) => {
    if (item.status === "completed") {
      array.push(item);
    }
  });
  return array;
};
export const Pending = (data) => {
  let array = [];
  data.map((item) => {
    if (item.status === "pending") {
      array.push(item);
    }
  });
  return array;
};
