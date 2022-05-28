import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import {DateRangePicker} from "materialui-daterange-picker";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import * as React from "react";

import {TextField} from "@material-ui/core";
import {useState} from "react";
import {Support} from "../../Action/PublicController";

export default function HelpSupport(props){


    const [form, setForm]=useState({
        name:'',
        email:'',
        description:''
    })

    const handleClose = () => {
        props.setOpen(false);
    };

    const handleSubmit = async () => {


        await Support(form);



    };


return (
    <>
        <Dialog
            fullWidth={true}
            maxWidth={"sm"}
            open={props.open}
            onClose={handleClose}
            aria-labelledby="responsive-dialog-title"
        >
            <DialogTitle id="responsive-dialog-title">
                {"Submit this form, we will connect with you soon.."}
            </DialogTitle>
            <DialogContent>
                <DialogContentText>

                    <TextField
                        value={form.name}
                        onChange={(e)=>{
                              setForm({...form,name:e.target.value});
                        }}
                        fullWidth
                        id="outlined-basic"
                        label="Name"
                        variant="outlined"
                    />

                    <br/>
                    <TextField
                        value={form.email}
                        onChange={(e)=>{
                            setForm({...form,email:e.target.value});
                        }}
                        fullWidth id="outlined-basic" label="Email Id" variant="outlined" />

                    <br/>

                    <TextField
                        value={form.description}
                        onChange={(e)=>{
                            setForm({...form,description:e.target.value});
                        }}
                        placeholder="MultiLine with rows: 2 and rowsMax: 4"
                        multiline
                        rows={2}
                        fullWidth
                        maxRows={10}
                        label="Description"
                    />

                    <br/>

                    <Button onClick={handleSubmit} autoFocus>
                        Submit
                    </Button>

                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button autoFocus onClick={handleClose}>
                    close
                </Button>

            </DialogActions>
        </Dialog>



    </>
)

}