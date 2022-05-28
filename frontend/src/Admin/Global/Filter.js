import * as React from 'react';
import TextField from '@material-ui/core/TextField';
import { DateRangePicker } from "materialui-daterange-picker";

import Box from '@material-ui/core/Box';
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
export default function Filter(props){

    const [open, setOpen] = React.useState(false);
    const [dateRange, setDateRange] = React.useState({});

    const handleClickOpen = () => {
        setOpen(true);
    };


    const handleClose = () => {
        setOpen(false);
    };

    const handleUpdate = () => {
        props.setFilter(dateRange);
        setOpen(false);
    };
    const toggle = () => setOpen(!open);
    return (
        <>

            <Button style={{float:'right'}} onClick={toggle} variant="contained" disableElevation>
                Filter
            </Button>

            <br/>
            <br/>
            <Dialog
                fullWidth={true}
                maxWidth={"lg"}
                open={open}
                onClose={handleClose}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="responsive-dialog-title">
                    {"Select Date Range"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <DateRangePicker
                            open={open}
                            toggle={toggle}
                            onChange={(range) => setDateRange(range)}
                        />
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleClose}>
                        close
                    </Button>
                    <Button onClick={handleUpdate} autoFocus>
                        Update
                    </Button>
                </DialogActions>
            </Dialog>



            <br/>

            </>
    )



}