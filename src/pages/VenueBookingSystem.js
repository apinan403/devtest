import React from "react";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import "../css/VenueBookingSystem.css";
import BookingData from "../data/test.json";

export default class VenueBookingSystem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: BookingData[BookingData.length - 1].id,
            roomId: "",
            startTime: new Date(),
            endTime: "",
            title: "",
        };

        this.setSelectInput = this.setSelectInput.bind(this);
        this.setInputData = this.setInputData.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        document.title = "02 - Venue Booking System (Javascript Test)";
    }

    setSelectInput = (item) => {
        // console.log("Item :", item);
        this.setState({ ...this.state, [item.name]: item.value });
    };

    setInputData = (item) => {
        let value = item.target.value;
        this.setState({ ...this.state, [item.target.name]: value });
    };

    handleSubmit = (event) => {
        event.preventDefault();

        function newDateFromat(date) {
            return date.getFullYear() + "-" + ("0" + (date.getMonth() + 1)).slice(-2) + "-" + ("0" + date.getDate()).slice(-2) + " " + ("0" + date.getHours()).slice(-2) + ":" + ("0" + date.getMinutes()).slice(-2) + ":" + ("0" + date.getSeconds()).slice(-2);
        }

        const bookingData = {
            id: this.state.id + 1,
            roomId: this.state.roomId,
            startTime: newDateFromat(this.state.startTime),
            endTime: newDateFromat(this.state.endTime),
            title: this.state.title,
        };

        const checkAvailability = (roomId, startTime, endTime) => {
            let canBooking = false;

            Object.keys(BookingData).forEach((e) => {
                if (roomId === BookingData[e].roomId) {
                    if (new Date(startTime) > new Date(BookingData[e].endTime)) {
                        console.log("Id :", BookingData[e].id);
                        console.log("Booking Start :", BookingData[e].startTime);
                        console.log("Booking End :", BookingData[e].endTime);

                        canBooking = true;
                        console.log("canBooking check time :", canBooking);
                    } else {
                        console.log("canBooking check time :", canBooking);
                        canBooking = false;
                    }
                } else {
                    canBooking = false;
                }
            });
            return canBooking;
        };

        if (checkAvailability(bookingData.roomId, bookingData.startTime, bookingData.endTime)) {
            console.log("Data :", bookingData);
            alert(`Room ${this.state.roomId} Booking Succeed.`);
        } else {
            alert(`Room ${this.state.roomId} Can't reserved.`);
        }

        /* console.log("Data Time String :", BookingData[BookingData.length - 1].endTime);
        console.log("Data Time String to Date :", new Date(BookingData[BookingData.length - 1].endTime));

        console.log("Input Time String :", bookingData.endTime);
        console.log("Input Time String to Date :", new Date(bookingData.endTime)); */
        // console.log(
        //     "Date :",
        //     BookingData.every((item) => item.endTime)
        // );
    };

    render() {
        return (
            <div className="App" style={{ padding: "5%" }}>
                <form onSubmit={this.handleSubmit}>
                    {/* Room */}
                    <div>
                        <FormControl sx={{ minWidth: 200 }}>
                            <InputLabel id="native-label">Room</InputLabel>
                            <Select labelId="demo-simple-select-helper-label" id="demo-simple-select-helper" value={this.state.roomId} label="Room" name="roomId" onChange={this.setInputData} required>
                                <MenuItem value={"A101"}>A101</MenuItem>
                                <MenuItem value={"A102"}>A102</MenuItem>
                                <MenuItem value={"Auditorium"}>Auditorium</MenuItem>
                                <MenuItem value={"B"}>B</MenuItem>
                            </Select>
                        </FormControl>
                        &nbsp; &nbsp;
                        {/* Description  */}
                        <TextField id="filled-textarea" label="About use" placeholder="Use detail" multiline variant="filled" name="title" value={this.state.title} onChange={this.setInputData} required />
                    </div>
                    <br />

                    {/* Check In - Check out  */}
                    <div>
                        {/* Start Date */}
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DateTimePicker renderInput={(props) => <TextField {...props} required />} inputFormat="yyyy-MM-dd HH:mm:ss" label="Check In" minDateTime={new Date()} value={this.state.startTime} onChange={(date) => this.setSelectInput({ name: "startTime", value: date })} />
                        </LocalizationProvider>
                        &nbsp; &nbsp;
                        {/* End Date */}
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DateTimePicker renderInput={(props) => <TextField {...props} required />} inputFormat="yyyy-MM-dd HH:mm:ss" label="Check out" minDateTime={this.state.startTime} value={this.state.endTime} onChange={(date) => this.setSelectInput({ name: "endTime", value: date })} />
                        </LocalizationProvider>
                    </div>
                    <br />

                    <div>
                        <Button variant="contained" type="submit">
                            Booking
                        </Button>
                    </div>
                </form>
            </div>
        );
    }
}
