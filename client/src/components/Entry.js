import React from "react";
import { Accordion, AccordionSummary, AccordionDetails, Typography, IconButton } from "@material-ui/core";
import styled from "styled-components";

import DeleteIcon from "@material-ui/icons/Delete";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const Style = styled.div`
    .entry {
        flex-grow: 4;
        margin-top: 20px;
    }

    .entry-title {
        color: #4B967F;
    }

    .entry-date {
        color: gray;
    }

    .flex-container {
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        align-items: center;
    }
`

export class Entry extends React.Component {
    render() {
        return(
            <React.Fragment>
                <Style>
                    <div className="flex-container">
                        <Accordion className="entry">
                            
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                            >
                                <Typography className="entry-title">{this.props.title}</Typography>&nbsp;
                                <Typography className="entry-date">{this.props.date}</Typography>
                            </AccordionSummary>
                            
                            <AccordionDetails>
                                <Typography>
                                    {this.props.body}
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                        <div>
                            <IconButton className="delete-button" onClick={event => this.props.delete(this.props.id, event)}>
                                <DeleteIcon />
                            </IconButton>
                        </div>
                        
                    </div>
                </Style>
            </React.Fragment>
        );
    }
}