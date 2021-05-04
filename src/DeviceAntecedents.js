export default function DeviceAntecedents(antecedents, idx) {

    const checkDeviceStatusAndMeasure = (measure_device) => {
        if (measure_device !== "null" && measure_device !== "init" && measure_device !== "NaN" && measure_device !== null) {
            const status = "connected"
            const color = "green"
            return { measure: measure_device, status: status, color: color }
        }
        else if (measure_device === "init") {
            const measure_perc = "-";
            const status = "initialization"
            const color = "yellow"
            return { measure: measure_perc, status: status, color: color }
        }
        else {
            const measure_perc = "-";
            const status = "disconnected"
            const color = "red"
            return { measure: measure_perc, status: status, color: color }
        }

    }

    const device_details = (antecedents, idx) => {
        const deviceId = antecedents[idx].id;
        const absolute_measure = antecedents[idx].absolute_measure;
        const max_measure = antecedents[idx].setting;
        const error = antecedents[idx].error;
        var device = { measure: "null", status: "disconnected", color: "red", type: "", settings: "", error_measure: "", measure_type: "", measure_settings: "", measure_unit: "" };

        if (deviceId.includes("timer")) {
            var today = new Date();
            device.measure = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
            device.status = "connected";
            device.color = "green";
            device.type = "sensor - timer";
            device.settings = "/";
            device.error_measure = "/";
            device.measure_type = "time";
            device.measure_settings = "";
            device.measure_unit = "";
        }
        else if (deviceId.includes("BUTTON")){
            const checkStatusDevice = checkDeviceStatusAndMeasure(absolute_measure);
            device.status = checkStatusDevice.status;
            device.color = checkStatusDevice.color;
            device.measure = checkStatusDevice.measure;
            device.type = "sensor - button";
            device.settings = "/";
            device.error_measure = "/";
            device.measure_type = "status";
            device.measure_settings = "";
            device.measure_unit = "";
        }
        else if (deviceId.includes("PHOTOCELL") || deviceId.includes("SOILMOISTURE")) {
            const checkStatusDevice = checkDeviceStatusAndMeasure(absolute_measure);
            device.status = checkStatusDevice.status;
            device.color = checkStatusDevice.color;
            if (checkStatusDevice.measure !== "-") {
                device.measure = Math.round((parseInt(absolute_measure) / parseInt(max_measure)) * 100.0).toString();

            } else {
                device.measure = checkStatusDevice.measure;
            }
            device.type = deviceId.includes("PHOTOCELL") ? "sensor - photocell" : "sensor - soil moisture";
            device.settings = "/";
            device.error_measure = "/";
            device.measure_type = deviceId.includes("PHOTOCELL") ? "luminosity" : "soil moisture";
            device.measure_settings = "";
            device.measure_unit = "%";
        }
        else if (deviceId.includes("AMMETER")) {
            const checkStatusDevice = checkDeviceStatusAndMeasure(absolute_measure);
            device.status = checkStatusDevice.status;
            device.color = checkStatusDevice.color;
            if (checkStatusDevice.measure !== "-") {
                device.measure = Math.round((parseInt(absolute_measure) / parseInt(max_measure)) * 100.0).toString();

            } else {
                device.measure = checkStatusDevice.measure;
            }
            device.type = "sensor - ammeter";
            device.settings = max_measure;
            device.error_measure = "/";
            device.measure_type = "electric power";
            device.measure_settings = "W";
            device.measure_unit = "W";
        }
        else if (deviceId.includes("WATERLEVEL")) {
            const checkStatusDevice = checkDeviceStatusAndMeasure(absolute_measure);
            device.status = checkStatusDevice.status;
            device.color = checkStatusDevice.color;
            if (checkStatusDevice.measure !== "-") {
                const relative_measure = parseInt(absolute_measure) - parseInt(error);
                const measure = Math.round((1 - (relative_measure / parseInt(max_measure))) * 100.0).toString();
                device.measure = measure;
            }else {
                device.measure = checkStatusDevice.measure;
            }
            device.type = "sensor - water level";
            device.settings = max_measure;
            device.error_measure = error;
            device.measure_type = "water level";
            device.measure_settings = "cm";
            device.measure_unit = "%";
        }

        return device

    }

    return (
        device_details(antecedents, idx)
    )
}