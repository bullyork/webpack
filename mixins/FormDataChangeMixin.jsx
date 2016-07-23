var FormDataChangeMixin = {
    getInitialState: function() {
        return {
            form: {}
        }
    },
    setField: function(formkey, callbacks) {
        if (typeof callbacks === "undefined") {
            callbacks = {};
        }
        return function(e) {
            var value = e;
            if (e.currentTarget) {
                value = e.currentTarget.value;
            }
            var form = this.state.form;
            form[formkey] = value;
            var validFlag = callbacks["valid"] ? callbacks["valid"](value) : true;
            if (validFlag) {
                this.setState({
                    form: form
                }, function() {
                    this.success && this.success(this.value);
                }.bind({
                    success: callbacks["success"],
                    value: value
                }));
            } else {
                callbacks["validerror"] && callbacks["validerror"](value);
            }
        }
    },
    formInputFor: function(key,options={valueKey:"value"}) {
        return {
            onChange: this.setField(key).bind(this),
            [options.valueKey]: this.state.form[key],
            placeholder: "Please input " + key
        }
    },
    formValue: function(key) {
        return this.state.form[key];
    },
    resetFormValue: function(keys) {
        if (typeof keys === "string") {
            keys = [keys];
        }
        var newState = this.state;
        var form = newState["form"];
        for (var i in keys) {
            form[keys[i]] = "";
        }
        this.setState(newState);

    }
}

if (typeof module !== "undefined") {
    module.exports = FormDataChangeMixin;
}
