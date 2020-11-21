import React from "react";
import { AppBar, Toolbar, Typography, IconButton } from "@material-ui/core";
import styled from "styled-components";

import logo from "../assets/logo.png";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";

const Style = styled.div`
    .navigation-main {
        background-color: #4B967F;
    }

    .logo {
        height: 50px;
        margin-right: 20px;
    }

    .header {
        color: white;
    }

    .account {
        margin-left: auto;
        color: white;
    }
`

export class Navigation extends React.Component {
    render() {
        return(
            <React.Fragment>
                <Style>
                    <AppBar position="fixed" className="navigation-main">
                        <Toolbar>
                            <a href="http://www.google.com" target="_blank" rel="noreferrer"><img src={logo} alt="logo" className="logo"/></a>
                            <Typography className="header" variant="h5">Daily Journal</Typography>
                            <IconButton className="account">
                                <AccountCircleIcon  style={{"fontSize":"30"}}/>
                            </IconButton>
                        </Toolbar>
                    </AppBar>
                </Style>
            </React.Fragment>
        );
    }
}
