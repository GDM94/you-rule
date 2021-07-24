export default function DeviceAntecedents(operation, antecedents, idx) {

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
        const antecedent = antecedents[idx];
        const deviceId = antecedent.id;
        const measure = antecedent.measure;
        const setting = antecedent.setting;
        const error = antecedent.error;
        var device = {
            measure: "null", status: "disconnected", color: "red", type: "", settings: "", error_measure: "", measure_type: "", measure_settings: "",
            measure_unit: "", max_measure: "", max_measure_time: "", min_measure: "", min_measure_time: ""
        };

        if (deviceId.includes("timer")) {
            var today = new Date();
            device.measure = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
            device.status = "connected";
            device.color = "green";
            device.type = "sensor - timer";
            device.settings = "/";
            device.error_measure = "/";
            device.measure_type = "time";
        }
        else if (deviceId.includes("BUTTON")) {
            const checkStatusDevice = checkDeviceStatusAndMeasure(measure);
            device.status = checkStatusDevice.status;
            device.color = checkStatusDevice.color;
            device.measure = checkStatusDevice.measure;
            device.type = "sensor - button";
            device.settings = "/";
            device.error_measure = "/";
            device.measure_type = "status";
            device.max_measure = "last time on";
            device.max_measure_time = antecedent.max_measure_time;
            device.min_measure = "last time off"
            device.min_measure_time = antecedent.min_measure_time;
        }
        else if (deviceId.includes("PHOTOCELL") || deviceId.includes("SOILMOISTURE")) {
            const checkStatusDevice = checkDeviceStatusAndMeasure(measure);
            device.status = checkStatusDevice.status;
            device.color = checkStatusDevice.color;
            device.measure = checkStatusDevice.measure;
            device.type = deviceId.includes("PHOTOCELL") ? "sensor - photocell" : "sensor - soil moisture";
            device.settings = "/";
            device.error_measure = "/";
            device.measure_type = deviceId.includes("PHOTOCELL") ? "luminosity" : "soil moisture";
            device.measure_unit = "%";
            device.max_measure = "max: " + compute_relative_measure(deviceId, antecedent.max_measure, setting, error) + "%";
            device.max_measure_time = antecedent.max_measure_time;
            device.min_measure = "min: " + compute_relative_measure(deviceId, antecedent.min_measure, setting, error) + "%";
            device.min_measure_time = antecedent.min_measure_time;
        }
        else if (deviceId.includes("AMMETER")) {
            const checkStatusDevice = checkDeviceStatusAndMeasure(measure);
            device.status = checkStatusDevice.status;
            device.color = checkStatusDevice.color;
            device.measure = checkStatusDevice.measure;
            device.type = "sensor - ammeter";
            device.settings = setting;
            device.error_measure = "/";
            device.measure_type = "electric power";
            device.measure_settings = "W";
            device.measure_unit = "W";
            device.max_measure = "max: " + compute_relative_measure(deviceId, antecedent.max_measure, setting, error) + "W";
            device.max_measure_time = antecedent.max_measure_time;
            device.min_measure = "min: " + compute_relative_measure(deviceId, antecedent.min_measure, setting, error) + "W";
            device.min_measure_time = antecedent.min_measure_time;
        }
        else if (deviceId.includes("WATERLEVEL")) {
            const checkStatusDevice = checkDeviceStatusAndMeasure(measure);
            device.status = checkStatusDevice.status;
            device.color = checkStatusDevice.color;
            device.measure = checkStatusDevice.measure;
            device.type = "sensor - water level";
            device.settings = setting;
            device.error_measure = error;
            device.measure_type = "water level";
            device.measure_settings = "cm";
            device.measure_unit = "%";
            device.max_measure = "max: " + compute_relative_measure(deviceId, antecedent.min_measure, setting, error) + "%";
            device.max_measure_time = antecedent.max_measure_time;
            device.min_measure = "min: " + compute_relative_measure(deviceId, antecedent.max_measure, setting, error) + "%";
            device.min_measure_time = antecedent.min_measure_time;
        }
        return device
    }

    const device_relative_measure = (antecedents, idx) => {
        const deviceId = antecedents[idx].id;
        const absolute_measure = antecedents[idx].absolute_measure;
        const setting = antecedents[idx].setting;
        const error = antecedents[idx].error;
        var device = { measure: absolute_measure }
        device.measure = compute_relative_measure(deviceId, absolute_measure, setting, error);
        return device
    }

    const compute_relative_measure = (deviceId, absolute_measure, setting, error) => {
        const checkStatusDevice = checkDeviceStatusAndMeasure(absolute_measure);
        var measure = "-";
        var checkMeasure = checkStatusDevice.measure;
        if (checkMeasure !== "-") {
            if (deviceId.includes("PHOTOCELL") || deviceId.includes("SOILMOISTURE")) {
                measure = Math.round((parseInt(checkMeasure) / parseInt(setting)) * 100.0).toString();
            }
            else if (deviceId.includes("AMMETER")) {
                measure = Math.round((parseInt(checkMeasure) / parseInt(setting)) * 100.0).toString();
            }
            else if (deviceId.includes("WATERLEVEL")) {
                const relative_measure = parseInt(checkMeasure) - parseInt(error);
                measure = Math.round((1 - (relative_measure / parseInt(setting))) * 100.0).toString();
            }
        }
        return measure
    }

    if (operation === "view") {
        return (
            device_details(antecedents, idx)
        )
    }
    else if (operation === "relative_measure") {
        return (
            device_relative_measure(antecedents, idx)
        )
    }

}