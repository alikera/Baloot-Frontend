import React from 'react';
import "../css/filterBar.css"

function FilterBar(props) {
    const { availableFlag, handleAvailableCommodities, sortBy, handleSortByChange } = props;

    return (
        <div className="container mb-5 filter-bar d-flex justify-content-between ">
            <div className="d-flex justify-content-between align-items-center">
                <h5 className="p-3">Available commodities</h5>
                <input
                    type="checkbox"
                    className="toggle"
                    checked={availableFlag}
                    onChange={handleAvailableCommodities}
                />
            </div>
            <div className="d-flex justify-content-around align-items-center float-right">
                <h6 className="sort-by p-2 mr-5">sort by:</h6>
                <div className="radio-container">
                    <input
                        type="radio"
                        name="sort-option"
                        id="sort-name"
                        className="radio-button"
                        value="name"
                        onChange={handleSortByChange}
                        checked={sortBy === "name"}
                    />
                    <label className="radio-label p-2 mr-3" htmlFor="sort-name">
                        Name
                    </label>
                </div>
                <div className="radio-container">
                    <input
                        type="radio"
                        name="sort-option"
                        id="sort-price"
                        className="radio-button"
                        value="price"
                        onChange={handleSortByChange}
                        checked={sortBy === "price"}
                    />
                    <label
                        className="radio-label p-2 mr-3 ml-3"
                        htmlFor="sort-price"
                    >
                        Price
                    </label>
                </div>
            </div>
        </div>
    );
}

export default FilterBar;