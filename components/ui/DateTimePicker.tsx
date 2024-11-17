import { Platform } from "react-native";
import { DateTimePickerAndroid, DatePickerOptions } from "@react-native-community/datetimepicker";
import DefaultDateTimePicker from "@react-native-community/datetimepicker";
import Modal from "./Modal";

interface DateTimePickerProps extends Omit<DatePickerOptions, "onChange"> {
    onChange?: (date: Date) => void,
    mode?: "date"|"time",
    visble: boolean
}

const DateTimePicker: React.FC<DateTimePickerProps> = ({ visble, mode, onChange, ...restProps }) => {

    const handleDateChange = (date: Date) => {
        onChange && onChange(date);

        if(Platform.OS === "android") {
            DateTimePickerAndroid.dismiss(mode)
        }
    }


    if (!visble) return null

    if(Platform.OS === "ios") {
        return (
            <Modal isVisible={visble}>
                <DefaultDateTimePicker
                    mode={mode}
                    onChange={(_, date) => handleDateChange(date!)}
                    {...restProps}
                />

            </Modal>
        )
    }

    return (
        <DefaultDateTimePicker
            onChange={(_, date) => handleDateChange(date!)}
            mode={mode}
            {...restProps}
        />
    )
}

export default DateTimePicker;