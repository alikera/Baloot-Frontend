import React from "react";
function FormField({ field, type }) {
    return (
        <div className="form-group">
            <input
                className="form-control"
                type={type}
                placeholder={`${field.charAt(0).toUpperCase()}${field.slice(1)}`}
                name={`${field}`}
                required
            />
        </div>
    );
}
export default FormField;