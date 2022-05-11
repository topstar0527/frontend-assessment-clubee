import ADD from "@material-ui/icons/ADD";


const dashboardRoutes = [
  {
    path: "/add",
    name: "ADD Article",
    icon: ADD,
    layout: "/article",
  },
  {
    path: "/list",
    name: "List Articles",
    icon: "content_paste",
    layout: "/article",
  },
];

export default dashboardRoutes;
