import React, { useState, useEffect } from "react";
import axios from "axios";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// layout for this page
import Article from "layouts/Article.js";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";

const styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0",
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF",
    },
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1",
    },
  },
};

function TableList() {
  const useStyles = makeStyles(styles);
  const classes = useStyles();

  const [articles, setArticles] = useState([]);
  useEffect(()=>{
    const fetchArticles = async () => {
      try{
        const {data} = await axios.get("http://localhost:3000/api/article");
        console.log("data, ", data);
        setArticles(data);
      } catch(error){
        console.log("Errors: ", error);
      }
    };
    fetchArticles()
  },[]);
  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>List Of Articles</h4>
            <p className={classes.cardCategoryWhite}>
              Here are 5 recent articles
            </p>
          </CardHeader>
          <CardBody>
            <Table
              tableHeaderColor="primary"
              tableHead={["Title", "Description", "Email", "Published Date"]}
              tableData={articles}
            />
          </CardBody>
        </Card>
      </GridItem>
      
    </GridContainer>
  );
}

TableList.layout = Article;

export default TableList;
