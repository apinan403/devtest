import { CustomSelect, StyledOption, renderValue } from "../components/CustomSelect";

export default function VenueBookingSystem() {
    const [bookingData, setBookingData] = useState({
        id: 0,
        roomId: "",
        startDate: "",
        endDate: "",
        title: "",
    });

    useEffect(() => {
        document.title = "02 - Venue Booking System (Javascript Test)";
    }, []);

    const handleSubmit = (evt) => {
        evt.preventDefault();

        let data = { bookingData };

        fetch("https://pointy-gauge.glitch.me/api/form", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => response.json())
            .then((response) => console.log("Success:", JSON.stringify(response)))
            .catch((error) => console.error("Error:", error));
    };

    // const handleInput = (evt) => {
    //     const name = evt.target.name;
    //     const newValue = evt.target.value;
    //     /* setBookingData((previousState) => {
    //         return { ...previousState, [name]: newValue };
    //     }); */
    //     setBookingData({ [name]: newValue });
    // };

    const handleInput = (value) => {
        const name = value.target.name;
        setBookingData({ [name]: value });
    };

    console.log("Start Date :", bookingData.startDate);
    console.log("End Date :", bookingData.endDate);

    return (
        <div className="App" style={{ padding: "5%" }}>
            <form /* onSubmit={handleSubmit} */>
                <div>
                    <TextField id="filled-textarea" label="About use" placeholder="Use detail" multiline variant="filled" />
                </div>

                <div>
                    <CustomSelect renderValue={renderValue} value={this.state.roomId} name="roomId" onChange={this.setInputData}>
                            <StyledOption value={"A101"}>A101</StyledOption>
                            <StyledOption value={"A102"}>A102</StyledOption>
                            <StyledOption value={"Auditorium"}>Auditorium</StyledOption>
                        </CustomSelect>
                </div>

                <div>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DateTimePicker
                            renderInput={(props) => <TextField {...props} />}
                            label="Check In"
                            id="startDate"
                            inputFormat="yyyy-MM-dd HH:mm:ss"
                            minDate={new Date()}
                            value={bookingData.startDate}
                            onChange={handleInput}
                            /* onChange={(newValue) => {
                                setBookingData((previousState) => {
                                    return { ...previousState, startDate: newValue };
                                });
                            }} */
                        />
                    </LocalizationProvider>
                    &nbsp; &nbsp;
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DateTimePicker
                            renderInput={(props) => <TextField {...props} />}
                            label="Check out"
                            inputFormat="yyyy-MM-dd HH:mm:ss"
                            minDate={new Date()}
                            value={bookingData.endDate}
                            onChange={(newValue) => {
                                setBookingData((previousState) => {
                                    return { ...previousState, endDate: newValue };
                                });
                            }}
                        />
                    </LocalizationProvider>
                </div>

                <div>
                    <Button variant="contained" type="submit">
                        Booking
                    </Button>
                </div>
            </form>

            {/* <div>
                <input type="datetime-local" min={new Date()} pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}" onChange={(e) => setStartDate(e.target.value)} />
            </div> */}
        </div>
    );
}

////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////

export default class VenueBookingSystem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: 0,
            roomId: "",
            startDate: "",
            endDate: "",
            title: "",
        };
    }

    componentDidMount() {
        document.title = "02 - Venue Booking System (Javascript Test)";
    }
    render() {
        return (
            <div className="App" style={{ padding: "5%" }}>
                <CustomSelect renderValue={renderValue} value={this.state.roomId} name="roomId" onChange={this.setInputData}>
                            <StyledOption value={"A101"}>A101</StyledOption>
                            <StyledOption value={"A102"}>A102</StyledOption>
                            <StyledOption value={"Auditorium"}>Auditorium</StyledOption>
                        </CustomSelect>
                <div>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DateTimePicker
                            renderInput={(props) => <TextField {...props} />}
                            label="Date Time Picker"
                            value={this.state.startDate}
                            onChange={(newValue) => {
                                this.setState({ startDate: newValue });
                            }}
                        />
                    </LocalizationProvider>
                </div>
                <p>Start Time: {this.state.startDate}</p>
                <p>End Time: </p>
            </div>
        );
    }
}