

export default function ModifyName(props) {
    const submitFunction = (event) => {
        props.updateDeviceRequest(props.elementType);
        props.handleModifyDevice();
        event.preventDefault();
    }
    return (
        <form style={{ display: "inline" }} name="ItemName" onSubmit={submitFunction}>
            <input type="text" id="name" name="name"
                defaultValue={props.elementName}
                onChange={(e) => {
                    const NewName = e.target.value;
                    var checkName = props.checkDeviceNameFunction(props.elements, NewName);
                    if (!checkName) {
                        props.modifyElementName(NewName)
                    }
                }}
            />
        </form>
    )
}