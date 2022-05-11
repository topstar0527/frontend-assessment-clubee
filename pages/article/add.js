import React, { useState } from "react";
import { useRouter } from 'next/router';
import axios from "axios";
import toast from "react-hot-toast";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
// layout for this page
import Article from "layouts/Article.js";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";



const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0",
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
  },
};

function UserProfile() {
  const useStyles = makeStyles(styles);
  const classes = useStyles();
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");

  const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  const handleClickPost = async () => {
    if(title == ""){
      toast.error("Please input Title!");
    }else if(description == ""){
      toast.error("Please input Description!");
    }else if(email == ""){
      toast.error("Please input Email!");
    }else if(!email.match(validRegex)){
      toast.error("Please input Correct Email!");
      setEmail("");
    }else{
      try {
        await axios.post("http://localhost:3000/api/article", {
          title: title,
          email: email,
          description: description
        });
        toast.success("Posted Article Successfully.")
        router.push('/article/list');
      } catch(error){
        console.log("Errors: ",error);
      }
    }
  }
  return (
    <div>
      <GridContainer>
        <GridItem xs={12} >
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Add Your Article</h4>
              <p className={classes.cardCategoryWhite}>Fillout the fields</p>
            </CardHeader>
            <CardBody>
              <GridContainer>
                <GridItem xs={12}>
                  <CustomInput
                    labelText="Title"
                    id="title"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    onChange = {setTitle}
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                  <InputLabel style={{ color: "#AAAAAA" }}>Article Detail</InputLabel>
                  <CustomInput
                    labelText="Input detail description here."
                    id="article-detail"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      multiline: true,
                      rows: 5,
                    }}
                    onChange={setDescription}
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12}>
                  <CustomInput
                    labelText="Email address"
                    id="email-address"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    onChange={setEmail}
                  />
                </GridItem>
              </GridContainer>
            </CardBody>
            <CardFooter>
              <Button color="primary" onClick={handleClickPost}>Post Article</Button>
            </CardFooter>
          </Card>
        </GridItem>

      </GridContainer>
    </div>
  );
}

UserProfile.layout = Article;

export default UserProfile;
