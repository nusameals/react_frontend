export const dataPaymentsCard = [422, 400, 380, 180, 380, 422, 390, 200, 422, 520];

export const data = [
    264, 417, 438, 887, 309, 397, 550, 575, 563, 430, 525, 592, 492, 467, 513,
    546, 983, 340, 539, 243, 226, 192,
  ];

export const getListData = (value) => {
  let listData;
  switch (value.date()) {
    case 8:
      listData = [
        {
          type: "warning",
          content: "This is warning event.",
        },
        {
          type: "success",
          content: "This is usual event.",
        },
      ];
      break;
    case 10:
      listData = [
        {
          type: "warning",
          content: "This is warning event.",
        },
        {
          type: "success",
          content: "This is usual event.",
        },
        {
          type: "error",
          content: "This is error event.",
        },
      ];
      break;
    case 15:
      listData = [
        {
          type: "warning",
          content: "This is warning event",
        },
        {
          type: "success",
          content: "This is very long usual event。。....",
        },
        {
          type: "error",
          content: "This is error event 1.",
        },
        {
          type: "error",
          content: "This is error event 2.",
        },
        {
          type: "error",
          content: "This is error event 3.",
        },
        {
          type: "error",
          content: "This is error event 4.",
        },
      ];
      break;
    default:
  }
  return listData || [];
};